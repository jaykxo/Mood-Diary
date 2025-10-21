'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { Selectbox } from '@/commons/components/selectbox';
import { SearchBar } from '@/commons/components/searchbar';
import { Button } from '@/commons/components/button';
import { Pagination } from '@/commons/components/pagination';
import { EmotionType, emotionMetaMap } from '@/commons/constants/enum';
import { useDiaryWriteModal } from './hooks/index.link.modal.hook';

// 일기 데이터 타입 정의
interface DiaryData {
  id: string;
  emotion: EmotionType;
  title: string;
  date: string;
  image: string;
}

const DiariesComponent: React.FC = () => {
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 피그마 디자인에 맞춰 5페이지로 설정
  
  // 모달 훅 사용
  const { openDiaryWriteModal } = useDiaryWriteModal();

  // 필터 옵션 데이터
  const filterOptions = [
    { value: 'all', label: '전체' },
    { value: 'happy', label: '행복해요' },
    { value: 'sad', label: '슬퍼요' },
    { value: 'angry', label: '화나요' },
    { value: 'surprised', label: '놀랐어요' },
    { value: 'etc', label: '기타' },
  ];

  // Mock 일기 데이터 생성
  const mockDiaries: DiaryData[] = [
    {
      id: '1',
      emotion: EmotionType.Sad,
      title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-sad-m.png'
    },
    {
      id: '2',
      emotion: EmotionType.Surprise,
      title: '타이틀 영역 입니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-surprise-m.png'
    },
    {
      id: '3',
      emotion: EmotionType.Angry,
      title: '타이틀 영역 입니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-angry-m.png'
    },
    {
      id: '4',
      emotion: EmotionType.Happy,
      title: '타이틀 영역 입니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-happy-m.png'
    },
    {
      id: '5',
      emotion: EmotionType.Etc,
      title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-etc-m.png'
    },
    {
      id: '6',
      emotion: EmotionType.Surprise,
      title: '타이틀 영역 입니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-surprise-m.png'
    },
    {
      id: '7',
      emotion: EmotionType.Angry,
      title: '타이틀 영역 입니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-angry-m.png'
    },
    {
      id: '8',
      emotion: EmotionType.Happy,
      title: '타이틀 영역 입니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-happy-m.png'
    },
    {
      id: '9',
      emotion: EmotionType.Sad,
      title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-sad-m.png'
    },
    {
      id: '10',
      emotion: EmotionType.Surprise,
      title: '타이틀 영역 입니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-surprise-m.png'
    },
    {
      id: '11',
      emotion: EmotionType.Angry,
      title: '타이틀 영역 입니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-angry-m.png'
    },
    {
      id: '12',
      emotion: EmotionType.Happy,
      title: '타이틀 영역 입니다.',
      date: '2024. 03. 12',
      image: '/images/emotion-happy-m.png'
    }
  ];

  // 일기카드 컴포넌트
  const DiaryCard: React.FC<{ diary: DiaryData }> = ({ diary }) => {
    const emotionMeta = emotionMetaMap[diary.emotion];
    
    return (
      <div className={styles.diaryCard}>
        {/* 이미지 영역 */}
        <div className={styles.diaryImageContainer}>
          <Image
            src={diary.image}
            alt={emotionMeta.label}
            width={274}
            height={208}
            className={styles.diaryImage}
          />
          {/* 닫기 버튼 */}
          <button className={styles.closeButton}>
            <Image
              src="/icons/close_outline_light_m.svg"
              alt="close"
              width={24}
              height={24}
              className={styles.closeIcon}
            />
          </button>
        </div>
        
        {/* 텍스트 영역 */}
        <div className={styles.diaryContent}>
          {/* 감정 라벨과 날짜 */}
          <div className={styles.diaryHeader}>
            <span 
              className={styles.emotionLabel}
              style={{ color: emotionMeta.color }}
            >
              {emotionMeta.label}
            </span>
            <span className={styles.diaryDate}>
              {diary.date}
            </span>
          </div>
          
          {/* 제목 */}
          <div className={styles.diaryTitle}>
            {diary.title}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container} data-testid="diaries-page">
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
              onClick={openDiaryWriteModal}
              data-testid="diary-write-button"
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
          {/* Diary Grid */}
          <div className={styles.diaryGrid}>
            {mockDiaries.map((diary) => (
              <DiaryCard key={diary.id} diary={diary} />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Section */}
      <div className={styles.pagination}>
        <div className={styles.paginationContent}>
          <Pagination
            variant="primary"
            theme="light"
            size="medium"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            maxVisiblePages={5}
            className={styles.paginationComponent}
          />
        </div>
      </div>
    </div>
  );
};

export default DiariesComponent;
