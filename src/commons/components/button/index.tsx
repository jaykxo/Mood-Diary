'use client';

import React, { forwardRef } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

// ========================================
// Type Definitions
// ========================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 시각적 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 버튼의 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 (light/dark) - 자동으로 감지되지만 강제 설정 가능 */
  theme?: 'light' | 'dark';
  /** 버튼 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 아이콘 (React 노드) */
  icon?: React.ReactNode;
  /** 아이콘만 표시 (텍스트 없음) */
  iconOnly?: boolean;
  /** 버튼 내용 (children 대신 사용 가능) */
  children?: React.ReactNode;
}

// ========================================
// Button Component
// ========================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      fullWidth = false,
      loading = false,
      icon,
      iconOnly = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    const currentTheme = theme || systemTheme || 'light';

    // CSS 클래스 조합
    const buttonClasses = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      iconOnly && styles.iconOnly,
      currentTheme === 'dark' && styles.dark,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 버튼 내용 렌더링
    const renderContent = () => {
      if (iconOnly) {
        return icon && <span className={styles.icon}>{icon}</span>;
      }

      return (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children && <span>{children}</span>}
        </>
      );
    };

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ========================================
// Export
// ========================================

export default Button;
