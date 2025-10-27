import { test, expect } from '@playwright/test';

// ========================================
// Diaries New Modal Close Hook Tests
// ========================================

test.describe('일기쓰기 모달 닫기 기능', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지가 완전히 로드될 때까지 대기
    await page.goto('/diaries');
    
    // 페이지 로드 식별: data-testid 사용
    await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible' });
    
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.locator('[data-testid="diary-write-button"]').click({ force: true });
    
    // 일기쓰기 모달이 열렸는지 확인
    await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible();
  });

  test.describe('등록취소 모달 열기', () => {
    test('닫기 버튼 클릭시 등록취소 모달이 열리는지 확인', async ({ page }) => {
      // 닫기 버튼 클릭
      await page.locator('[data-testid="close-button"]').click({ force: true });
      
      // 등록취소 모달이 표시되는지 확인
      await expect(page.locator('[data-testid="cancel-confirmation-modal"]')).toBeVisible();
      
      // 등록취소 모달 내용 확인
      await expect(page.locator('[data-testid="cancel-confirmation-modal"] h2')).toHaveText('일기 등록 취소');
    });

    test('등록취소 모달이 일기쓰기 모달 위에 2중 모달로 표시되는지 확인', async ({ page }) => {
      // 닫기 버튼 클릭하여 등록취소 모달 열기
      await page.locator('[data-testid="close-button"]').click({ force: true });
      
      // 일기쓰기 모달과 등록취소 모달이 모두 표시되는지 확인
      await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible();
      await expect(page.locator('[data-testid="cancel-confirmation-modal"]')).toBeVisible();
    });
  });

  test.describe('등록취소 모달 닫기', () => {
    test.beforeEach(async ({ page }) => {
      // 등록취소 모달을 열어둔 상태로 설정
      await page.locator('[data-testid="close-button"]').click({ force: true });
      await expect(page.locator('[data-testid="cancel-confirmation-modal"]')).toBeVisible();
    });

    test('계속작성 버튼 클릭시 등록취소 모달만 닫히는지 확인', async ({ page }) => {
      // 계속작성 버튼 클릭 (텍스트로 찾기)
      await page.locator('button:has-text("계속 작성")').click({ force: true });
      
      // 등록취소 모달은 닫히고 일기쓰기 모달은 여전히 열려있는지 확인
      await expect(page.locator('[data-testid="cancel-confirmation-modal"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible();
    });

    test('등록취소 버튼 클릭시 부모와 자식 모달 모두 닫히는지 확인', async ({ page }) => {
      // 등록취소 버튼 클릭 (텍스트로 찾기)
      await page.locator('button:has-text("등록 취소")').click({ force: true });
      
      // 일기쓰기 모달과 등록취소 모달이 모두 닫혔는지 확인
      await expect(page.locator('[data-testid="diary-write-modal"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="cancel-confirmation-modal"]')).not.toBeVisible();
    });
  });
});

