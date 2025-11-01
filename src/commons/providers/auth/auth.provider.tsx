'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { URL_PATHS } from '@/commons/constants/url';

// ========================================
// Type Definitions
// ========================================

interface User {
  _id: string;
  name: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  getUser: () => User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ========================================
// Auth Hook
// ========================================

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ========================================
// Helper Functions
// ========================================

/**
 * 로컬스토리지에서 accessToken 조회
 */
const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

/**
 * 로컬스토리지에서 user 조회
 */
const getUserFromStorage = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * 로그인 상태 확인 (accessToken 유무로 판단)
 */
const checkIsLoggedIn = (): boolean => {
  return getAccessToken() !== null;
};

// ========================================
// Auth Provider Component
// ========================================

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // 로그인 상태 (로컬스토리지의 accessToken 유무로 판단)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // 유저 정보
  const [user, setUser] = useState<User | null>(null);

  const syncAuthState = useCallback(() => {
    const loggedIn = checkIsLoggedIn();
    const userData = getUserFromStorage();
    setIsLoggedIn(loggedIn);
    setUser(userData);
  }, []);

  // 초기 마운트 시 및 경로 변경 시 인증 상태 동기화
  useEffect(() => {
    syncAuthState();
  }, [syncAuthState, pathname]);

  // 로컬스토리지 변경 감지 (다른 탭이나 창에서 변경된 경우 대응)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'user') {
        syncAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [syncAuthState]);

  const login = useCallback(() => {
    router.push(URL_PATHS.AUTH.LOGIN);
  }, [router]);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
    syncAuthState();
    router.push(URL_PATHS.AUTH.LOGIN);
  }, [router, syncAuthState]);

  const getUser = useCallback((): User | null => {
    return getUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

