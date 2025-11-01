'use client';

import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { useAuthLoginForm } from './hooks/index.form.hook';
import { URL_PATHS } from '@/commons/constants/url';
import styles from './styles.module.css';

export default function AuthLogin() {
  const { register, handleSubmit, errors, isSubmitting, isSubmitEnabled } = useAuthLoginForm();

  return (
    <div className={styles.container} data-testid="auth-login-page">
      <div className={styles.card}>
        <h1 className={styles.title}>로그인</h1>
        
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
          
          <Button
            variant="primary"
            size="medium"
            theme="light"
            type="submit"
            fullWidth
            disabled={!isSubmitEnabled || isSubmitting}
          >
            로그인
          </Button>
        </form>
        
        <div className={styles.footer}>
          <span className={styles.footerText}>계정이 없으신가요?</span>
          <a href={URL_PATHS.AUTH.SIGNUP} className={styles.signupLink}>
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
