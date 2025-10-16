import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1 className={styles.logoText}>명수의 다이어리</h1>
          </div>
        </div>
      </header>
      
      <div className={styles.gap}></div>
      
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <Image src="/images/banner.png" alt="Banner" className={styles.bannerImage} width={800} height={200} />
        </div>
      </div>
      
      <div className={styles.gap}></div>
      
      <nav className={styles.navigation}>
        <div className={styles.navContent}>
          <div className={styles.tabActive}>
            <span className={styles.tabTextActive}>일기보관함</span>
          </div>
          <div className={styles.tab}>
            <span className={styles.tabTextInactive}>사진보관함</span>
          </div>
        </div>
      </nav>
      
      <div className={styles.gap}></div>
      
      <main className={styles.main}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h2 className={styles.footerTitle}>명수의 다이어리</h2>
          <div className={styles.footerInfo}>
            <p className={styles.footerRepresentative}>대표 : 명수</p>
            <p className={styles.footerCopyright}>Copyright © 2025. 명수 Co., Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
