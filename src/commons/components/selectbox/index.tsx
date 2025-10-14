'use client';

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import styles from './styles.module.css';

// ========================================
// Type Definitions
// ========================================

export interface SelectOption {
  /** 옵션의 고유 값 */
  value: string;
  /** 옵션에 표시될 라벨 */
  label: string;
  /** 옵션 비활성화 여부 */
  disabled?: boolean;
}

export interface SelectboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onToggle'> {
  /** 셀렉트박스의 시각적 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 셀렉트박스의 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 (light/dark) - 자동으로 감지되지만 강제 설정 가능 */
  theme?: 'light' | 'dark';
  /** 선택 가능한 옵션들 */
  options: SelectOption[];
  /** 현재 선택된 값 */
  value?: string;
  /** 기본 선택된 값 */
  defaultValue?: string;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 값 변경 시 호출되는 콜백 */
  onChange?: (value: string, option: SelectOption) => void;
  /** 드롭다운 열림/닫힘 상태 변경 시 호출되는 콜백 */
  onToggle?: (isOpen: boolean) => void;
}

// ========================================
// Selectbox Component
// ========================================

export const Selectbox = forwardRef<HTMLDivElement, SelectboxProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      options = [],
      value,
      defaultValue,
      placeholder = '선택하세요',
      disabled = false,
      fullWidth = false,
      onChange,
      onToggle,
      className = '',
      ...props
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    const currentTheme = theme || systemTheme || 'light';
    
    // 상태 관리
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');
    const selectRef = useRef<HTMLDivElement>(null);
    
    // 선택된 옵션 찾기
    const selectedOption = options.find(option => option.value === selectedValue);
    
    // 외부 클릭 감지
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // value prop 변경 시 내부 상태 업데이트
    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);
    
    // CSS 클래스 조합
    const selectboxClasses = [
      styles.selectbox,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      isOpen && styles.open,
      currentTheme === 'dark' && styles.dark,
      className,
    ]
      .filter(Boolean)
      .join(' ');
    
    const dropdownClasses = [
      styles.dropdown,
      styles[variant],
      styles[size],
      isOpen && styles.open,
      currentTheme === 'dark' && styles.dark,
    ]
      .filter(Boolean)
      .join(' ');
    
    // 드롭다운 토글
    const handleToggle = () => {
      if (disabled) return;
      
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onToggle?.(newIsOpen);
    };
    
    // 옵션 선택
    const handleOptionSelect = (option: SelectOption) => {
      if (option.disabled) return;
      
      setSelectedValue(option.value);
      setIsOpen(false);
      onChange?.(option.value, option);
      onToggle?.(false);
    };
    
    // 키보드 이벤트 처리
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;
      
      switch (event.key) {
        case 'Enter':
        case ' ':
          event.preventDefault();
          handleToggle();
          break;
        case 'Escape':
          setIsOpen(false);
          onToggle?.(false);
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            onToggle?.(true);
          } else {
            // 다음 옵션으로 이동 로직 (추후 구현 가능)
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            // 이전 옵션으로 이동 로직 (추후 구현 가능)
          }
          break;
      }
    };
    
    return (
      <div
        ref={ref}
        className={selectboxClasses}
        {...props}
      >
        <div
          ref={selectRef}
          className={styles.selectContainer}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="selectbox-dropdown"
          aria-disabled={disabled}
        >
          {/* 선택된 값 표시 영역 */}
          <div className={styles.selectedValue}>
            <span className={styles.text}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          
          {/* 드롭다운 아이콘 */}
          <div className={styles.iconContainer}>
            <Image
              src="/icons/arrow_drop_down.svg"
              alt="드롭다운"
              width={24}
              height={24}
              className={styles.icon}
            />
          </div>
        </div>
        
        {/* 드롭다운 옵션 리스트 */}
        {isOpen && (
          <div className={dropdownClasses} role="listbox" id="selectbox-dropdown">
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${
                  option.value === selectedValue ? styles.selected : ''
                } ${option.disabled ? styles.optionDisabled : ''}`}
                onClick={() => handleOptionSelect(option)}
                role="option"
                aria-selected={option.value === selectedValue}
                aria-disabled={option.disabled}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Selectbox.displayName = 'Selectbox';

// ========================================
// Export
// ========================================

export default Selectbox;
