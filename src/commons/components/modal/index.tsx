'use client';

import React, { forwardRef } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '../button';
import styles from './styles.module.css';

// ========================================
// Type Definitions
// ========================================

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 모달의 시각적 스타일 변형 */
  variant?: 'info' | 'danger';
  /** 버튼 액션 타입 */
  actions?: 'single' | 'dual';
  /** 모달의 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 (light/dark) - 자동으로 감지되지만 강제 설정 가능 */
  theme?: 'light' | 'dark';
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 모달 제목 */
  title: string;
  /** 모달 내용 */
  content: string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 (dual actions일 때만 사용) */
  cancelText?: string;
  /** 확인 버튼 클릭 핸들러 */
  onConfirm?: () => void;
  /** 취소 버튼 클릭 핸들러 (dual actions일 때만 사용) */
  onCancel?: () => void;
  /** 모달 닫기 핸들러 (ESC 키 또는 외부 클릭) */
  onClose?: () => void;
}

// ========================================
// Modal Component
// ========================================

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({
    variant = 'info',
    actions = 'single',
    size = 'medium',
    theme,
    fullWidth = false,
    disabled = false,
    title,
    content,
    confirmText = '확인',
    cancelText = '취소',
    onConfirm,
    onCancel,
    onClose,
    className = '',
    ...props
  },
  ref
) => {
  const { theme: systemTheme } = useTheme();
  const currentTheme = theme || systemTheme || 'light';

  // CSS 클래스 조합
  const modalClasses = [
    styles.modal,
    styles[variant],
    styles[actions],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    currentTheme === 'dark' && styles.dark,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 키보드 이벤트 처리
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        onClose?.();
        break;
      case 'Enter':
        if (actions === 'single') {
          event.preventDefault();
          onConfirm?.();
        }
        break;
    }
  };

  // 버튼 영역 렌더링
  const renderButtons = () => {
    if (actions === 'single') {
      return (
        <div className={styles.buttonContainer}>
          <Button
            variant="primary"
            theme="light"
            size="large"
            className={styles.singleButton}
            disabled={disabled}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      );
    }

    return (
      <div className={styles.buttonContainer}>
        <Button
          variant="secondary"
          theme="light"
          size="large"
          className={styles.dualButton}
          disabled={disabled}
          onClick={onCancel}
        >
          {cancelText}
        </Button>
        <Button
          variant="primary"
          theme="light"
          size="large"
          className={styles.dualButton}
          disabled={disabled}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={modalClasses}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      tabIndex={-1}
      {...props}
    >
      <div className={styles.contentContainer}>
        <h2 id="modal-title" className={styles.title}>{title}</h2>
        <p id="modal-content" className={styles.content}>{content}</p>
      </div>
      {renderButtons()}
    </div>
  );
});

Modal.displayName = 'Modal';

// ========================================
// Export
// ========================================

export default Modal;
