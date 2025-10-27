'use client';

import { useRouter } from 'next/navigation';
import { URL_PATHS } from '@/commons/constants/url';

// ========================================
// Type Definitions
// ========================================

export interface UseDiaryRoutingReturn {
  /** 일기 상세페이지로 이동하는 함수 */
  goToDiaryDetail: (diaryId: number) => void;
}

// ========================================
// Diaries Link Routing Hook
// ========================================

/**
 * 일기 카드 링크 라우팅 훅
 * @description 일기 카드를 클릭했을 때 해당 일기의 상세페이지로 이동하는 기능을 제공하는 커스텀 훅
 * @returns 일기 상세페이지 이동 함수
 */
export const useDiaryRouting = (): UseDiaryRoutingReturn => {
  const router = useRouter();

  /**
   * 일기 상세페이지로 이동
   * @param diaryId - 이동할 일기의 ID
   */
  const goToDiaryDetail = (diaryId: number) => {
    const path = URL_PATHS.DIARIES.DETAIL(diaryId);
    router.push(path);
  };

  return {
    goToDiaryDetail,
  };
};

