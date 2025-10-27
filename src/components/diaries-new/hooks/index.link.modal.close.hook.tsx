'use client';

import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

// ========================================
// Type Definitions
// ========================================

export interface UseModalCloseReturn {
  /** 등록취소 모달을 여는 함수 */
  openCancelConfirmationModal: (parentCloseHandler?: () => void) => void;
  /** 계속작성 버튼 핸들러 (자식 모달만 닫기) */
  handleContinueWriting: () => void;
  /** 등록취소 버튼 핸들러 (부모와 자식 모달 모두 닫기) */
  handleConfirmCancel: (parentCloseHandler?: () => void) => void;
}

// ========================================
// Diaries New Modal Close Hook
// ========================================

/**
 * 일기쓰기 모달 닫기 훅
 * @description 일기쓰기 모달 닫기 시 등록취소 모달을 표시하는 기능을 제공하는 커스텀 훅
 * @returns {Object} 모달 관련 함수들과 컴포넌트
 */
export const useDiaryModalClose = (): UseModalCloseReturn => {
  const { openModal, closeModal } = useModal();

  /**
   * 등록취소 버튼 핸들러
   * 등록취소 모달(자식)과 일기쓰기 모달(부모)를 모두 닫습니다.
   */
  const handleConfirmCancel = (parentCloseHandler?: () => void) => {
    // 등록취소 모달(자식) 닫기
    closeModal();
    
    // 일기쓰기 모달(부모) 닫기
    if (parentCloseHandler) {
      // 약간의 지연 후 부모 모달 닫기 (자식 모달이 완전히 닫힌 후)
      setTimeout(() => {
        parentCloseHandler();
      }, 50);
    }
  };

  /**
   * 계속작성 버튼 핸들러
   * 등록취소 모달(자식)만 닫습니다.
   */
  const handleContinueWriting = () => {
    closeModal();
  };

  /**
   * 등록취소 모달을 여는 함수
   */
  const openCancelConfirmationModal = (parentCloseHandler?: () => void) => {
    const CancelConfirmationModal = () => (
      <div data-testid="cancel-confirmation-modal">
        <Modal
          variant="info"
          actions="dual"
          title="일기 등록 취소"
          content="일기 등록을 취소 하시겠어요?"
          confirmText="등록 취소"
          cancelText="계속 작성"
          onConfirm={() => handleConfirmCancel(parentCloseHandler)}
          onCancel={handleContinueWriting}
        />
      </div>
    );

    const modalContent = <CancelConfirmationModal />;
    openModal(modalContent);
  };

  return {
    openCancelConfirmationModal,
    handleContinueWriting,
    handleConfirmCancel,
  };
};

