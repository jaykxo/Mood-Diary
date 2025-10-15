'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

/**
 * Pagination 컴포넌트의 Props 인터페이스
 */
export interface PaginationProps {
  /** 현재 페이지 번호 (1부터 시작) */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 시 호출되는 콜백 함수 */
  onPageChange: (page: number) => void;
  /** 컴포넌트 variant */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** 컴포넌트 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 */
  theme?: 'light' | 'dark';
  /** 표시할 최대 페이지 번호 개수 */
  maxVisiblePages?: number;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * Pagination 컴포넌트
 * 
 * @description 페이지네이션 UI를 제공하는 컴포넌트입니다.
 * Figma 디자인을 기반으로 구현되었으며, 다양한 variant와 크기를 지원합니다.
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  maxVisiblePages = 5,
  disabled = false,
  className = '',
}) => {
  /**
   * 표시할 페이지 번호 배열을 계산합니다.
   */
  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // 끝 페이지가 조정되었다면 시작 페이지도 다시 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  /**
   * 이전 페이지로 이동
   */
  const handlePrevious = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  /**
   * 다음 페이지로 이동
   */
  const handleNext = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  /**
   * 특정 페이지로 이동
   */
  const handlePageClick = (page: number) => {
    if (page !== currentPage && !disabled) {
      onPageChange(page);
    }
  };

  const visiblePages = getVisiblePages();
  const canGoPrevious = currentPage > 1 && !disabled;
  const canGoNext = currentPage < totalPages && !disabled;

  return (
    <div 
      className={`${styles.pagination} ${styles[variant]} ${styles[size]} ${styles[theme]} ${disabled ? styles.disabled : ''} ${className}`}
    >
      {/* 이전 페이지 버튼 */}
      <button
        type="button"
        className={`${styles.arrowButton} ${styles.previousButton} ${!canGoPrevious ? styles.arrowDisabled : ''}`}
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        aria-label="이전 페이지"
      >
        <Image
          src={canGoPrevious ? "/icons/leftenable_outline_light_m.svg" : "/icons/leftdisabled_outline_light_m.svg"}
          alt="이전 페이지"
          width={24}
          height={24}
          className={styles.arrowIcon}
        />
      </button>

      {/* 페이지 번호들 */}
      <div className={styles.pageNumbers}>
        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            className={`${styles.pageButton} ${page === currentPage ? styles.active : styles.inactive}`}
            onClick={() => handlePageClick(page)}
            disabled={disabled}
            aria-label={`${page}페이지`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 다음 페이지 버튼 */}
      <button
        type="button"
        className={`${styles.arrowButton} ${styles.nextButton} ${!canGoNext ? styles.arrowDisabled : ''}`}
        onClick={handleNext}
        disabled={!canGoNext}
        aria-label="다음 페이지"
      >
        <Image
          src={canGoNext ? "/icons/rightenable_outline_light_m.svg" : "/icons/rightdisabled_outline_light_m.svg"}
          alt="다음 페이지"
          width={24}
          height={24}
          className={styles.arrowIcon}
        />
      </button>
    </div>
  );
};

export default Pagination;
