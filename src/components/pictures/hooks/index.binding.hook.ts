import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

interface DogImage {
  id: string;
  src: string;
}

interface DogApiResponse {
  message: string[];
  status: string;
}

// 강아지 이미지 조회 API 함수
const fetchDogImages = async (count: number = 6): Promise<DogImage[]> => {
  const response = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
  
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }
  
  const data: DogApiResponse = await response.json();
  
  return data.message.map((url, index) => ({
    id: `dog-${Date.now()}-${index}`,
    src: url,
  }));
};

export const usePicturesBinding = () => {
  const [dogImages, setDogImages] = useState<DogImage[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement | null>(null);

  // 초기 강아지 이미지 로드 - @tanstack/react-query 사용
  const { data: initialImages, isLoading, error: initialError, isError } = useQuery({
    queryKey: ['dog-images', 'initial'],
    queryFn: () => fetchDogImages(6),
    staleTime: 5 * 60 * 1000,
    retry: 0,
    retryOnMount: false,
  });

  // 초기 데이터 설정
  useEffect(() => {
    if (initialImages) {
      setDogImages(initialImages);
    }
  }, [initialImages]);

  // 추가 강아지 이미지 로드 함수
  const loadMoreImages = useCallback(async () => {
    if (isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    try {
      const newImages = await fetchDogImages(6);
      setDogImages(prev => [...prev, ...newImages]);
    } catch {
      // 에러 처리는 react-query가 담당
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore]);

  // 무한스크롤을 위한 Intersection Observer 설정
  useEffect(() => {
    if (!lastImageRef.current || dogImages.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore && !isLoading) {
          loadMoreImages();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observerRef.current.observe(lastImageRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreImages, isLoadingMore, isLoading, dogImages.length]);

  // 스크롤 이벤트 핸들러 (마지막 2개 이미지 근처에서 트리거)
  const handleScroll = useCallback(() => {
    if (isLoadingMore || isLoading || dogImages.length < 2) return;
    
    const images = document.querySelectorAll('[data-testid="dog-image"]');
    if (images.length < 2) return;
    
    const lastTwoImages = images[images.length - 2];
    const rect = lastTwoImages.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // 마지막 2번째 이미지가 화면에 보이면 추가 로드
    if (rect.top <= windowHeight) {
      loadMoreImages();
    }
  }, [loadMoreImages, isLoadingMore, isLoading, dogImages.length]);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 에러 발생 시 재시도 함수
  const retry = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    dogImages,
    isLoading,
    isLoadingMore,
    error: isError ? (initialError?.message || '이미지 로드에 실패했습니다') : null,
    lastImageRef,
    loadMoreImages,
    retry,
  };
};