'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { useLinkRouting } from './hooks/index.link.routing.hook';
import { useAreaVisibility } from './hooks/index.area.hook';

// ========================================
// Type Definitions
// ========================================

interface LayoutProps {
  children: React.ReactNode;
}

// ========================================
// Layout Component
// ========================================

export default function Layout({ children }: LayoutProps) {
  const {
    handleLogoClick,
    handleDiariesClick,
    handlePicturesClick,
    isDiariesActive,
    isPicturesActive,
  } = useLinkRouting();

  const {
    header: showHeader,
    logo: showLogo,
    banner: showBanner,
    navigation: showNavigation,
    footer: showFooter,
  } = useAreaVisibility();

  return (
    <div className={styles.container}>
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            {showLogo && (
              <div className={styles.logo} onClick={handleLogoClick} data-testid="logo">
                <h1 className={styles.logoText}>민지의 다이어리</h1>
              </div>
            )}
          </div>
        </header>
      )}
      
      {showBanner && (
        <>
          {/* <div className={styles.gap}></div> */}
          <div className={styles.banner}>
            <div className={styles.bannerContent}>
              <Image src="/images/banner.png" alt="Banner" className={styles.bannerImage} width={800} height={200} />
            </div>
          </div>
        </>
      )}
      
      {showNavigation && (
        <>
          {/* <div className={styles.gap}></div> */}
          <nav className={styles.navigation}>
            <div className={styles.navContent}>
              <div 
                className={isDiariesActive ? styles.tabActive : styles.tab}
                onClick={handleDiariesClick}
                data-testid="diaries-tab"
              >
                <span className={isDiariesActive ? styles.tabTextActive : styles.tabTextInactive}>
                  일기보관함
                </span>
              </div>
              <div 
                className={isPicturesActive ? styles.tabActive : styles.tab}
                onClick={handlePicturesClick}
                data-testid="pictures-tab"
              >
                <span className={isPicturesActive ? styles.tabTextActive : styles.tabTextInactive}>
                  사진보관함
                </span>
              </div>
            </div>
          </nav>
        </>
      )}
      
      {/* <div className={styles.gap}></div> */}
      
      <main className={styles.main}>
        {children}
      </main>
      
      {showFooter && (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <h2 className={styles.footerTitle}>민지의 다이어리</h2>
            <div className={styles.footerInfo}>
              <p className={styles.footerRepresentative}>대표 : 민지</p>
              <p className={styles.footerCopyright}>Copyright © 2025. 민지 Co., Ltd.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
