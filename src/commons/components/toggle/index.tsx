'use client';

import React, { forwardRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

// ========================================
// Type Definitions
// ========================================

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** 토글의 시각적 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 토글의 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 (light/dark) - 자동으로 감지되지만 강제 설정 가능 */
  theme?: 'light' | 'dark';
  /** 토글 상태 (제어 컴포넌트) */
  checked?: boolean;
  /** 기본 토글 상태 (비제어 컴포넌트) */
  defaultChecked?: boolean;
  /** 토글 상태 변경 핸들러 */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** 라벨 텍스트 */
  label?: string;
  /** 라벨 위치 */
  labelPosition?: 'left' | 'right';
  /** 토글 설명 텍스트 */
  description?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

// ========================================
// Toggle Component
// ========================================

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      checked,
      defaultChecked,
      onChange,
      label,
      labelPosition = 'right',
      description,
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    const currentTheme = theme || systemTheme || 'light';

    // 토글 상태 변경 핸들러
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        
        const isChecked = event.target.checked;
        onChange?.(isChecked, event);
      },
      [onChange, disabled]
    );

    // CSS 클래스 조합
    const containerClasses = [
      styles.container,
      styles[size],
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const toggleClasses = [
      styles.toggle,
      styles[variant],
      styles[size],
      currentTheme === 'dark' && styles.dark,
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      styles.label,
      styles[size],
      disabled && styles.disabled,
      currentTheme === 'dark' && styles.dark,
    ]
      .filter(Boolean)
      .join(' ');

    const descriptionClasses = [
      styles.description,
      styles[size],
      disabled && styles.disabled,
      currentTheme === 'dark' && styles.dark,
    ]
      .filter(Boolean)
      .join(' ');

    // 고유 ID 생성
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

    // 라벨 렌더링
    const renderLabel = () => {
      if (!label && !description) return null;

      return (
        <div className={styles.labelContainer}>
          {label && (
            <label htmlFor={toggleId} className={labelClasses}>
              {label}
            </label>
          )}
          {description && (
            <div className={descriptionClasses}>
              {description}
            </div>
          )}
        </div>
      );
    };

    // 토글 스위치 렌더링
    const renderToggle = () => (
      <div className={toggleClasses}>
        <input
          ref={ref}
          type="checkbox"
          id={toggleId}
          className={styles.input}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <div className={styles.track}>
          <div className={styles.thumb} />
        </div>
      </div>
    );

    return (
      <div className={containerClasses}>
        {labelPosition === 'left' && renderLabel()}
        {renderToggle()}
        {labelPosition === 'right' && renderLabel()}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

// ========================================
// Export
// ========================================

export default Toggle;
