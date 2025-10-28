'use client';

import React from 'react';
import Image from 'next/image';
import { Selectbox, SelectOption } from '@/commons/components/selectbox';
import styles from './styles.module.css';

const PicturesComponent: React.FC = () => {
  // Mock 데이터
  const filterOptions: SelectOption[] = [
    { value: 'all', label: '기본' },
    { value: 'dog-1', label: '강아지 1' },
    { value: 'dog-2', label: '강아지 2' },
    { value: 'dog-3', label: '강아지 3' },
  ];

  // 이미지 Mock 데이터 (10개)
  const imageList = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: '/images/dog-1.jpg',
  }));

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
          {/* 이미지 그리드 */}
          <div className={styles.imageGrid}>
            {imageList.map((item) => (
              <div key={item.id} className={styles.imageItem}>
                <Image
                  src={item.src}
                  alt={`강아지 사진 ${item.id}`}
                  width={640}
                  height={640}
                  className={styles.image}
                  priority={item.id <= 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PicturesComponent;

