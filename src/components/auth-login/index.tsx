'use client';

import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import styles from './styles.module.css';

export default function AuthLogin() {
  return (
    <div className={styles.container} data-testid="auth-login-page">
      <div className={styles.card}>
        <h1 className={styles.title}>로그인</h1>
        
        <form className={styles.form}>
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="email"
            variant="primary"
            size="medium"
            theme="light"
            fullWidth
          />
          
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            variant="primary"
            size="medium"
            theme="light"
            fullWidth
          />
          
          <Button
            variant="primary"
            size="medium"
            theme="light"
            type="submit"
            fullWidth
          >
            로그인
          </Button>
        </form>
        
        <div className={styles.footer}>
          <span className={styles.footerText}>계정이 없으신가요?</span>
          <a href="/auth/signup" className={styles.signupLink}>
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
