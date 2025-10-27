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
import { useDiariesBinding, DiaryData } from './hooks/index.binding.hook';

// 일기 카드 표시용 데이터 타입
interface DiaryCardData {
  id: number;
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

  // 일기 목록 바인딩 훅 사용
  const { diaries } = useDiariesBinding();

  // 필터 옵션 데이터
  const filterOptions = [
    { value: 'all', label: '전체' },
    { value: 'happy', label: '행복해요' },
    { value: 'sad', label: '슬퍼요' },
    { value: 'angry', label: '화나요' },
    { value: 'surprised', label: '놀랐어요' },
    { value: 'etc', label: '기타' },
  ];

  /**
   * 로컬스토리지 데이터를 카드 표시용 데이터로 변환
   */
  const convertToCardData = (diary: DiaryData): DiaryCardData => {
    // 날짜 포맷 변환: ISO string -> YYYY. MM. DD 형식
    const date = new Date(diary.createdAt);
    const formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`;
    
    // emotion에 따른 이미지 경로 설정 (존재하지 않는 emotion인 경우 Etc로 fallback)
    const emotionMeta = emotionMetaMap[diary.emotion] || emotionMetaMap[EmotionType.Etc];
    const image = emotionMeta?.icon.medium || '/images/emotion-etc-m.png';

    return {
      id: diary.id,
      emotion: diary.emotion,
      title: diary.title,
      date: formattedDate,
      image,
    };
  };

  // 일기 데이터를 카드 표시용 데이터로 변환
  const cardDiaries: DiaryCardData[] = diaries.map(convertToCardData);

  // 일기카드 컴포넌트
  const DiaryCard: React.FC<{ diary: DiaryCardData }> = ({ diary }) => {
    // emotion에 따른 메타데이터 가져오기 (존재하지 않는 emotion인 경우 Etc로 fallback)
    const emotionMeta = emotionMetaMap[diary.emotion] || emotionMetaMap[EmotionType.Etc];
    
    // 이미지 경로가 유효한지 확인하고 없으면 fallback 이미지 사용
    const imageSrc = diary.image && diary.image.startsWith('/') ? diary.image : '/images/emotion-etc-m.png';
    
    return (
      <div className={styles.diaryCard} data-testid={`diary-card-${diary.id}`}>
        {/* 이미지 영역 */}
        <div className={styles.diaryImageContainer}>
          <Image
            src={imageSrc}
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
              data-testid="emotion-label"
              style={{ color: emotionMeta.color }}
            >
              {emotionMeta.label}
            </span>
            <span className={styles.diaryDate} data-testid="diary-date">
              {diary.date}
            </span>
          </div>
          
          {/* 제목 */}
          <div className={styles.diaryTitle} data-testid="diary-title">
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
            {cardDiaries.map((diary) => (
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
