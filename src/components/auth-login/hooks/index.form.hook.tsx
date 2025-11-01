'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { URL_PATHS } from '@/commons/constants/url';

// ========================================
// Type Definitions
// ========================================

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  accessToken: string;
}

export interface FetchUserLoggedInResponse {
  _id: string;
  name: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// ========================================
// Zod Schema
// ========================================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .refine((val) => val.includes('@'), {
      message: '이메일에 @가 포함되어야 합니다.',
    }),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.'),
});

// ========================================
// GraphQL API
// ========================================

const loginUserMutation = `
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const fetchUserLoggedInQuery = `
  query FetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      name
    }
  }
`;

/**
 * 로그인 API 호출
 */
async function loginUser(input: LoginUserInput): Promise<LoginUserResponse> {
  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: loginUserMutation,
      variables: {
        email: input.email,
        password: input.password,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0]?.message || '로그인에 실패했습니다.');
  }

  if (!result.data || !result.data.loginUser) {
    throw new Error('로그인에 실패했습니다.');
  }

  return result.data.loginUser;
}

/**
 * 로그인한 사용자 정보 조회 API 호출
 */
async function fetchUserLoggedIn(accessToken: string): Promise<FetchUserLoggedInResponse> {
  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: fetchUserLoggedInQuery,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0]?.message || '사용자 정보를 가져오는데 실패했습니다.');
  }

  if (!result.data || !result.data.fetchUserLoggedIn) {
    throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  }

  return result.data.fetchUserLoggedIn;
}

// ========================================
// Auth Login Form Hook
// ========================================

export interface UseAuthLoginFormReturn {
  /** react-hook-form register 함수 */
  register: ReturnType<typeof useForm<LoginFormData>>['register'];
  /** 폼 제출 핸들러 */
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  /** 폼 검증 에러 */
  errors: ReturnType<typeof useForm<LoginFormData>>['formState']['errors'];
  /** 제출 중인지 여부 */
  isSubmitting: boolean;
  /** 로그인 버튼 활성화 여부 */
  isSubmitEnabled: boolean;
}

/**
 * 로그인 폼 훅
 * @description 로그인 폼의 상태 관리 및 제출 로직을 제공하는 커스텀 훅
 * @returns {UseAuthLoginFormReturn} 폼 관련 함수들과 상태
 */
export const useAuthLoginForm = (): UseAuthLoginFormReturn => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  // 모든 필드 값 감시
  const email = watch('email');
  const password = watch('password');

  /**
   * 로그인완료 모달 표시
   */
  const showLoginSuccessModal = () => {
    const handleConfirm = () => {
      // 모든 모달 닫기
      closeAllModals();
      // 일기목록 페이지로 이동
      router.push(URL_PATHS.DIARIES.LIST);
    };

    const modalContent = (
      <div data-testid="login-success-modal">
        <Modal
          variant="info"
          actions="single"
          title="로그인 완료"
          content="로그인이 완료되었습니다."
          confirmText="확인"
          onConfirm={handleConfirm}
        />
      </div>
    );

    openModal(modalContent);
  };

  /**
   * 로그인실패 모달 표시
   * @param {Error} error - 에러 객체
   */
  const showLoginFailureModal = (error: Error) => {
    const handleConfirm = () => {
      // 모든 모달 닫기
      closeAllModals();
    };

    const modalContent = (
      <div data-testid="login-failure-modal">
        <Modal
          variant="danger"
          actions="single"
          title="로그인 실패"
          content={error.message || '로그인에 실패했습니다.'}
          confirmText="확인"
          onConfirm={handleConfirm}
        />
      </div>
    );

    openModal(modalContent);
  };

  // 로그인 mutation
  const mutation = useMutation({
    mutationFn: async (input: LoginUserInput) => {
      // 1. 로그인 API 호출
      const loginResult = await loginUser(input);
      
      // 2. accessToken을 로컬스토리지에 저장
      localStorage.setItem('accessToken', loginResult.accessToken);
      
      // 3. 사용자 정보 조회 API 호출
      const userResult = await fetchUserLoggedIn(loginResult.accessToken);
      
      // 4. 사용자 정보를 로컬스토리지에 저장
      localStorage.setItem('user', JSON.stringify({
        _id: userResult._id,
        name: userResult.name,
      }));
      
      return { accessToken: loginResult.accessToken, user: userResult };
    },
    onSuccess: () => {
      showLoginSuccessModal();
    },
    onError: (error: Error) => {
      showLoginFailureModal(error);
    },
  });

  // 모든 필드가 입력되었는지 확인
  const isSubmitEnabled = !!(
    email &&
    password &&
    isValid &&
    !mutation.isPending
  );

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    formHandleSubmit((data) => {
      mutation.mutate({
        email: data.email,
        password: data.password,
      });
    })();
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: mutation.isPending,
    isSubmitEnabled,
  };
};

