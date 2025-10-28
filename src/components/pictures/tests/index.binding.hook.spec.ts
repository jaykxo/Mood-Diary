import { test, expect } from '@playwright/test';

test.describe('Pictures Component - Dog API Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pictures');
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="pictures-page"]');
  });

  test('should load 6 dog images from API on page load', async ({ page }) => {
    // API 요청이 완료될 때까지 대기 (timeout: 2000ms 미만)
    await page.waitForResponse(
      response => response.url().includes('dog.ceo') && response.status() === 200,
      { timeout: 1500 }
    );

    // 6개의 강아지 이미지가 로드되었는지 확인
    const images = page.locator('[data-testid="dog-image"]');
    await expect(images).toHaveCount(6);

    // 각 이미지가 dog.ceo 도메인을 포함하는지 확인
    for (let i = 0; i < 6; i++) {
      const imageSrc = await images.nth(i).getAttribute('src');
      expect(imageSrc).toContain('dog.ceo');
    }
  });

  test('should show splash screen during loading', async ({ page }) => {
    // 페이지 로드 시 스플래시 스크린이 표시되는지 확인
    const splashScreens = page.locator('[data-testid="splash-screen"]');
    await expect(splashScreens).toHaveCount(6);

    // 스플래시 스크린이 사라질 때까지 대기
    await page.waitForFunction(() => {
      const splashScreens = document.querySelectorAll('[data-testid="splash-screen"]');
      return splashScreens.length === 0;
    }, { timeout: 1500 });
  });

  test('should load more dogs when scrolling to last 2 images', async ({ page }) => {
    // 초기 6개 이미지 로드 대기
    await page.waitForResponse(
      response => response.url().includes('dog.ceo') && response.status() === 200,
      { timeout: 1500 }
    );

    // 이미지가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="dog-image"]', { timeout: 2000 });

    // 스크롤을 마지막 2개 이미지 근처로 이동
    await page.evaluate(() => {
      const images = document.querySelectorAll('[data-testid="dog-image"]');
      if (images.length >= 2) {
        const lastTwoImages = images[images.length - 2];
        lastTwoImages.scrollIntoView();
      }
    });

    // 추가 API 요청 대기
    await page.waitForResponse(
      response => response.url().includes('dog.ceo') && response.status() === 200,
      { timeout: 1500 }
    );

    // 총 12개 이미지가 로드되었는지 확인 (6 + 6)
    const images = page.locator('[data-testid="dog-image"]');
    await expect(images).toHaveCount(12);
  });

  test('should handle API failure gracefully', async ({ page }) => {
    // API 실패 시나리오를 위한 모킹
    await page.route('https://dog.ceo/api/breeds/image/random/6', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    // 페이지 새로고침하여 실패 시나리오 테스트
    await page.reload();
    await page.waitForSelector('[data-testid="pictures-page"]');

    // 에러 상태 확인 (timeout: 2000ms 미만)
    const errorMessage = page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toBeVisible({ timeout: 1500 });
  });
});
