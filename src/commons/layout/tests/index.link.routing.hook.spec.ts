import { test, expect } from '@playwright/test';

// ========================================
// Layout Link Routing Tests
// ========================================

test.describe('Layout Link Routing', () => {
  test.beforeEach(async ({ page }) => {
    // 페이지 로드 대기 (data-testid 사용)
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="logo"]', { timeout: 500 });
  });

  test('로고 클릭 시 일기 목록 페이지로 이동', async ({ page }) => {
    // 로고 클릭
    await page.click('[data-testid="logo"]');
    
    // URL이 /diaries인지 확인
    await expect(page).toHaveURL('/diaries');
  });

  test('일기보관함 탭 클릭 시 일기 목록 페이지로 이동', async ({ page }) => {
    // 일기보관함 탭 클릭
    await page.click('[data-testid="diaries-tab"]');
    
    // URL이 /diaries인지 확인
    await expect(page).toHaveURL('/diaries');
  });

  test.skip('사진보관함 탭 클릭 시 사진 목록 페이지로 이동', async ({ page }) => {
    // 사진보관함 탭 클릭
    await page.click('[data-testid="pictures-tab"]');
    
    // URL이 /pictures인지 확인
    await expect(page).toHaveURL('/pictures');
  });

  test('일기 목록 페이지에서 일기보관함 탭이 활성화 상태', async ({ page }) => {
    // 일기보관함 탭의 클래스 확인
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
    
    // 일기보관함 텍스트의 클래스 확인
    const diariesText = diariesTab.locator('span');
    await expect(diariesText).toHaveClass(/tabTextActive/);
  });

  test.skip('사진 목록 페이지에서 사진보관함 탭이 활성화 상태', async ({ page }) => {
    // 사진 목록 페이지로 이동
    await page.goto('/pictures');
    await page.waitForSelector('[data-testid="pictures-tab"]', { timeout: 500 });
    
    // 사진보관함 탭의 클래스 확인
    const picturesTab = page.locator('[data-testid="pictures-tab"]');
    await expect(picturesTab).toHaveClass(/tabActive/);
    
    // 사진보관함 텍스트의 클래스 확인
    const picturesText = picturesTab.locator('span');
    await expect(picturesText).toHaveClass(/tabTextActive/);
  });

  test('일기 목록 페이지에서 사진보관함 탭이 비활성화 상태', async ({ page }) => {
    // 사진보관함 탭의 클래스 확인
    const picturesTab = page.locator('[data-testid="pictures-tab"]');
    await expect(picturesTab).toHaveClass(/tab/);
    await expect(picturesTab).not.toHaveClass(/tabActive/);
    
    // 사진보관함 텍스트의 클래스 확인
    const picturesText = picturesTab.locator('span');
    await expect(picturesText).toHaveClass(/tabTextInactive/);
  });

  test.skip('사진 목록 페이지에서 일기보관함 탭이 비활성화 상태', async ({ page }) => {
    // 사진 목록 페이지로 이동
    await page.goto('/pictures');
    await page.waitForSelector('[data-testid="diaries-tab"]', { timeout: 500 });
    
    // 일기보관함 탭의 클래스 확인
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    await expect(diariesTab).toHaveClass(/tab/);
    await expect(diariesTab).not.toHaveClass(/tabActive/);
    
    // 일기보관함 텍스트의 클래스 확인
    const diariesText = diariesTab.locator('span');
    await expect(diariesText).toHaveClass(/tabTextInactive/);
  });

  // ========================================
  // 추가 테스트 케이스
  // ========================================

  test('로고 클릭 시 CSS 클래스가 올바르게 적용되는지 확인', async ({ page }) => {
    // 로고 클릭 전 상태 확인
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
    
    // 로고 클릭
    await page.click('[data-testid="logo"]');
    
    // 클릭 후에도 일기보관함 탭이 활성화 상태 유지
    await expect(diariesTab).toHaveClass(/tabActive/);
    const diariesText = diariesTab.locator('span');
    await expect(diariesText).toHaveClass(/tabTextActive/);
  });

  test('일기보관함 탭 클릭 시 CSS 클래스가 올바르게 적용되는지 확인', async ({ page }) => {
    // 일기보관함 탭 클릭
    await page.click('[data-testid="diaries-tab"]');
    
    // 일기보관함 탭이 활성화 상태인지 확인
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
    const diariesText = diariesTab.locator('span');
    await expect(diariesText).toHaveClass(/tabTextActive/);
    
    // 사진보관함 탭이 비활성화 상태인지 확인
    const picturesTab = page.locator('[data-testid="pictures-tab"]');
    await expect(picturesTab).toHaveClass(/tab/);
    await expect(picturesTab).not.toHaveClass(/tabActive/);
    const picturesText = picturesTab.locator('span');
    await expect(picturesText).toHaveClass(/tabTextInactive/);
  });

  test('연속 클릭 시에도 상태가 올바르게 유지되는지 확인', async ({ page }) => {
    // 일기보관함 탭을 여러 번 클릭
    await page.click('[data-testid="diaries-tab"]');
    await page.click('[data-testid="diaries-tab"]');
    await page.click('[data-testid="diaries-tab"]');
    
    // 여전히 일기보관함 탭이 활성화 상태인지 확인
    const diariesTab = page.locator('[data-testid="diaries-tab"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
    const diariesText = diariesTab.locator('span');
    await expect(diariesText).toHaveClass(/tabTextActive/);
  });
});
