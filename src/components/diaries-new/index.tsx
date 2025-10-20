import React from 'react';
import styles from './styles.module.css';

const DiariesNew = () => {
  return (
    <div className={styles.wrapper}>
      {/* Header 영역 */}
      <div className={styles.header}></div>
      
      {/* Gap */}
      <div className={styles.gap}></div>
      
      {/* Emotion Box 영역 */}
      <div className={styles.emotionBox}></div>
      
      {/* Gap */}
      <div className={styles.gap}></div>
      
      {/* Input Title 영역 */}
      <div className={styles.inputTitle}></div>
      
      {/* Gap - 24px */}
      <div className={styles.gap24}></div>
      
      {/* Input Content 영역 */}
      <div className={styles.inputContent}></div>
      
      {/* Gap */}
      <div className={styles.gap}></div>
      
      {/* Footer 영역 */}
      <div className={styles.footer}></div>
    </div>
  );
};

export default DiariesNew;
