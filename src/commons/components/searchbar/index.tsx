'use client';

import React, { forwardRef } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import styles from './styles.module.css';

// ========================================
// Type Definitions
// ========================================

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 검색바의 시각적 스타일 변형 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 검색바의 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 (light/dark) - 자동으로 감지되지만 강제 설정 가능 */
  theme?: 'light' | 'dark';
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 검색 버튼 클릭 핸들러 */
  onSearch?: (value: string) => void;
  /** 검색 아이콘 클릭 핸들러 */
  onIconClick?: () => void;
  /** 검색 아이콘 표시 여부 */
  showSearchIcon?: boolean;
  /** 컨테이너 클래스명 */
  containerClassName?: string;
}

// ========================================
// SearchBar Component
// ========================================

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      fullWidth = false,
      onSearch,
      onIconClick,
      showSearchIcon = true,
      containerClassName = '',
      className = '',
      placeholder = '검색어를 입력해 주세요.',
      onKeyDown,
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

    // 검색바 CSS 클래스 조합
    const searchBarClasses = [
      styles.searchBar,
      styles[variant],
      styles[size],
      currentTheme === 'dark' && styles.dark,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Enter 키 처리
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value);
      }
      onKeyDown?.(e);
    };

    // 검색 아이콘 클릭 처리
    const handleIconClick = () => {
      if (onIconClick) {
        onIconClick();
      } else if (onSearch && ref && 'current' in ref && ref.current) {
        onSearch(ref.current.value);
      }
    };

    return (
      <div className={containerClasses}>
        <div className={searchBarClasses}>
          {showSearchIcon && (
            <button
              type="button"
              className={styles.searchIcon}
              onClick={handleIconClick}
              aria-label="검색"
            >
              <Image
                src="/icons/search_outline_light_m.svg"
                alt="검색"
                width={24}
                height={24}
              />
            </button>
          )}
          <input
            ref={ref}
            type="text"
            className={styles.input}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            {...props}
          />
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

// ========================================
// Export
// ========================================

export { SearchBar };
export default SearchBar;
