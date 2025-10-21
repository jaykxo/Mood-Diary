'use client';

import React, { useState } from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { EmotionType, emotionMetaMap, allEmotions } from '@/commons/constants/enum';
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
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(EmotionType.Happy);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEmotionChange = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        emotion: selectedEmotion,
        title,
        content
      });
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
                    checked={selectedEmotion === emotion}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        {/* Gap */}
        <div className={styles.gap}></div>
        
        {/* Footer 영역 */}
        <div className={styles.footer}>
          <Button
            variant="tertiary"
            theme="light"
            size="large"
            onClick={onClose}
            data-testid="close-button"
          >
            닫기
          </Button>
          <Button
            variant="primary"
            theme="light"
            size="large"
            onClick={handleSubmit}
          >
            등록하기
          </Button>
        </div>
    </div>
  );
};

export default DiariesNew;
