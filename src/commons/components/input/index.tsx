'use client';

import React, { forwardRef } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

// ========================================
// Type Definitions
// ========================================

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 입력 필드의 시각적 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 입력 필드의 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 (light/dark) - 자동으로 감지되지만 강제 설정 가능 */
  theme?: 'light' | 'dark';
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 헬퍼 텍스트 */
  helperText?: string;
  /** 라벨 텍스트 */
  label?: string;
  /** 라벨 필수 표시 */
  required?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
  /** 컨테이너 클래스명 */
  containerClassName?: string;
}

// ========================================
// Input Component
// ========================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      fullWidth = false,
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      leftIcon,
      rightIcon,
      containerClassName = '',
      className = '',
      disabled,
      placeholder = '회고를 남겨보세요.',
      ...props
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    const currentTheme = theme || systemTheme || 'light';

    // 컨테이너 CSS 클래스 조합
    const containerClasses = [
      styles.container,
      fullWidth && styles.fullWidth,
      containerClassName,
    ]
      .filter(Boolean)
      .join(' ');

    // 입력 필드 CSS 클래스 조합
    const inputClasses = [
      styles.input,
      styles[variant],
      styles[size],
      error && styles.error,
      currentTheme === 'dark' && styles.dark,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 라벨 렌더링
    const renderLabel = () => {
      if (!label) return null;

      return (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      );
    };

    // 헬퍼 텍스트 렌더링
    const renderHelperText = () => {
      const text = error ? errorMessage : helperText;
      if (!text) return null;

      return (
        <div className={`${styles.helperText} ${error ? styles.errorText : ''}`}>
          {text}
        </div>
      );
    };

    return (
      <div className={containerClasses}>
        {renderLabel()}
        <div className={styles.inputWrapper}>
          {leftIcon && (
            <span className={`${styles.icon} ${styles.leftIcon}`}>
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            placeholder={placeholder}
            {...props}
          />
          {rightIcon && (
            <span className={`${styles.icon} ${styles.rightIcon}`}>
              {rightIcon}
            </span>
          )}
        </div>
        {renderHelperText()}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ========================================
// Export
// ========================================

export default Input;
