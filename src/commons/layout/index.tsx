'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import { useLinkRouting } from './hooks/index.link.routing.hook';
import { useAreaVisibility } from './hooks/index.area.hook';
import { useAuthHook } from './hooks/index.auth.hook';
import { Button } from '@/commons/components/button';

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

  const {
    isLoggedIn,
    userName,
    handleLogin,
    handleLogout,
  } = useAuthHook();

  return (
    <div className={styles.container}>
      {showHeader && (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            {showLogo && (
              <div className={styles.logo} onClick={handleLogoClick} data-testid="logo">
                <h1 className={styles.logoText}>명수의 다이어리</h1>
              </div>
            )}
            {isLoggedIn ? (
              <div className={styles.authStatus}>
                <span className={styles.userName} data-testid="user-name">
                  {userName}
                </span>
                <Button
                  variant="secondary"
                  theme="light"
                  size="medium"
                  className={styles.logoutButton}
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <div className={styles.authStatus}>
                <Button
                  variant="secondary"
                  theme="light"
                  size="medium"
                  className={styles.logoutButton}
                  onClick={handleLogin}
                  data-testid="login-button"
                >
                  로그인
                </Button>
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
            <h2 className={styles.footerTitle}>명수의 다이어리</h2>
            <div className={styles.footerInfo}>
              <p className={styles.footerRepresentative}>대표 : 명수</p>
              <p className={styles.footerCopyright}>Copyright © 2025. 명수 Co., Ltd.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
