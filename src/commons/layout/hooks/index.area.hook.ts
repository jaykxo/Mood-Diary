'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { getPageLayout } from '../../constants/url';

// ========================================
// Type Definitions
// ========================================

export interface AreaVisibility {
  header: boolean;
  logo: boolean;
  banner: boolean;
  navigation: boolean;
  footer: boolean;
}

// ========================================
// Area Visibility Hook
// ========================================

/**
 * 레이아웃 영역 노출 여부를 관리하는 Hook
 * @description URL 경로에 따라 각 레이아웃 영역의 노출 여부를 결정
 * @returns 각 영역의 노출 여부 상태
 */
export const useAreaVisibility = (): AreaVisibility => {
  const pathname = usePathname();

  /**
   * URL 메타데이터를 기반으로 영역 노출 여부를 계산
   */
  const calculateVisibility = useCallback((): AreaVisibility => {
    const layout = getPageLayout(pathname);

    // 기본값: 모든 영역 숨김
    const defaultVisibility: AreaVisibility = {
      header: false,
      logo: false,
      banner: false,
      navigation: false,
      footer: false,
    };

    // URL 메타데이터가 없으면 기본값 반환
    if (!layout) {
      return defaultVisibility;
    }

    return {
      header: layout.header.visible,
      logo: layout.header.logo,
      banner: layout.banner,
      navigation: layout.navigation,
      footer: layout.footer,
    };
  }, [pathname]);

  return calculateVisibility();
};
