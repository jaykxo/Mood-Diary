/**
 * URL Constants
 * @description URL 경로 관리 및 라우팅 설정
 */

/**
 * 접근 권한 타입
 */
export enum AccessType {
  Public = 'Public', // 누구나 접근 가능
  MemberOnly = 'MemberOnly', // 회원 전용
}

/**
 * 페이지 레이아웃 설정 인터페이스
 */
export interface PageLayout {
  header: {
    visible: boolean;
    logo: boolean;
    darkModeToggle: boolean;
  };
  banner: boolean;
  navigation: boolean;
  footer: boolean;
}

/**
 * URL 메타데이터 인터페이스
 */
export interface UrlMeta {
  path: string;
  accessType: AccessType;
  layout: PageLayout;
}

/**
 * URL 경로 상수
 */
export const URL_PATHS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  DIARIES: {
    LIST: '/diaries',
    DETAIL: (id: string | number) => `/diaries/${id}`,
    DETAIL_TEMPLATE: '/diaries/[id]',
  },
  PICTURES: {
    LIST: '/pictures',
  },
} as const;

/**
 * URL 메타데이터 맵
 */
export const urlMetaMap: Record<string, UrlMeta> = {
  // 로그인
  [URL_PATHS.AUTH.LOGIN]: {
    path: URL_PATHS.AUTH.LOGIN,
    accessType: AccessType.Public,
    layout: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  // 회원가입
  [URL_PATHS.AUTH.SIGNUP]: {
    path: URL_PATHS.AUTH.SIGNUP,
    accessType: AccessType.Public,
    layout: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  // 일기 목록
  [URL_PATHS.DIARIES.LIST]: {
    path: URL_PATHS.DIARIES.LIST,
    accessType: AccessType.Public,
    layout: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  // 일기 상세 (다이나믹 라우팅)
  [URL_PATHS.DIARIES.DETAIL_TEMPLATE]: {
    path: URL_PATHS.DIARIES.DETAIL_TEMPLATE,
    accessType: AccessType.MemberOnly,
    layout: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: true,
    },
  },
  // 사진 목록
  [URL_PATHS.PICTURES.LIST]: {
    path: URL_PATHS.PICTURES.LIST,
    accessType: AccessType.Public,
    layout: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
};

/**
 * URL 메타데이터 가져오기
 * @param path - URL 경로
 * @returns URL 메타데이터
 */
export const getUrlMeta = (path: string): UrlMeta | undefined => {
  // 다이나믹 라우팅 처리: /diaries/123 -> /diaries/[id]
  const diaryDetailPattern = /^\/diaries\/[^/]+$/;
  if (diaryDetailPattern.test(path)) {
    return urlMetaMap[URL_PATHS.DIARIES.DETAIL_TEMPLATE];
  }

  return urlMetaMap[path];
};

/**
 * 페이지 레이아웃 설정 가져오기
 * @param path - URL 경로
 * @returns 페이지 레이아웃 설정
 */
export const getPageLayout = (path: string): PageLayout | undefined => {
  return getUrlMeta(path)?.layout;
};

/**
 * 접근 권한 확인
 * @param path - URL 경로
 * @returns 접근 권한 타입
 */
export const getAccessType = (path: string): AccessType | undefined => {
  return getUrlMeta(path)?.accessType;
};

/**
 * 회원 전용 페이지 여부 확인
 * @param path - URL 경로
 * @returns 회원 전용 여부
 */
export const isMemberOnlyPage = (path: string): boolean => {
  return getAccessType(path) === AccessType.MemberOnly;
};

/**
 * 공개 페이지 여부 확인
 * @param path - URL 경로
 * @returns 공개 페이지 여부
 */
export const isPublicPage = (path: string): boolean => {
  return getAccessType(path) === AccessType.Public;
};

/**
 * 모든 URL 경로 배열
 */
export const allUrlPaths = Object.values(urlMetaMap).map((meta) => meta.path);

