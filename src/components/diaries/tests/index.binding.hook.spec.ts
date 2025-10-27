import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// ========================================
// Diaries Binding Hook Tests
// ========================================

test.describe('일기 목록 데이터 바인딩 기능', () => {
  test.describe('성공 시나리오 - 일기 목록 표시', () => {
    test('로컬스토리지에서 일기 목록 데이터를 가져와 표시하는지 확인', async ({ page }) => {
      // 테스트 데이터 준비
      const testDiaries = [
        {
          id: 1,
          title: '첫 번째 일기',
          content: '첫 번째 일기의 내용입니다. 이 내용은 일기 카드에 표시되어야 합니다.',
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

      // 페이지 새로고침하여 로컬스토리지 데이터 적용
      await page.reload();

      // 페이지 로드 식별: data-testid 대기 방법
      await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible' });
      
      // 일기 카드 로드를 위해 잠시 대기
      await page.waitForTimeout(500);

      // 첫 번째 일기 카드 확인
      const firstDiaryTitle = await page.locator('[data-testid="diary-title"]').first().textContent();
      expect(firstDiaryTitle).toBe('두 번째 일기'); // 최신순으로 정렬되므로

      // 일기 카드가 2개 표시되는지 확인
      const diaryCards = await page.locator('[data-testid^="diary-card-"]').count();
      expect(diaryCards).toBe(2);
    });

    test('다양한 감정 타입의 일기 목록이 올바르게 표시되는지 확인', async ({ page }) => {
      // 여러 감정 타입의 테스트 데이터 준비
      const testDiaries = [
        {
          id: 1,
          title: '슬픈 일기',
          content: '오늘은 슬펐어요.',
          emotion: EmotionType.Sad,
          createdAt: new Date('2024-01-15T10:30:00.000Z').toISOString()
        },
        {
          id: 2,
          title: '화난 일기',
          content: '오늘은 화가 났어요.',
          emotion: EmotionType.Angry,
          createdAt: new Date('2024-01-16T10:30:00.000Z').toISOString()
        },
        {
          id: 3,
          title: '놀란 일기',
          content: '오늘은 놀랐어요.',
          emotion: EmotionType.Surprise,
          createdAt: new Date('2024-01-17T10:30:00.000Z').toISOString()
        },
        {
          id: 4,
          title: '기타 일기',
          content: '오늘은 평범했어요.',
          emotion: EmotionType.Etc,
          createdAt: new Date('2024-01-18T10:30:00.000Z').toISOString()
        }
      ];

      // 로컬스토리지에 실제 데이터 설정
      await page.goto('/diaries');
      await page.evaluate((diaries) => {
        localStorage.setItem('diaries', JSON.stringify(diaries));
      }, testDiaries);
      
      // 페이지 새로고침
      await page.reload();
      
      // 페이지 로드 식별
      await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible' });
      
      // 일기 카드 로드를 위해 잠시 대기
      await page.waitForTimeout(500);

      // 일기 카드가 4개 표시되는지 확인
      const diaryCards = await page.locator('[data-testid^="diary-card-"]').count();
      expect(diaryCards).toBe(4);

      // 각 감정의 감정 레이블이 올바르게 표시되는지 확인
      const emotionLabels = await page.locator('[data-testid="emotion-label"]').all();
      const expectedLabels = ['기타', '놀랐어요', '화나요', '슬퍼요']; // 최신순으로 정렬
      for (let i = 0; i < emotionLabels.length; i++) {
        const labelText = await emotionLabels[i].textContent();
        expect(labelText).toBe(expectedLabels[i]);
      }
    });

    test('제목이 일기카드 사이즈를 넘어가는 경우 "..."으로 표현되는지 확인', async ({ page }) => {
      // 긴 제목의 테스트 데이터 준비
      const testDiaries = [
        {
          id: 1,
          title: '이것은 매우 긴 제목입니다. 일기카드 사이즈를 넘어서는 긴 제목이므로 ellipsis가 적용되어야 합니다.',
          content: '내용입니다.',
          emotion: EmotionType.Happy,
          createdAt: new Date('2024-01-15T10:30:00.000Z').toISOString()
        }
      ];

      // 로컬스토리지에 실제 데이터 설정
      await page.goto('/diaries');
      await page.evaluate((diaries) => {
        localStorage.setItem('diaries', JSON.stringify(diaries));
      }, testDiaries);
      
      // 페이지 새로고침
      await page.reload();
      
      // 페이지 로드 식별
      await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible' });
      
      // 일기 카드 로드를 위해 잠시 대기
      await page.waitForTimeout(500);

      // 제목이 ellipsis가 적용되었는지 확인 (CSS의 text-overflow: ellipsis 확인)
      const titleElement = page.locator('[data-testid="diary-title"]').first();
      
      // CSS computed 스타일에서 text-overflow 확인
      const textOverflow = await titleElement.evaluate((el) => {
        return window.getComputedStyle(el).textOverflow;
      });
      expect(textOverflow).toBe('ellipsis');
      
      // CSS computed 스타일에서 white-space 확인
      const whiteSpace = await titleElement.evaluate((el) => {
        return window.getComputedStyle(el).whiteSpace;
      });
      expect(whiteSpace).toBe('nowrap');
      
      // CSS computed 스타일에서 overflow 확인
      const overflow = await titleElement.evaluate((el) => {
        return window.getComputedStyle(el).overflow;
      });
      expect(overflow).toBe('hidden');
    });
  });

  test.describe('실패 시나리오 - 데이터가 없는 경우', () => {
    test('로컬스토리지가 비어있을 때 빈 목록이 표시되는지 확인', async ({ page }) => {
      // 로컬스토리지 초기화
      await page.goto('/diaries');
      await page.evaluate(() => {
        localStorage.clear();
      });

      // 페이지 새로고침
      await page.reload();

      // 페이지 로드 식별
      await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible' });
      
      // 일기 카드 로드를 위해 잠시 대기
      await page.waitForTimeout(500);

      // 빈 목록 (일기 카드가 없어야 함)
      const diaryCards = await page.locator('[data-testid^="diary-card-"]').count();
      expect(diaryCards).toBe(0);
    });
  });

  test.describe('실제 데이터 바인딩 - 정렬 확인', () => {
    test('일기 목록이 작성일 기준 최신순으로 정렬되는지 확인', async ({ page }) => {
      // 과거부터 미래 순서로 일기 데이터 준비
      const testDiaries = [
        {
          id: 1,
          title: '가장 오래된 일기',
          content: '내용1',
          emotion: EmotionType.Happy,
          createdAt: new Date('2024-01-15T10:30:00.000Z').toISOString()
        },
        {
          id: 2,
          title: '가장 최신 일기',
          content: '내용2',
          emotion: EmotionType.Sad,
          createdAt: new Date('2024-01-20T10:30:00.000Z').toISOString()
        },
        {
          id: 3,
          title: '중간 일기',
          content: '내용3',
          emotion: EmotionType.Angry,
          createdAt: new Date('2024-01-17T10:30:00.000Z').toISOString()
        }
      ];

      // 로컬스토리지에 실제 데이터 설정
      await page.goto('/diaries');
      await page.evaluate((diaries) => {
        localStorage.setItem('diaries', JSON.stringify(diaries));
      }, testDiaries);
      
      // 페이지 새로고침
      await page.reload();
      
      // 페이지 로드 식별
      await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible' });
      
      // 일기 카드 로드를 위해 잠시 대기
      await page.waitForTimeout(500);

      // 첫 번째 카드가 가장 최신 일기인지 확인
      const firstCardTitle = await page.locator('[data-testid="diary-title"]').first().textContent();
      expect(firstCardTitle).toBe('가장 최신 일기');

      // 두 번째 카드가 중간 일기인지 확인
      const secondCardTitle = await page.locator('[data-testid="diary-title"]').nth(1).textContent();
      expect(secondCardTitle).toBe('중간 일기');

      // 세 번째 카드가 가장 오래된 일기인지 확인
      const thirdCardTitle = await page.locator('[data-testid="diary-title"]').nth(2).textContent();
      expect(thirdCardTitle).toBe('가장 오래된 일기');
    });
  });
});

