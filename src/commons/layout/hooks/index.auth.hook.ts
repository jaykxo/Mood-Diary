'use client';

import { useCallback } from 'react';
import { useAuth } from '@/commons/providers/auth/auth.provider';

// ========================================
// Type Definitions
// ========================================

export interface UseAuthHookReturn {
  /** 로그인 상태 */
  isLoggedIn: boolean;
  /** 유저 정보 */
  user: { _id: string; name: string } | null;
  /** 로그인 함수 */
  handleLogin: () => void;
  /** 로그아웃 함수 */
  handleLogout: () => void;
  /** 유저 이름 */
  userName: string | null;
}

// ========================================
// Auth Hook
// ========================================

/**
 * 레이아웃 인증 훅
 * @description 인증 프로바이더를 활용하여 인증 상태를 관리하는 커스텀 훅
 * @returns {UseAuthHookReturn} 인증 관련 상태와 함수들
 */
export const useAuthHook = (): UseAuthHookReturn => {
  const { isLoggedIn, user, login, logout } = useAuth();

  /**
   * 로그인 핸들러
   */
  const handleLogin = useCallback(() => {
    login();
  }, [login]);

  /**
   * 로그아웃 핸들러
   */
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    isLoggedIn,
    user,
    handleLogin,
    handleLogout,
    userName: user?.name || null,
  };
};

