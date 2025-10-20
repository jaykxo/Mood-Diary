import React from 'react';
import Image from 'next/image';
import { Button } from '@/commons/components/button';
import { EmotionType, getEmotionLabel, getEmotionIcon, getEmotionColor } from '@/commons/constants/enum';
import styles from './styles.module.css';

// Mock 데이터 인터페이스
interface DiaryData {
  id: string;
  title: string;
  emotion: EmotionType;
  content: string;
  createdAt: string;
}

// Mock 데이터
const mockDiaryData: DiaryData = {
  id: '1',
  title: '이것은 타이틀 입니다.',
  emotion: EmotionType.Happy,
  content: '내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다',
  createdAt: '2024. 07. 12',
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DiariesDetailProps {}

const DiariesDetail: React.FC<DiariesDetailProps> = () => {
  const diary = mockDiaryData;

  return (
    <div className={styles.container}>
      {/* 첫 번째 gap: 1168 * 64 = 64px */}
      <div className={styles.gap1}></div>

      {/* detail-title 영역: 1168 * 84 = 84px */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{diary.title}</h1>
        </div>
        <div className={styles.emotionDateSection}>
          <div className={styles.emotionSection}>
            <Image
              src={getEmotionIcon(diary.emotion, 'small')}
              alt={getEmotionLabel(diary.emotion)}
              width={32}
              height={32}
              className={styles.emotionIcon}
            />
            <span 
              className={styles.emotionLabel}
              style={{ color: getEmotionColor(diary.emotion) }}
            >
              {getEmotionLabel(diary.emotion)}
            </span>
          </div>
          <div className={styles.dateSection}>
            <span className={styles.dateText}>{diary.createdAt}</span>
            <span className={styles.dateLabel}>작성</span>
          </div>
        </div>
      </div>

      {/* 두 번째 gap: 1168 * 24 = 24px */}
      <div className={styles.gap2}></div>

      {/* detail-content 영역: 1168 * 169 = 169px */}
      <div className={styles.detailContent}>
        <div className={styles.contentSection}>
          <h2 className={styles.contentLabel}>내용</h2>
          <p className={styles.contentText}>{diary.content}</p>
        </div>
        <div className={styles.copySection}>
          <button className={styles.copyButton}>
            <Image
              src="/icons/copy_outline_light_m.svg"
              alt="내용 복사"
              width={24}
              height={24}
              className={styles.copyIcon}
            />
            <span className={styles.copyText}>내용 복사</span>
          </button>
        </div>
      </div>

      {/* 세 번째 gap: 1168 * 24 = 24px */}
      <div className={styles.gap3}></div>

      {/* detail-footer 영역: 1168 * 40 = 40px */}
      <div className={styles.detailFooter}>
        <Button
          variant="tertiary"
          theme="light"
          size="medium"
          className={styles.editButton}
        >
          수정
        </Button>
        <Button
          variant="tertiary"
          theme="light"
          size="medium"
          className={styles.deleteButton}
        >
          삭제
        </Button>
      </div>

      {/* 네 번째 gap: 1168 * 24 = 24px */}
      <div className={styles.gap4}></div>

      {/* retrospect-input 영역: 1168 * 85 = 85px */}
      <div className={styles.retrospectInput}>
        <span className={styles.areaLabel}>retrospect-input (85px)</span>
      </div>

      {/* 다섯 번째 gap: 1168 * 16 = 16px */}
      <div className={styles.gap5}></div>

      {/* retrospect-list 영역: 1168 * 72 = 72px */}
      <div className={styles.retrospectList}>
        <span className={styles.areaLabel}>retrospect-list (72px)</span>
      </div>
    </div>
  );
};

export default DiariesDetail;
