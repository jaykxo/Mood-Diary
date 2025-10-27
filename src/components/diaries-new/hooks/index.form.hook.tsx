'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { EmotionType } from '@/commons/constants/enum';
import { URL_PATHS } from '@/commons/constants/url';

// ========================================
// Type Definitions
// ========================================

export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export interface DiariesFormData {
  emotion: EmotionType;
  title: string;
  content: string;
}

export interface UseDiaryFormReturn {
  /** 폼 데이터 */
  formData: DiariesFormData;
  /** 폼 제출 핸들러 */
  handleSubmit: (onSubmit?: (data: DiariesFormData) => void) => void;
  /** 등록하기 버튼 활성화 여부 */
  isSubmitEnabled: boolean;
  /** 제목 변경 핸들러 */
  handleTitleChange: (title: string) => void;
  /** 내용 변경 핸들러 */
  handleContentChange: (content: string) => void;
  /** 감정 변경 핸들러 */
  handleEmotionChange: (emotion: EmotionType) => void;
}

// ========================================
// Validation Schema
// ========================================

const diaryFormSchema = z.object({
  emotion: z.nativeEnum(EmotionType),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

// ========================================
// Diaries Form Hook
// ========================================

/**
 * 일기쓰기 폼 훅
 * @description 일기 등록 폼의 상태 관리 및 제출 로직을 제공하는 커스텀 훅
 * @returns {Object} 폼 관련 함수들과 상태
 */
export const useDiaryForm = (): UseDiaryFormReturn => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  // 폼 초기값
  const defaultValues: DiariesFormData = {
    emotion: EmotionType.Happy,
    title: '',
    content: '',
  };

  // react-hook-form 설정
  const {
    watch,
    setValue,
    handleSubmit: onSubmit,
    formState: { isValid },
  } = useForm<DiariesFormData>({
    resolver: zodResolver(diaryFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  // 폼 필드 값 가져오기
  const title = watch('title');
  const content = watch('content');
  const emotion = watch('emotion');

  // 등록하기 버튼 활성화 여부
  const isSubmitEnabled = isValid && title.trim().length > 0 && content.trim().length > 0;

  /**
   * 제목 변경 핸들러
   */
  const handleTitleChange = (value: string) => {
    setValue('title', value, { shouldValidate: true });
  };

  /**
   * 내용 변경 핸들러
   */
  const handleContentChange = (value: string) => {
    setValue('content', value, { shouldValidate: true });
  };

  /**
   * 감정 변경 핸들러
   */
  const handleEmotionChange = (value: EmotionType) => {
    setValue('emotion', value, { shouldValidate: true });
  };

  /**
   * 로컬스토리지에 일기 저장
   */
  const saveDiaryToLocalStorage = (data: DiariesFormData): number => {
    // 로컬스토리지에서 기존 데이터 가져오기
    const existingData = localStorage.getItem('diaries');
    const existingDiaries: DiaryData[] = existingData ? JSON.parse(existingData) : [];

    // 새 id 결정: 기존 데이터가 있으면 가장 큰 id + 1, 없으면 1
    const newId = existingDiaries.length > 0 
      ? Math.max(...existingDiaries.map(d => d.id)) + 1 
      : 1;

    // 새 일기 데이터 생성
    const newDiary: DiaryData = {
      id: newId,
      title: data.title,
      content: data.content,
      emotion: data.emotion,
      createdAt: new Date().toISOString(),
    };

    // 로컬스토리지에 저장
    const diaries = [...existingDiaries, newDiary];
    localStorage.setItem('diaries', JSON.stringify(diaries));

    return newId;
  };

  /**
   * 등록 완료 모달 표시
   */
  const showRegistrationSuccessModal = (diaryId: number) => {
    const SuccessModal = () => (
      <Modal
        variant="info"
        actions="single"
        title="등록 완료"
        content="일기가 성공적으로 등록되었습니다."
        confirmText="확인"
        onConfirm={() => {
          // 모든 모달 닫기
          closeAllModals();
          
          // 상세페이지로 이동
          router.push(URL_PATHS.DIARIES.DETAIL(diaryId));
        }}
      />
    );

    openModal(<SuccessModal />);
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = () => {
    onSubmit((data) => {
      // 로컬스토리지에 저장
      const diaryId = saveDiaryToLocalStorage(data);
      
      // 등록 완료 모달 표시
      showRegistrationSuccessModal(diaryId);
    })();
  };

  return {
    formData: {
      emotion,
      title,
      content,
    },
    handleSubmit,
    isSubmitEnabled,
    handleTitleChange,
    handleContentChange,
    handleEmotionChange,
  };
};

