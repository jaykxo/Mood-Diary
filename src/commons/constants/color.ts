/**
 * Color Foundation
 * 피그마 디자인 시스템에서 추출한 컬러 토큰
 * @description 라이트/다크 모드를 지원하는 컬러 시스템
 */

export const colors = {
  // Blue Colors
  blue: {
    5: '#F0F7FF',
    10: '#DBEEFF',
    20: '#BDDBFF',
    30: '#93BEFF',
    40: '#6DA5FA',
    50: '#497CFF',
    60: '#3A5CF3',
    70: '#274AE1',
    80: '#1530A6',
    90: '#0B2184',
  },

  // Gray Colors
  gray: {
    white: '#FFFFFF',
    5: '#F2F2F2',
    10: '#E4E4E4',
    20: '#D4D3D3',
    30: '#C7C7C7',
    40: '#ABABAB',
    50: '#919191',
    60: '#777777',
    70: '#5F5F5F',
    80: '#333333',
    90: '#1C1C1C',
    black: '#000000',
  },

  // Red Colors
  red: {
    5: '#FDD7DC',
    10: '#F797A4',
    20: '#F4677A',
    30: '#F03851',
    40: '#E4112E',
    50: '#B40E24',
    60: '#850A1B',
  },

  // Green Colors
  green: {
    5: '#D3F3E0',
    10: '#92E6B9',
    20: '#15D66F',
    30: '#12B75F',
    40: '#109C51',
    50: '#0E723C',
    60: '#084424',
  },

  // Yellow Colors
  yellow: {
    5: '#FFE499',
    10: '#FFD666',
    20: '#FFC933',
    30: '#FFB300',
    40: '#EBA500',
    50: '#D69600',
    60: '#B27D00',
  },

  // Cool Gray Colors
  coolGray: {
    1: '#F8F8FA',
    5: '#F6F6F9',
    10: '#EDEEF2',
    20: '#DDDFE5',
    30: '#D2D4DD',
    40: '#C7C9D5',
    50: '#BBBECD',
    60: '#B0B3C4',
  },

  // Gradients
  gradient: {
    primary: 'linear-gradient(135deg, #6DA5FA 0%, #92EAF5 100%)',
    skeleton: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.6) 48.5%, rgba(255, 255, 255, 0) 100%)',
  },

  // Semantic Colors (Light Mode)
  semantic: {
    primary: '#497CFF', // blue.50
    primaryHover: '#3A5CF3', // blue.60
    error: '#F03851', // red.30
    success: '#12B75F', // green.30
    warning: '#FFB300', // yellow.30
    info: '#6DA5FA', // blue.40
    
    background: '#FFFFFF',
    surface: '#F8F8FA',
    border: '#E4E4E4',
    
    text: {
      primary: '#000000',
      secondary: '#777777',
      tertiary: '#ABABAB',
      disabled: '#D4D3D3',
      inverse: '#FFFFFF',
    },
  },

  // Dark Mode Semantic Colors
  semanticDark: {
    primary: '#6DA5FA', // blue.40
    primaryHover: '#93BEFF', // blue.30
    error: '#F4677A', // red.20
    success: '#15D66F', // green.20
    warning: '#FFC933', // yellow.20
    info: '#93BEFF', // blue.30
    
    background: '#000000',
    surface: '#1C1C1C',
    border: '#333333',
    
    text: {
      primary: '#FFFFFF',
      secondary: '#ABABAB',
      tertiary: '#777777',
      disabled: '#5F5F5F',
      inverse: '#000000',
    },
  },
} as const;

export type ColorToken = typeof colors;

// CSS 변수명 매핑을 위한 유틸리티 타입
export type ColorVariable = 
  | `--color-blue-${keyof typeof colors.blue}`
  | `--color-gray-${keyof typeof colors.gray}`
  | `--color-red-${keyof typeof colors.red}`
  | `--color-green-${keyof typeof colors.green}`
  | `--color-yellow-${keyof typeof colors.yellow}`
  | `--color-cool-gray-${keyof typeof colors.coolGray}`
  | '--color-primary'
  | '--color-primary-hover'
  | '--color-error'
  | '--color-success'
  | '--color-warning'
  | '--color-info'
  | '--color-background'
  | '--color-surface'
  | '--color-border'
  | '--color-text-primary'
  | '--color-text-secondary'
  | '--color-text-tertiary'
  | '--color-text-disabled'
  | '--color-text-inverse';

