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

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

export interface CreateUserResponse {
  _id: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

// ========================================
// Zod Schema
// ========================================

const signupSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .refine((val) => val.includes('@'), {
      message: '이메일에 @가 포함되어야 합니다.',
    }),
  password: z
    .string()
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/, '비밀번호는 영문과 숫자를 포함해야 합니다.'),
  passwordConfirm: z.string(),
  name: z.string().min(1, '이름을 입력해주세요.'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordConfirm'],
});

// ========================================
// GraphQL API
// ========================================

const createUserMutation = `
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;

async function createUser(input: CreateUserInput): Promise<CreateUserResponse> {
  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: createUserMutation,
      variables: {
        createUserInput: input,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0]?.message || '회원가입에 실패했습니다.');
  }

  if (!result.data || !result.data.createUser) {
    throw new Error('회원가입에 실패했습니다.');
  }

  return result.data.createUser;
}

// ========================================
// Auth Signup Form Hook
// ========================================

export interface UseAuthSignupFormReturn {
  /** react-hook-form register 함수 */
  register: ReturnType<typeof useForm<SignupFormData>>['register'];
  /** 폼 제출 핸들러 */
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  /** 폼 검증 에러 */
  errors: ReturnType<typeof useForm<SignupFormData>>['formState']['errors'];
  /** 제출 중인지 여부 */
  isSubmitting: boolean;
  /** 회원가입 버튼 활성화 여부 */
  isSubmitEnabled: boolean;
}

/**
 * 회원가입 폼 훅
 * @description 회원가입 폼의 상태 관리 및 제출 로직을 제공하는 커스텀 훅
 * @returns {UseAuthSignupFormReturn} 폼 관련 함수들과 상태
 */
export const useAuthSignupForm = (): UseAuthSignupFormReturn => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  // 모든 필드 값 감시
  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');
  const name = watch('name');

  /**
   * 가입완료 모달 표시
   */
  const showSignupSuccessModal = () => {
    const handleConfirm = () => {
      // 모든 모달 닫기
      closeAllModals();
      // 로그인 페이지로 이동
      router.push(URL_PATHS.AUTH.LOGIN);
    };

    const modalContent = (
      <div data-testid="signup-success-modal">
        <Modal
          variant="info"
          actions="single"
          title="가입 완료"
          content="회원가입이 완료되었습니다."
          confirmText="확인"
          onConfirm={handleConfirm}
        />
      </div>
    );

    openModal(modalContent);
  };

  /**
   * 가입실패 모달 표시
   * @param {Error} error - 에러 객체
   */
  const showSignupFailureModal = (error: Error) => {
    const handleConfirm = () => {
      // 모든 모달 닫기
      closeAllModals();
    };

    const modalContent = (
      <div data-testid="signup-failure-modal">
        <Modal
          variant="danger"
          actions="single"
          title="가입 실패"
          content={error.message || '회원가입에 실패했습니다.'}
          confirmText="확인"
          onConfirm={handleConfirm}
        />
      </div>
    );

    openModal(modalContent);
  };

  // 회원가입 mutation
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      showSignupSuccessModal();
    },
    onError: (error: Error) => {
      showSignupFailureModal(error);
    },
  });

  // 모든 필드가 입력되었는지 확인
  const isSubmitEnabled = !!(
    email &&
    password &&
    passwordConfirm &&
    name &&
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
        name: data.name,
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

