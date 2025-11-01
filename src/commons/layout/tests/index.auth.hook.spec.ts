import { test, expect } from '@playwright/test';

// ========================================
// Layout Auth Hook Tests
// ========================================

test.describe('레이아웃 인증 상태 기능', () => {
  test.describe('비로그인 유저 시나리오', () => {
    test('비회원으로 /diaries에 접속하여 페이지 로드 확인 후 로그인 버튼 확인 및 이동', async ({ page }) => {
      // 1. 비회원으로 /diaries에 접속
      await page.goto('/diaries');
      
      // 페이지 로드 식별: data-testid 대기 방법
      await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible', timeout: 500 });
      
      // 2. layout의 로그인 버튼 노출 여부 확인
      await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
      
      // 3. 로그인 버튼 클릭하여 /auth/login 페이지로 이동
      await page.locator('[data-testid="login-button"]').click({ force: true });
      
      // 로그인 페이지 로드 확인 (페이지 전환은 기본 timeout 사용)
      await page.waitForSelector('[data-testid="auth-login-page"]', { state: 'visible' });
      
      // URL 확인
      await expect(page).toHaveURL('/auth/login');
    });
  });

  test.describe('로그인 유저 시나리오', () => {
    test('로그인 후 레이아웃 인증 상태 확인 및 로그아웃 기능 테스트', async ({ page }) => {
      // 1. 비회원으로 /auth/login에 접속하여 페이지 로드 확인
      await page.goto('/auth/login');
      await page.waitForSelector('[data-testid="auth-login-page"]', { state: 'visible', timeout: 500 });
      
      // 2. 로그인 시도
      // email: a@c.com
      // password: 1234qwer
      await page.locator('input[type="email"]').fill('a@c.com');
      await page.locator('input[type="password"]').fill('1234qwer');
      
      // 로그인 버튼 클릭
      await page.locator('button:has-text("로그인")').click({ force: true });
      
      // 3. 로그인 성공 후, 완료 모달 클릭하여 /diaries 페이지 로드 확인
      await page.waitForSelector('[data-testid="login-success-modal"]', { state: 'visible' });
      await page.locator('[data-testid="login-success-modal"] button').click({ force: true });
      
      // /diaries 페이지 로드 확인
      await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible', timeout: 500 });
      await expect(page).toHaveURL('/diaries');
      
      // 4. layout에서 유저 이름, 로그아웃 버튼 노출 여부 확인
      await expect(page.locator('[data-testid="user-name"]')).toBeVisible();
      await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
      
      // 유저 이름이 표시되는지 확인
      const userName = await page.locator('[data-testid="user-name"]').textContent();
      expect(userName).toBeTruthy();
      
      // 5. 로그아웃 버튼 클릭하여 /auth/login 페이지 로드 확인
      await page.locator('[data-testid="logout-button"]').click({ force: true });
      
      // 로그인 페이지 로드 확인
      await page.waitForSelector('[data-testid="auth-login-page"]', { state: 'visible', timeout: 500 });
      await expect(page).toHaveURL('/auth/login');
      
      // 6. /diaries에 접속하여 페이지 로드 확인
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible', timeout: 500 });
      
      // 7. layout에 로그인 버튼 노출 여부 확인
      await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
    });
  });
});

