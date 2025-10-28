'use client';

import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import styles from './styles.module.css';

export default function AuthSignup() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>회원가입</h1>
        
        <form className={styles.form}>
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            type="email"
            variant="primary"
            size="medium"
            theme="light"
            fullWidth
            required
          />
          
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            variant="primary"
            size="medium"
            theme="light"
            fullWidth
            required
          />
          
          <Input
            label="비밀번호 재입력"
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            variant="primary"
            size="medium"
            theme="light"
            fullWidth
            required
          />
          
          <Input
            label="이름"
            placeholder="이름을 입력해주세요"
            type="text"
            variant="primary"
            size="medium"
            theme="light"
            fullWidth
            required
          />
          
          <Button
            variant="primary"
            size="medium"
            theme="light"
            type="submit"
            fullWidth
          >
            회원가입
          </Button>
        </form>
        
        <div className={styles.footer}>
          <span className={styles.footerText}>이미 계정이 있으신가요?</span>
          <a href="/auth/signin" className={styles.loginLink}>
            로그인
          </a>
        </div>
      </div>
    </div>
  );
}
