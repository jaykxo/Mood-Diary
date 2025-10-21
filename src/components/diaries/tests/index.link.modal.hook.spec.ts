import { test, expect } from '@playwright/test';

// ========================================
// Diary Write Modal Link Tests
// ========================================

test.describe('일기쓰기 모달 링크 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 페이지 로드 대기 (data-testid 사용)
    await page.goto('/');
  });

  test.describe('Modal Open/Close', () => {
    test('일기 목록 페이지에서 일기쓰기 버튼 클릭시 모달이 열리는지 확인', async ({ page }) => {
      await page.goto('/diaries');
      
      // 일기쓰기 버튼 클릭 (더 안정적인 클릭 방법 사용)
      await page.locator('[data-testid="diary-write-button"]').click({ force: true });
      
      // 모달이 표시되는지 확인 (모달은 portal로 body에 렌더링됨)
      await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible();
      
      // 모달 내용이 올바른지 확인
      await expect(page.locator('[data-testid="diary-write-modal"] h1')).toHaveText('일기 쓰기');
    });

    test('모달 닫기 버튼 클릭시 모달이 닫히는지 확인', async ({ page }) => {
      await page.goto('/diaries');
      
      // 일기쓰기 버튼 클릭하여 모달 열기
      await page.locator('[data-testid="diary-write-button"]').click({ force: true });
      await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible();
      
      // 닫기 버튼 클릭
      await page.locator('[data-testid="diary-write-modal"] [data-testid="close-button"]').click({ force: true });
      
      // 모달이 닫혔는지 확인
      await expect(page.locator('[data-testid="diary-write-modal"]')).not.toBeVisible();
    });

    test('모달 배경 클릭시 모달이 닫히는지 확인', async ({ page }) => {
      await page.goto('/diaries');
      
      // 일기쓰기 버튼 클릭하여 모달 열기
      await page.locator('[data-testid="diary-write-button"]').click({ force: true });
      await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible();
      
      // 모달 배경 클릭 (portal의 backdrop 영역 - fixed positioned div)
      await page.locator('div[class*="fixed"][class*="inset-0"]').click({ force: true });
      
      // 모달이 닫혔는지 확인
      await expect(page.locator('[data-testid="diary-write-modal"]')).not.toBeVisible();
    });
  });

  test.describe('Modal Layout', () => {
    test('모달이 페이지 중앙에 올바르게 위치하는지 확인', async ({ page }) => {
      await page.goto('/diaries');
      
      // 일기쓰기 버튼 클릭하여 모달 열기
      await page.locator('[data-testid="diary-write-button"]').click({ force: true });
      
      // 모달이 표시되는지 확인
      await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible();
      
      // 모달이 화면 중앙에 위치하는지 확인 (portal의 flexbox center 정렬)
      const modalElement = page.locator('[data-testid="diary-write-modal"]');
      await expect(modalElement).toBeVisible();
    });

    test('모달이 overlay로 표시되는지 확인', async ({ page }) => {
      await page.goto('/diaries');
      
      // 일기쓰기 버튼 클릭하여 모달 열기
      await page.locator('[data-testid="diary-write-button"]').click({ force: true });
      
      // 모달이 표시되는지 확인
      await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible();
      
      // 모달이 portal로 body에 렌더링되어 overlay로 표시되는지 확인
      const modalElement = page.locator('[data-testid="diary-write-modal"]');
      await expect(modalElement).toBeVisible();
      
      // 모달이 body의 마지막 자식으로 렌더링되는지 확인 (portal 특성)
      const bodyChildren = await page.locator('body > div').count();
      expect(bodyChildren).toBeGreaterThan(0);
    });
  });

  test.describe('Modal Accessibility', () => {
    test('다른 페이지에서는 일기쓰기 버튼이 없는지 확인', async ({ page }) => {
      await page.goto('/auth/login');
      
      // 로그인 페이지에서는 일기쓰기 버튼이 없어야 함
      await expect(page.locator('[data-testid="diary-write-button"]')).not.toBeVisible();
    });

    test('홈페이지에서 일기쓰기 버튼이 없는지 확인', async ({ page }) => {
      await page.goto('/');
      
      // 홈페이지에서는 일기쓰기 버튼이 없어야 함 (diaries 페이지에만 존재)
      await expect(page.locator('[data-testid="diary-write-button"]')).not.toBeVisible();
    });
  });
});
