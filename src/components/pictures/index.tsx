'use client';

import React from 'react';
import { Selectbox, SelectOption } from '@/commons/components/selectbox';
import { usePicturesBinding } from './hooks/index.binding.hook';
import styles from './styles.module.css';

const PicturesComponent: React.FC = () => {
  const { 
    dogImages, 
    isLoading, 
    isLoadingMore, 
    error, 
    lastImageRef,
    retry
  } = usePicturesBinding();
  
  // 에러가 있을 때 표시
  const hasError = !!error;

  // Mock 데이터 (필터용)
  const filterOptions: SelectOption[] = [
    { value: 'all', label: '기본' },
    { value: 'dog-1', label: '강아지 1' },
    { value: 'dog-2', label: '강아지 2' },
    { value: 'dog-3', label: '강아지 3' },
  ];

  // 스플래시 스크린 컴포넌트
  const SplashScreen: React.FC = () => (
    <div className={styles.splashScreen} data-testid="splash-screen">
      <div className={styles.splashLine}></div>
      <div className={styles.splashLine}></div>
      <div className={styles.splashLine}></div>
      <div className={styles.splashLine}></div>
    </div>
  );

  return (
    <div className={styles.container} data-testid="pictures-page">
      {/* Filter Section */}
      <div className={styles.filter}>
        <div className={styles.filterContent}>
          <Selectbox
            variant="primary"
            size="medium"
            theme="light"
            options={filterOptions}
            defaultValue="all"
            placeholder="기본"
            className={styles.selectBox}
          />
        </div>
      </div>

      {/* Gap Section */}
      <div className={styles.gap}></div>

      {/* Main Content Section */}
      <div className={styles.main}>
        <div className={styles.mainContent}>
          {/* 에러 메시지 */}
          {hasError && (
            <div className={styles.errorMessage} data-testid="error-message">
              <p>{error}</p>
              <button onClick={retry}>다시 시도</button>
            </div>
          )}

          {/* 이미지 그리드 */}
          <div className={styles.imageGrid}>
            {/* 초기 로딩 중일 때 스플래시 스크린 표시 */}
            {isLoading && dogImages.length === 0 ? (
              Array.from({ length: 6 }, (_, i) => (
                <div key={`splash-${i}`} className={styles.imageItem}>
                  <SplashScreen />
                </div>
              ))
            ) : (
              dogImages.map((item, index) => (
                <div 
                  key={item.id} 
                  className={styles.imageItem}
                  ref={index === dogImages.length - 2 ? lastImageRef : null}
                >
                  <img
                    src={item.src}
                    alt={`강아지 사진 ${index + 1}`}
                    width={640}
                    height={640}
                    className={styles.image}
                    data-testid="dog-image"
                  />
                </div>
              ))
            )}

            {/* 추가 로딩 중일 때 스플래시 스크린 표시 */}
            {isLoadingMore && (
              Array.from({ length: 6 }, (_, i) => (
                <div key={`loading-more-${i}`} className={styles.imageItem}>
                  <SplashScreen />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PicturesComponent;

