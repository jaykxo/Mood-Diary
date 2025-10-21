import { test, expect } from '@playwright/test';

// ========================================
// Layout Area Visibility Tests
// ========================================

test.describe('Layout Area Visibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 페이지 로드 대기 (data-testid 사용)
    await page.goto('/');
  });

  test.describe('Header Area', () => {
    test('일기 목록 페이지에서 헤더 영역이 노출되는지 확인', async ({ page }) => {
      await page.goto('/diaries');
      
      const header = page.locator('header');
      const logo = page.locator('[data-testid="logo"]');
      
      // 페이지 로드 완료 대기 (timeout 없이)
      await expect(header).toBeVisible();
      await expect(logo).toBeVisible();
    });

    test('로그인 페이지에서 헤더 영역이 숨겨지는지 확인', async ({ page }) => {
      await page.goto('/auth/login');
      
      const header = page.locator('header');
      
      await expect(header).not.toBeVisible();
    });

    test('회원가입 페이지에서 헤더 영역이 숨겨지는지 확인', async ({ page }) => {
      await page.goto('/auth/signup');
      
      const header = page.locator('header');
      
      await expect(header).not.toBeVisible();
    });

    test('사진 목록 페이지에서 헤더 영역이 노출되는지 확인', async ({ page }) => {
      await page.goto('/pictures');
      
      const header = page.locator('header');
      const logo = page.locator('[data-testid="logo"]');
      
      // 페이지 로드 완료 대기 (timeout 없이)
      await expect(header).toBeVisible();
      await expect(logo).toBeVisible();
    });
  });

  test.describe('Banner Area', () => {
    test('일기 목록 페이지에서 배너 영역이 노출되는지 확인', async ({ page }) => {
      await page.goto('/diaries');
      
      const banner = page.locator('div[class*="banner"]').first();
      
      // 페이지 로드 완료 대기 (timeout 없이)
      await expect(banner).toBeVisible();
    });

    test('로그인 페이지에서 배너 영역이 숨겨지는지 확인', async ({ page }) => {
      await page.goto('/auth/login');
      
      const banner = page.locator('div[class*="banner"]').first();
      
      await expect(banner).not.toBeVisible();
    });

    test('회원가입 페이지에서 배너 영역이 숨겨지는지 확인', async ({ page }) => {
      await page.goto('/auth/signup');
      
      const banner = page.locator('div[class*="banner"]').first();
      
      await expect(banner).not.toBeVisible();
    });

    test('사진 목록 페이지에서 배너 영역이 노출되는지 확인', async ({ page }) => {
      await page.goto('/pictures');
      
      const banner = page.locator('div[class*="banner"]').first();
      
      // 페이지 로드 완료 대기 (timeout 없이)
      await expect(banner).toBeVisible();
    });
  });

  test.describe('Navigation Area', () => {
    test('일기 목록 페이지에서 네비게이션 영역이 노출되는지 확인', async ({ page }) => {
      await page.goto('/diaries');
      
      const navigation = page.locator('nav');
      
      // 페이지 로드 완료 대기 (timeout 없이)
      await expect(navigation).toBeVisible();
    });

    test('로그인 페이지에서 네비게이션 영역이 숨겨지는지 확인', async ({ page }) => {
      await page.goto('/auth/login');
      
      const navigation = page.locator('nav');
      
      await expect(navigation).not.toBeVisible();
    });

    test('회원가입 페이지에서 네비게이션 영역이 숨겨지는지 확인', async ({ page }) => {
      await page.goto('/auth/signup');
      
      const navigation = page.locator('nav');
      
      await expect(navigation).not.toBeVisible();
    });

    test('사진 목록 페이지에서 네비게이션 영역이 노출되는지 확인', async ({ page }) => {
      await page.goto('/pictures');
      
      const navigation = page.locator('nav');
      
      // 페이지 로드 완료 대기 (timeout 없이)
      await expect(navigation).toBeVisible();
    });
  });

  test.describe('Footer Area', () => {
    test('일기 목록 페이지에서 푸터 영역이 노출되는지 확인', async ({ page }) => {
      await page.goto('/diaries');
      
      const footer = page.locator('footer');
      
      // 페이지 로드 완료 대기 (timeout 없이)
      await expect(footer).toBeVisible();
    });

    test('로그인 페이지에서 푸터 영역이 숨겨지는지 확인', async ({ page }) => {
      await page.goto('/auth/login');
      
      const footer = page.locator('footer');
      
      await expect(footer).not.toBeVisible();
    });

    test('회원가입 페이지에서 푸터 영역이 숨겨지는지 확인', async ({ page }) => {
      await page.goto('/auth/signup');
      
      const footer = page.locator('footer');
      
      await expect(footer).not.toBeVisible();
    });

    test('사진 목록 페이지에서 푸터 영역이 노출되는지 확인', async ({ page }) => {
      await page.goto('/pictures');
      
      const footer = page.locator('footer');
      
      // 페이지 로드 완료 대기 (timeout 없이)
      await expect(footer).toBeVisible();
    });
  });

  test.describe('Dynamic Routes', () => {
    test('일기 상세 페이지에서 헤더와 푸터만 노출되고 배너와 네비게이션은 숨겨지는지 확인', async ({ page }) => {
      await page.goto('/diaries/1');
      
      const header = page.locator('header');
      const banner = page.locator('div[class*="banner"]').first();
      const navigation = page.locator('nav');
      const footer = page.locator('footer');
      
      // 페이지 로드 완료 대기 (timeout 없이)
      await expect(header).toBeVisible();
      await expect(banner).not.toBeVisible();
      await expect(navigation).not.toBeVisible();
      await expect(footer).toBeVisible();
    });
  });
});
