/**
 * Typography Foundation
 * 
 * 프로젝트 전체에서 사용되는 타이포그래피 토큰을 정의합니다.
 * - 한글(Korean)과 영문/숫자(English/Number)에 대해 다른 폰트 패밀리 사용 가능
 * - 모바일과 데스크톱(웹)에 대한 반응형 타이포그래피 지원
 */

// ========================================
// Font Family Tokens
// ========================================

export const FONT_FAMILY = {
  /** 한글 전용 폰트 (Pretendard) */
  korean: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  
  /** 영문/숫자 전용 폰트 (SUIT) */
  english: 'SUIT Variable, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  
  /** 기본 폰트 (모든 텍스트에 적용) */
  default: 'Pretendard, SUIT Variable, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
} as const;

// ========================================
// Font Weight Tokens
// ========================================

export const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

// ========================================
// Typography Token Type Definition
// ========================================

export interface TypographyToken {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  letterSpacing?: number;
}

// ========================================
// Web (Desktop) Typography Tokens
// ========================================

export const WEB_TYPOGRAPHY = {
  // Web Headline (큰 제목, 주로 랜딩 페이지나 섹션 타이틀)
  webHeadline: {
    headline01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 48,
      lineHeight: 60,
      fontWeight: FONT_WEIGHT.semibold,
    },
    headline02: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 36,
      lineHeight: 48,
      fontWeight: FONT_WEIGHT.semibold,
    },
    headline03: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 28,
      lineHeight: 36,
      fontWeight: FONT_WEIGHT.semibold,
    },
  },
  
  // Headline (페이지/섹션 제목)
  headline: {
    headline01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 24,
      lineHeight: 32,
      fontWeight: FONT_WEIGHT.bold,
    },
    headline02: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 22,
      lineHeight: 30,
      fontWeight: FONT_WEIGHT.extrabold,
    },
    headline03: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 20,
      lineHeight: 28,
      fontWeight: FONT_WEIGHT.bold,
    },
  },
  
  // Title (컴포넌트/카드 제목)
  title: {
    title01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 18,
      lineHeight: 24,
      fontWeight: FONT_WEIGHT.bold,
    },
    title02: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.bold,
    },
    title03: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: FONT_WEIGHT.bold,
    },
    subtitle01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 14,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.semibold,
    },
    subtitle02: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: FONT_WEIGHT.semibold,
    },
  },
  
  // Body (본문 텍스트)
  body: {
    body01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: FONT_WEIGHT.medium,
    },
    body01Regular: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.regular,
    },
    body02Medium: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 14,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.medium,
    },
    body02Regular: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: FONT_WEIGHT.regular,
    },
    body03: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: FONT_WEIGHT.medium,
    },
    body03Regular: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: FONT_WEIGHT.regular,
    },
  },
  
  // Caption (작은 텍스트, 부가 정보)
  caption: {
    caption01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 12,
      lineHeight: 14,
      fontWeight: FONT_WEIGHT.semibold,
    },
    caption02Medium: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 10,
      lineHeight: 12,
      fontWeight: FONT_WEIGHT.medium,
    },
    caption02Semibold: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 10,
      lineHeight: 12,
      fontWeight: FONT_WEIGHT.semibold,
    },
    caption03: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 8,
      lineHeight: 10,
      fontWeight: FONT_WEIGHT.semibold,
    },
  },
} as const;

// ========================================
// Mobile Typography Tokens
// ========================================

