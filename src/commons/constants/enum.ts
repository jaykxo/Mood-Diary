/**
 * Emotion Enum
 * @description 감정(emotion) 데이터 타입 정의
 */

import { colors } from './color';

export enum EmotionType {
  Happy = 'Happy',
  Sad = 'Sad',
  Angry = 'Angry',
  Surprise = 'Surprise',
  Etc = 'Etc',
}

/**
 * 감정별 메타데이터 인터페이스
 */
export interface EmotionMeta {
  label: string;
  icon: {
    medium: string;
    small: string;
  };
  color: string;
}

/**
 * 감정별 메타데이터 맵
 */
export const emotionMetaMap: Record<EmotionType, EmotionMeta> = {
  [EmotionType.Happy]: {
    label: '행복해요',
    icon: {
      medium: '/icons/emotion-happy-m.svg',
      small: '/icons/emotion-happy-s.svg',
    },
    color: colors.red[60],
  },
  [EmotionType.Sad]: {
    label: '슬퍼요',
    icon: {
      medium: '/icons/emotion-sad-m.svg',
      small: '/icons/emotion-sad-s.svg',
    },
    color: colors.blue[60],
  },
  [EmotionType.Angry]: {
    label: '화나요',
    icon: {
      medium: '/icons/emotion-angry-m.svg',
      small: '/icons/emotion-angry-s.svg',
    },
    color: colors.gray[60],
  },
  [EmotionType.Surprise]: {
    label: '놀랐어요',
    icon: {
      medium: '/icons/emotion-surprise-m.svg',
      small: '/icons/emotion-surprise-s.svg',
    },
    color: colors.yellow[60],
  },
  [EmotionType.Etc]: {
    label: '기타',
    icon: {
      medium: '/icons/emotion-etc-m.svg',
      small: '/icons/emotion-etc-s.svg',
    },
    color: colors.green[60],
  },
};

/**
 * 감정 레이블 가져오기
 */
export const getEmotionLabel = (emotion: EmotionType): string => {
  return emotionMetaMap[emotion].label;
};

/**
 * 감정 아이콘 가져오기
 */
export const getEmotionIcon = (emotion: EmotionType, size: 'medium' | 'small' = 'medium'): string => {
  return emotionMetaMap[emotion].icon[size];
};

/**
 * 감정 색상 가져오기
 */
export const getEmotionColor = (emotion: EmotionType): string => {
  return emotionMetaMap[emotion].color;
};

/**
 * 모든 감정 타입 배열
 */
export const allEmotions = Object.values(EmotionType);
