'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/commons/components/button';
import { Input } from '@/commons/components/input';
import { getEmotionLabel, getEmotionIcon, getEmotionColor } from '@/commons/constants/enum';
import { useDiaryBinding } from './hooks/index.binding.hook';
import styles from './styles.module.css';

// 회고 데이터 인터페이스
interface RetrospectData {
  id: string;
  content: string;
  createdAt: string;
}

// Mock 회고 데이터
const mockRetrospectData: RetrospectData[] = [
  {
    id: '1',
    content: '3년이 지나고 다시 보니 이때가 그립다.',
    createdAt: '2024. 09. 24'
  },
  {
    id: '2',
    content: '3년이 지나고 다시 보니 이때가 그립다.',
    createdAt: '2024. 09. 24'
  }
];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DiariesDetailProps {}

/**
 * 일기 상세 컴포넌트
 * @description 로컬스토리지에서 일기 상세 정보를 가져와 표시합니다.
 */
const DiariesDetail: React.FC<DiariesDetailProps> = () => {
  // URL에서 id 추출
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  // 일기 데이터 바인딩 훅 사용
  const { diary, isLoading, isError } = useDiaryBinding(id);
  
  const [retrospectList, setRetrospectList] = useState<RetrospectData[]>(mockRetrospectData);
  const [retrospectInput, setRetrospectInput] = useState<string>('');

  // 로딩 중이거나 에러 발생 시 처리
  if (isLoading) {
    return (
      <div className={styles.container} data-testid="diary-loading">
        <div>로딩 중...</div>
      </div>
    );
  }

  if (isError || !diary) {
    return (
      <div className={styles.container} data-testid="diary-error">
        <div>일기를 찾을 수 없습니다.</div>
      </div>
    );
  }

  /**
   * 날짜 포맷 변환
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\./g, '. ').replace(/\s/g, '');
  };

  const handleRetrospectSubmit = () => {
    if (retrospectInput.trim()) {
      const newRetrospect: RetrospectData = {
        id: Date.now().toString(),
        content: retrospectInput.trim(),
        createdAt: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).replace(/\./g, '. ').replace(/\s/g, '')
      };
      setRetrospectList(prev => [newRetrospect, ...prev]);
      setRetrospectInput('');
    }
  };

  return (
    <div className={styles.container}>
      {/* 첫 번째 gap: 1168 * 64 = 64px */}
      <div className={styles.gap1}></div>

      {/* detail-title 영역: 1168 * 84 = 84px */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title} data-testid="diary-title">{diary.title}</h1>
        </div>
        <div className={styles.emotionDateSection}>
          <div className={styles.emotionSection}>
            <Image
              src={getEmotionIcon(diary.emotion, 'small')}
              alt={getEmotionLabel(diary.emotion)}
              width={32}
              height={32}
              className={styles.emotionIcon}
              data-testid="emotion-icon"
            />
            <span 
              className={styles.emotionLabel}
              style={{ color: getEmotionColor(diary.emotion) }}
              data-testid="emotion-label"
            >
              {getEmotionLabel(diary.emotion)}
            </span>
          </div>
          <div className={styles.dateSection}>
            <span className={styles.dateText} data-testid="created-date">
              {formatDate(diary.createdAt)}
            </span>
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
          <p className={styles.contentText} data-testid="diary-content">{diary.content}</p>
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
          variant="secondary"
          theme="light"
          size="medium"
          className={styles.editButton}
        >
          수정
        </Button>
        <Button
          variant="secondary"
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
        <div className={styles.retrospectInputLabel}>회고</div>
        <div className={styles.retrospectInputContainer}>
          <Input
            variant="primary"
            theme="light"
            size="medium"
            placeholder="회고를 남겨보세요."
            value={retrospectInput}
            onChange={(e) => setRetrospectInput(e.target.value)}
            className={styles.retrospectInputField}
          />
          <Button
            variant="primary"
            theme="light"
            size="large"
            onClick={handleRetrospectSubmit}
            className={styles.retrospectInputButton}
          >
            입력
          </Button>
        </div>
      </div>

      {/* 다섯 번째 gap: 1168 * 16 = 16px */}
      <div className={styles.gap5}></div>

      {/* retrospect-list 영역: 1168 * 72 = 72px */}
      <div className={styles.retrospectList}>
        {retrospectList.map((retrospect, index) => (
          <div key={retrospect.id} className={styles.retrospectItem}>
            <div className={styles.retrospectItemContent}>
              <div className={styles.retrospectItemText}>{retrospect.content}</div>
              <div className={styles.retrospectItemDate}>[{retrospect.createdAt}]</div>
            </div>
            {index < retrospectList.length - 1 && <div className={styles.retrospectDivider} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiariesDetail;
