import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Selectbox } from '@/commons/components/selectbox';
import { SearchBar } from '@/commons/components/searchbar';
import { Button } from '@/commons/components/button';

const DiariesComponent: React.FC = () => {
  // 필터 옵션 데이터
  const filterOptions = [
    { value: 'all', label: '전체' },
    { value: 'happy', label: '행복해요' },
    { value: 'sad', label: '슬퍼요' },
    { value: 'angry', label: '화나요' },
    { value: 'surprised', label: '놀랐어요' },
    { value: 'etc', label: '기타' },
  ];

  return (
    <div className={styles.container}>
      {/* Search Section */}
      <div className={styles.search}>
        <div className={styles.searchContent}>
          <div className={styles.searchLeft}>
            {/* 필터 선택박스 */}
            <div className={styles.searchFilter}>
              <Selectbox
                variant="primary"
                theme="light"
                size="medium"
                options={filterOptions}
                defaultValue="all"
                placeholder="전체"
              />
            </div>
            
            {/* 검색바 */}
            <div className={styles.searchInput}>
              <SearchBar
                variant="primary"
                theme="light"
                size="medium"
                placeholder="검색어를 입력해 주세요."
              />
            </div>
          </div>
          
          {/* 일기쓰기 버튼 */}
          <div className={styles.searchButton}>
            <Button
              variant="primary"
              theme="light"
              size="large"
              icon={
                <Image
                  src="/icons/plus_outline_light_m.svg"
                  alt="plus"
                  width={24}
                  height={24}
                />
              }
            >
              일기쓰기
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className={styles.main}>
        <div className={styles.mainContent}>
          {/* Diary list placeholder */}
          <div className={styles.diaryList}>
            일기 목록 영역
          </div>
        </div>
      </div>

      {/* Pagination Section */}
      <div className={styles.pagination}>
        <div className={styles.paginationContent}>
          {/* Pagination controls placeholder */}
          <div className={styles.paginationControls}>
            페이지네이션 영역
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiariesComponent;
