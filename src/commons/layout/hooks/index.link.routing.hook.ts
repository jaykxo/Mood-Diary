'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { URL_PATHS } from '../../constants/url';

/**
 * Link Routing Hook
 * @description 네비게이션 메뉴의 라우팅 기능을 제공하는 커스텀 훅
 */
export const useLinkRouting = () => {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * 로고 클릭 시 일기 목록 페이지로 이동
   */
  const handleLogoClick = useCallback(() => {
    router.push(URL_PATHS.DIARIES.LIST);
  }, [router]);

  /**
   * 일기보관함 클릭 시 일기 목록 페이지로 이동
   */
  const handleDiariesClick = useCallback(() => {
    router.push(URL_PATHS.DIARIES.LIST);
  }, [router]);

  /**
   * 사진보관함 클릭 시 사진 목록 페이지로 이동
   */
  const handlePicturesClick = useCallback(() => {
    router.push(URL_PATHS.PICTURES.LIST);
  }, [router]);

  /**
   * 현재 경로가 일기보관함인지 확인
   */
  const isDiariesActive = pathname === URL_PATHS.DIARIES.LIST;

  /**
   * 현재 경로가 사진보관함인지 확인
   */
  const isPicturesActive = pathname === URL_PATHS.PICTURES.LIST;

  return {
    handleLogoClick,
    handleDiariesClick,
    handlePicturesClick,
    isDiariesActive,
    isPicturesActive,
  };
};
