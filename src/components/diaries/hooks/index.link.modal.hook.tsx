'use client';

import { useModal } from '@/commons/providers/modal/modal.provider';
import { DiariesNew, DiaryFormData } from '@/components/diaries-new';

// ========================================
// Type Definitions
// ========================================

// ========================================
// Diary Write Modal Hook
// ========================================

/**
 * 일기쓰기 모달 링크 훅
 * @description 일기쓰기 모달을 열고 닫는 기능을 제공하는 커스텀 훅
 * @returns {Object} 모달 관련 함수들과 상태
 * @returns {Function} openDiaryWriteModal - 일기쓰기 모달을 여는 함수
 * @returns {Function} closeDiaryWriteModal - 일기쓰기 모달을 닫는 함수
 * @returns {boolean} isModalOpen - 모달이 열려있는지 여부
 */
export const useDiaryWriteModal = () => {
  const { hasOpenModal: isOpen, openModal, closeModal } = useModal();

  /**
   * 일기쓰기 모달을 여는 함수
   * DiariesNew 컴포넌트를 모달로 표시합니다.
   */
  const openDiaryWriteModal = () => {
    const modalContent = (
      <div data-testid="diary-write-modal">
        <DiariesNew 
          onClose={closeDiaryWriteModal}
          onSubmit={handleDiarySubmit}
        />
      </div>
    );
    
    openModal(modalContent);
  };

  /**
   * 일기쓰기 모달을 닫는 함수
   */
  const closeDiaryWriteModal = () => {
    closeModal();
  };

  /**
   * 일기 등록 처리 함수
   * @param {DiaryFormData} data - 일기 폼 데이터
   */
  const handleDiarySubmit = (data: DiaryFormData) => {
    // TODO: 실제 일기 등록 로직 구현
    console.log('일기 등록:', data);
    
    // 등록 후 모달 닫기
    closeDiaryWriteModal();
  };

  return {
    openDiaryWriteModal,
    closeDiaryWriteModal,
    isModalOpen: isOpen
  };
};
