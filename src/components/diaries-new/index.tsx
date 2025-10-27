'use client';

import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { EmotionType, emotionMetaMap, allEmotions } from '@/commons/constants/enum';
import { useDiaryModalClose } from './hooks/index.link.modal.close.hook';
import { useDiaryForm } from './hooks/index.form.hook';
import styles from './styles.module.css';

// ========================================
// Type Definitions
// ========================================

export interface DiariesNewProps {
  /** 컴포넌트 클래스명 */
  className?: string;
  /** 닫기 버튼 클릭 핸들러 */
  onClose?: () => void;
  /** 등록하기 버튼 클릭 핸들러 */
  onSubmit?: (data: DiaryFormData) => void;
}

export interface DiaryFormData {
  emotion: EmotionType;
  title: string;
  content: string;
}

// ========================================
// DiariesNew Component
// ========================================

export const DiariesNew: React.FC<DiariesNewProps> = ({ 
  className = '', 
  onClose,
  onSubmit 
}) => {
  // 폼 훅 사용
  const {
    formData,
    handleSubmit: handleFormSubmit,
    isSubmitEnabled,
    handleTitleChange,
    handleContentChange,
    handleEmotionChange,
  } = useDiaryForm();
  
  // 등록취소 모달 닫기 훅 사용
  const { openCancelConfirmationModal } = useDiaryModalClose();

  /**
   * 닫기 버튼 클릭 핸들러
   * 등록취소 모달을 엽니다.
   */
  const handleCloseClick = () => {
    openCancelConfirmationModal(onClose);
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = () => {
    handleFormSubmit();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
        {/* Header 영역 */}
        <div className={styles.header}>
          <h1 className={styles.title}>일기 쓰기</h1>
        </div>
        
        {/* Gap */}
        <div className={styles.gap}></div>
        
        {/* Emotion Box 영역 */}
        <div className={styles.emotionBox}>
          <h2 className={styles.emotionTitle}>오늘 기분은 어땠나요?</h2>
          <div className={styles.emotionOptions}>
            {allEmotions.map((emotion) => {
              const emotionMeta = emotionMetaMap[emotion];
              return (
                <label key={emotion} className={styles.emotionOption}>
                  <input
                    type="radio"
                    name="emotion"
                    value={emotion}
                    checked={formData.emotion === emotion}
                    onChange={() => handleEmotionChange(emotion)}
                    className={styles.emotionRadio}
                  />
                  <span className={styles.emotionLabel}>{emotionMeta.label}</span>
                </label>
              );
            })}
          </div>
        </div>
        
        {/* Gap */}
        <div className={styles.gap}></div>
        
        {/* Input Title 영역 */}
        <div className={styles.inputTitle}>
          <Input
            label="제목"
            placeholder="제목을 입력합니다."
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            variant="primary"
            theme="light"
            size="medium"
          />
        </div>
        
        {/* Gap - 24px */}
        <div className={styles.gap24}></div>
        
        {/* Input Content 영역 */}
        <div className={styles.inputContent}>
          <label className={styles.contentLabel}>내용</label>
          <textarea 
            className={styles.contentTextarea}
            placeholder="내용을 입력합니다."
            value={formData.content}
            onChange={(e) => handleContentChange(e.target.value)}
          />
        </div>
        
        {/* Gap */}
        <div className={styles.gap}></div>
        
        {/* Footer 영역 */}
        <div className={styles.footer}>
          <Button
            variant="secondary"
            theme="light"
            size="large"
            onClick={handleCloseClick}
            data-testid="close-button"
          >
            닫기
          </Button>
          <Button
            variant="primary"
            theme="light"
            size="large"
            onClick={handleSubmit}
            disabled={!isSubmitEnabled}
          >
            등록하기
          </Button>
        </div>
    </div>
  );
};

export default DiariesNew;
