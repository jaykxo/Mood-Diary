'use client';

import { useState, useEffect } from 'react';
import { EmotionType } from '@/commons/constants/enum';

// ========================================
// Type Definitions
// ========================================

export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export interface UseDiariesBindingReturn {
  /** 일기 목록 데이터 */
  diaries: DiaryData[];
  /** 데이터 로딩 중인지 여부 */
  isLoading: boolean;
  /** 에러 발생 여부 */
  isError: boolean;
}

// ========================================
// Diaries Binding Hook
// ========================================

/**
 * 일기 목록 데이터 바인딩 훅
 * @description 로컬스토리지에서 일기 목록 데이터를 가져와 바인딩하는 커스텀 훅
 * @returns 일기 목록 데이터 및 로딩 상태
 */
export const useDiariesBinding = (): UseDiariesBindingReturn => {
  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    /**
     * 로컬스토리지에서 일기 목록 데이터 가져오기
     */
    const loadDiariesData = () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // 로컬스토리지에서 diaries 데이터 가져오기
        const storedData = localStorage.getItem('diaries');
        if (!storedData) {
          // 데이터가 없는 경우 빈 배열로 설정
          setDiaries([]);
          setIsLoading(false);
          return;
        }

        const diariesData: DiaryData[] = JSON.parse(storedData);
        
        if (!Array.isArray(diariesData)) {
          setIsError(true);
          setIsLoading(false);
          return;
        }

        // 최신 일기부터 보여주기 위해 역순 정렬
        const sortedDiaries = [...diariesData].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        setDiaries(sortedDiaries);
        setIsLoading(false);
      } catch (error) {
        console.error('일기 목록 데이터 로드 실패:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    loadDiariesData();
  }, []);

  return {
    diaries,
    isLoading,
    isError,
  };
};

