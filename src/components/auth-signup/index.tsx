'use client';

import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { useAuthSignupForm } from './hooks/index.form.hook';
import styles from './styles.module.css';

export default function AuthSignup() {
  const { register, handleSubmit, errors, isSubmitting, isSubmitEnabled } = useAuthSignupForm();

  return (
    <div className={styles.container} data-testid="auth-signup-page">
      <div className={styles.card}>
        <h1 className={styles.title}>회원가입</h1>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            {...register('email')}
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="email"
            variant="primary"
            size="medium"
            theme="light"
            fullWidth
            required
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />
          
          <Input
            {...register('password')}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            variant="primary"
            size="medium"
            theme="light"
            fullWidth
            required
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
          
          <Input
            {...register('passwordConfirm')}
            label="비밀번호 재입력"
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            variant="primary"
            size="medium"
            theme="light"
            fullWidth
            required
            error={!!errors.passwordConfirm}
            errorMessage={errors.passwordConfirm?.message}
          />
          
          <Input
            {...register('name')}
            label="이름"
            placeholder="이름을 입력해주세요"
            type="text"
            variant="primary"
            size="medium"
            theme="light"
            fullWidth
            required
            error={!!errors.name}
            errorMessage={errors.name?.message}
          />
          
          <Button
            variant="primary"
            size="medium"
            theme="light"
            type="submit"
            fullWidth
            disabled={!isSubmitEnabled || isSubmitting}
          >
            회원가입
          </Button>
        </form>
        
        <div className={styles.footer}>
          <span className={styles.footerText}>이미 계정이 있으신가요?</span>
          <a href="/auth/login" className={styles.loginLink}>
            로그인
          </a>
        </div>
      </div>
    </div>
  );
}
