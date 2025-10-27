import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// ========================================
// Diaries Link Routing Hook Tests
// ========================================

test.describe('일기 카드 링크 라우팅 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 기본 테스트 데이터 설정
    const testDiaries = [
      {
        id: 1,
        title: '첫 번째 일기',
        content: '첫 번째 일기의 내용입니다.',
        emotion: EmotionType.Happy,
        createdAt: new Date('2024-01-15T10:30:00.000Z').toISOString()
      },
      {
        id: 2,
        title: '두 번째 일기',
        content: '두 번째 일기의 내용입니다.',
        emotion: EmotionType.Sad,
        createdAt: new Date('2024-01-16T10:30:00.000Z').toISOString()
      }
    ];

    // 로컬스토리지에 실제 데이터 설정
    await page.goto('/diaries');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침
    await page.reload();
    
    // 페이지 로드 식별: data-testid 대기 방법
    await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible' });
    
    // 일기 카드 로드 확인
    await page.waitForSelector('[data-testid^="diary-card-"]', { state: 'visible' });
  });

  test.describe('성공 시나리오 - 일기 카드 전체 클릭 시 페이지 이동', () => {
    test('일기 카드 전체를 클릭하면 해당 일기 상세페이지로 이동하는지 확인', async ({ page }) => {
      // 두 번째 일기 카드 클릭 (id: 2)
      await page.locator('[data-testid="diary-card-2"]').click();
      
      // 페이지가 올바른 경로로 이동했는지 확인
      await page.waitForURL('**/diaries/2');
      expect(page.url()).toContain('/diaries/2');
    });

    test('첫 번째 일기 카드 전체를 클릭하면 해당 일기 상세페이지로 이동하는지 확인', async ({ page }) => {
      // 첫 번째 일기 카드 클릭 (id: 1)
      await page.locator('[data-testid="diary-card-1"]').click();
      
      // 페이지가 올바른 경로로 이동했는지 확인
      await page.waitForURL('**/diaries/1');
      expect(page.url()).toContain('/diaries/1');
    });

    test('일기 카드에 cursor: pointer 스타일이 적용되는지 확인', async ({ page }) => {
      // 첫 번째 일기 카드의 커서 스타일 확인
      const diaryCard = page.locator('[data-testid="diary-card-1"]');
      
      const cursor = await diaryCard.evaluate((el) => {
        return window.getComputedStyle(el).cursor;
      });
      
      expect(cursor).toBe('pointer');
    });
  });

  test.describe('실패 시나리오 - 삭제 아이콘 클릭 시 페이지 이동 안 함', () => {
    test('삭제 아이콘을 클릭하면 페이지가 이동하지 않는지 확인', async ({ page }) => {
      // 현재 URL 저장
      const beforeUrl = page.url();
      
      // 삭제 아이콘 찾아서 클릭
      const closeButton = page.locator('[data-testid="diary-delete-2"]');
      await closeButton.click();
      
      // URL이 변경되지 않았는지 확인
      const afterUrl = page.url();
      expect(afterUrl).toBe(beforeUrl);
      expect(afterUrl).toContain('/diaries'); // 여전히 일기 목록 페이지
      expect(afterUrl).not.toContain('/diaries/2'); // 상세페이지로 이동하지 않음
    });

    test('삭제 아이콘에 cursor: pointer 스타일이 적용되는지 확인', async ({ page }) => {
      // 삭제 아이콘의 커서 스타일 확인
      const closeButton = page.locator('[data-testid="diary-delete-1"]');
      
      const cursor = await closeButton.evaluate((el) => {
        return window.getComputedStyle(el).cursor;
      });
      
      expect(cursor).toBe('pointer');
    });
  });

  test.describe('성공 시나리오 - URL 생성 확인', () => {
    test('url.ts를 import하여 경로를 하드코딩하지 않고 동적으로 생성하는지 확인', async ({ page }) => {
      // 일기 카드 클릭
      await page.locator('[data-testid="diary-card-1"]').click();
      
      // URL이 올바른 형식인지 확인 (url.ts의 URL_PATHS.DIARIES.DETAIL 사용)
      await page.waitForURL('**/diaries/1');
      const url = page.url();
      
      // URL이 /diaries/[id] 형식을 따르는지 확인
      const urlPattern = /\/diaries\/\d+$/;
      expect(urlPattern.test(url)).toBe(true);
      
      // ID가 올바른지 확인
      expect(url).toContain('/diaries/1');
    });

    test('여러 일기 카드를 연속으로 클릭할 때 올바른 경로로 이동하는지 확인', async ({ page }) => {
      // 첫 번째 일기 카드 클릭
      await page.locator('[data-testid="diary-card-1"]').click();
      await page.waitForURL('**/diaries/1');
      expect(page.url()).toContain('/diaries/1');
      
      // 이전 페이지로 돌아가기
      await page.goBack();
      
      // 페이지 로드 식별
      await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible' });
      await page.waitForSelector('[data-testid^="diary-card-"]', { state: 'visible' });
      
      // 두 번째 일기 카드 클릭
      await page.locator('[data-testid="diary-card-2"]').click();
      await page.waitForURL('**/diaries/2');
      expect(page.url()).toContain('/diaries/2');
    });
  });
});

