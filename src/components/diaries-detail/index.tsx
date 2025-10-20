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
        <span className={styles.areaLabel}>detail-title (84px)</span>
      </div>

      {/* 두 번째 gap: 1168 * 24 = 24px */}
      <div className={styles.gap2}></div>

      {/* detail-content 영역: 1168 * 169 = 169px */}
      <div className={styles.detailContent}>
        <span className={styles.areaLabel}>detail-content (169px)</span>
      </div>

      {/* 세 번째 gap: 1168 * 24 = 24px */}
      <div className={styles.gap3}></div>

      {/* detail-footer 영역: 1168 * 56 = 56px */}
      <div className={styles.detailFooter}>
        <span className={styles.areaLabel}>detail-footer (56px)</span>
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
