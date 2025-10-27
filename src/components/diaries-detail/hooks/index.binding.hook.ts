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

export interface UseDiaryBindingReturn {
  /** 일기 데이터 */
  diary: DiaryData | null;
  /** 데이터 로딩 중인지 여부 */
  isLoading: boolean;
  /** 에러 발생 여부 */
  isError: boolean;
}

// ========================================
// Diary Binding Hook
// ========================================

/**
 * 일기 상세 데이터 바인딩 훅
 * @description 로컬스토리지에서 일기 데이터를 가져와 바인딩하는 커스텀 훅
 * @param id - 일기 ID
 * @returns 일기 데이터 및 로딩 상태
 */
export const useDiaryBinding = (id: number): UseDiaryBindingReturn => {
  const [diary, setDiary] = useState<DiaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    /**
     * 로컬스토리지에서 일기 데이터 가져오기
     */
    const loadDiaryData = () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // 로컬스토리지에서 diaries 데이터 가져오기
        const storedData = localStorage.getItem('diaries');
        if (!storedData) {
          setIsError(true);
          setIsLoading(false);
          return;
        }

        const diaries: DiaryData[] = JSON.parse(storedData);
        
        // id에 해당하는 일기 찾기
        const foundDiary = diaries.find((diary) => diary.id === id);
        
        if (!foundDiary) {
          setIsError(true);
          setIsLoading(false);
          return;
        }

        setDiary(foundDiary);
        setIsLoading(false);
      } catch (error) {
        console.error('일기 데이터 로드 실패:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    loadDiaryData();
  }, [id]);

  return {
    diary,
    isLoading,
    isError,
  };
};