export const MOBILE_TYPOGRAPHY = {
  // Headline (모바일 페이지/섹션 제목)
  headline: {
    headline01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 24,
      lineHeight: 32,
      fontWeight: FONT_WEIGHT.bold,
    },
    headline02: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 22,
      lineHeight: 30,
      fontWeight: FONT_WEIGHT.extrabold,
    },
    headline03: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 20,
      lineHeight: 28,
      fontWeight: FONT_WEIGHT.bold,
    },
  },
  
  // Title (모바일 컴포넌트/카드 제목)
  title: {
    title01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 18,
      lineHeight: 24,
      fontWeight: FONT_WEIGHT.bold,
    },
    title02: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.bold,
    },
    title03: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: FONT_WEIGHT.bold,
    },
    subtitle01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 14,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.semibold,
    },
    subtitle02: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: FONT_WEIGHT.semibold,
    },
  },
  
  // Body (모바일 본문 텍스트)
  body: {
    body01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: FONT_WEIGHT.medium,
    },
    body01Regular: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 16,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.regular,
    },
    body02Medium: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 14,
      lineHeight: 22,
      fontWeight: FONT_WEIGHT.medium,
    },
    body02Regular: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: FONT_WEIGHT.regular,
    },
    body03: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: FONT_WEIGHT.medium,
    },
    body03Regular: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: FONT_WEIGHT.regular,
    },
  },
  
  // Caption (모바일 작은 텍스트)
  caption: {
    caption01: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 12,
      lineHeight: 14,
      fontWeight: FONT_WEIGHT.semibold,
    },
    caption02Medium: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 10,
      lineHeight: 12,
      fontWeight: FONT_WEIGHT.medium,
    },
    caption02Semibold: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 10,
      lineHeight: 12,
      fontWeight: FONT_WEIGHT.semibold,
    },
    caption03: {
      fontFamily: FONT_FAMILY.default,
      fontSize: 8,
      lineHeight: 10,
      fontWeight: FONT_WEIGHT.semibold,
    },
  },
} as const;

// ========================================
// Responsive Typography Tokens
// ========================================

/**
 * 반응형 타이포그래피 토큰
 * 뷰포트 크기에 따라 자동으로 적절한 타이포그래피를 선택합니다.
 */
export const TYPOGRAPHY = {
  /** 데스크톱 기준점 (px) */
  breakpoint: 768,
  
  /** 웹(데스크톱) 타이포그래피 */
  web: WEB_TYPOGRAPHY,
  
  /** 모바일 타이포그래피 */
  mobile: MOBILE_TYPOGRAPHY,
} as const;

// ========================================
// Utility Functions
// ========================================

/**
 * 타이포그래피 토큰을 CSS 스타일 객체로 변환
 */
export function getTypographyStyle(token: TypographyToken): React.CSSProperties {
  return {
    fontFamily: token.fontFamily,
    fontSize: `${token.fontSize}px`,
    lineHeight: `${token.lineHeight}px`,
    fontWeight: token.fontWeight,
    ...(token.letterSpacing && { letterSpacing: `${token.letterSpacing}px` }),
  };
}

/**
 * 타이포그래피 토큰을 Tailwind CSS 클래스 형태의 스타일 문자열로 변환
 */
export function getTypographyClassName(token: TypographyToken): string {
  const styles: string[] = [];
  
  styles.push(`text-[${token.fontSize}px]`);
  styles.push(`leading-[${token.lineHeight}px]`);
  
  const weightMap: Record<number, string> = {
    400: 'font-normal',
    500: 'font-medium',
    600: 'font-semibold',
    700: 'font-bold',
    800: 'font-extrabold',
  };
  
  styles.push(weightMap[token.fontWeight] || 'font-normal');
  
  return styles.join(' ');
}

/**
 * 현재 뷰포트에 맞는 타이포그래피 토큰 반환 (클라이언트 사이드 전용)
 */
export function getResponsiveTypography(): typeof WEB_TYPOGRAPHY | typeof MOBILE_TYPOGRAPHY {
  if (typeof window === 'undefined') {
    return WEB_TYPOGRAPHY;
  }
  
  return window.innerWidth >= TYPOGRAPHY.breakpoint ? WEB_TYPOGRAPHY : MOBILE_TYPOGRAPHY;
}

// ========================================
// Type Exports
// ========================================

export type FontFamily = typeof FONT_FAMILY;
export type FontWeight = typeof FONT_WEIGHT;
export type WebTypography = typeof WEB_TYPOGRAPHY;
export type MobileTypography = typeof MOBILE_TYPOGRAPHY;
export type Typography = typeof TYPOGRAPHY;

