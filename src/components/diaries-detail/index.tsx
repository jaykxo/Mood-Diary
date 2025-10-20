import React from 'react';
import styles from './styles.module.css';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DiariesDetailProps {}

const DiariesDetail: React.FC<DiariesDetailProps> = () => {
  return (
    <div className={styles.container}>
      {/* 첫 번째 gap: 1168 * 64 = 64px */}
      <div className={styles.gap1}></div>

      {/* detail-title 영역: 1168 * 84 = 84px */}
      <div className={styles.detailTitle}>
        <h1>일기 제목</h1>
      </div>

      {/* 두 번째 gap: 1168 * 24 = 24px */}
      <div className={styles.gap2}></div>

      {/* detail-content 영역: 1168 * 169 = 169px */}
      <div className={styles.detailContent}>
        <p>일기 내용이 여기에 표시됩니다.</p>
      </div>

      {/* 세 번째 gap: 1168 * 24 = 24px */}
      <div className={styles.gap3}></div>

      {/* detail-footer 영역: 1168 * 56 = 56px */}
      <div className={styles.detailFooter}>
        <div className={styles.footerContent}>
          <span>작성일: 2024-01-01</span>
          <div className={styles.footerActions}>
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
      </div>

      {/* 네 번째 gap: 1168 * 24 = 24px */}
      <div className={styles.gap4}></div>

      {/* retrospect-input 영역: 1168 * 85 = 85px */}
      <div className={styles.retrospectInput}>
        <textarea 
          placeholder="회고 내용을 입력하세요..."
          className={styles.textarea}
        />
        <button className={styles.submitButton}>등록</button>
      </div>

      {/* 다섯 번째 gap: 1168 * 16 = 16px */}
      <div className={styles.gap5}></div>

      {/* retrospect-list 영역: 1168 * 72 = 72px */}
      <div className={styles.retrospectList}>
        <div className={styles.retrospectItem}>
          <span>회고 내용 1</span>
          <button>삭제</button>
        </div>
        <div className={styles.retrospectItem}>
          <span>회고 내용 2</span>
          <button>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default DiariesDetail;
