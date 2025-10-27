'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

// ========================================
// Type Definitions
// ========================================

interface ModalItem {
  id: string;
  content: ReactNode;
}

interface ModalContextType {
  openModal: (content: ReactNode) => string;
  closeModal: (id?: string) => void;
  closeAllModals: () => void;
  hasOpenModal: boolean;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// ========================================
// Modal Hook
// ========================================

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// ========================================
// Modal Provider Component
// ========================================

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<ModalItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트 마운트 확인
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 모달이 열려있을 때 body 스크롤 제거
  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modals.length]);

  // ESC 키로 최상위 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modals.length > 0) {
        setModals((prev) => prev.slice(0, -1));
      }
    };

    if (modals.length > 0) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modals]);

  const openModal = useCallback((content: ReactNode): string => {
    const id = `modal-${Date.now()}-${Math.random()}`;
    setModals((prev) => [...prev, { id, content }]);
    return id;
  }, []);

  const closeModal = useCallback((id?: string) => {
    if (id) {
      setModals((prev) => prev.filter((modal) => modal.id !== id));
    } else {
      setModals((prev) => prev.slice(0, -1));
    }
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (e.target === e.currentTarget) {
      setModals((prev) => prev.slice(0, index));
    }
  };

  const modalPortals = isMounted && modals.map((modal, index) => {
    const zIndex = 1000 + index;
    
    return (
      <div
        key={modal.id}
        className={styles.backdrop}
        style={{ zIndex }}
        onClick={(e) => handleBackdropClick(e, index)}
      >
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {modal.content}
        </div>
      </div>
    );
  });

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        closeAllModals,
        hasOpenModal: modals.length > 0,
      }}
    >
      {children}
      {isMounted && modalPortals && createPortal(modalPortals, document.body)}
    </ModalContext.Provider>
  );
}

