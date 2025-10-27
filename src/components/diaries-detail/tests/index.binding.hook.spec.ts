import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// ========================================
// Diary Binding Hook Tests
// ========================================

test.describe('일기 상세 데이터 바인딩 기능', () => {
  test.describe('성공 시나리오 - 일기 데이터 표시', () => {
    test('로컬스토리지에서 일기 데이터를 가져와 표시하는지 확인', async ({ page }) => {
      // 먼저 페이지로 이동한 후 로컬스토리지 설정
      await page.goto('/diaries/1');
      
      // 테스트 데이터 준비
      const testDiary = {
        id: 1,
        title: '테스트 제목입니다.',
        content: '테스트 내용입니다. 이 내용은 일기 상세 페이지에 표시되어야 합니다.',
        emotion: EmotionType.Happy,
        createdAt: new Date('2024-01-15T10:30:00.000Z').toISOString()
      };

      // 페이지가 로드된 후 로컬스토리지에 테스트 데이터 설정
      await page.evaluate((diary) => {
        localStorage.setItem('diaries', JSON.stringify([diary]));
      }, testDiary);

      // 페이지 새로고침하여 로컬스토리지 데이터 적용
      await page.reload();

      // 페이지 로드 식별: data-testid 대기 방법
      await page.waitForSelector('[data-testid="diary-detail-page"]', { state: 'visible' });

      // 제목이 표시되는지 확인
      await expect(page.locator('[data-testid="diary-title"]')).toContainText(testDiary.title);

      // 감정 아이콘이 표시되는지 확인
      await expect(page.locator('[data-testid="emotion-icon"]')).toBeVisible();

      // 감정 텍스트가 표시되는지 확인
      const emotionLabel = await page.locator('[data-testid="emotion-label"]').textContent();
      expect(emotionLabel).toBe('행복해요'); // Happy 감정의 레이블

      // 내용이 표시되는지 확인
      await expect(page.locator('[data-testid="diary-content"]')).toContainText(testDiary.content);

      // 작성일이 표시되는지 확인
      await expect(page.locator('[data-testid="created-date"]')).toBeVisible();
    });

    test('다양한 감정 타입의 일기 데이터가 올바르게 표시되는지 확인', async ({ page }) => {
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

      // 각 감정 타입별로 테스트
      for (const diary of testDiaries) {
        await page.goto(`/diaries/${diary.id}`);
        
        // 페이지가 로드된 후 로컬스토리지에 설정
        await page.evaluate((diaries) => {
          localStorage.setItem('diaries', JSON.stringify(diaries));
        }, testDiaries);
        
        // 페이지 새로고침
        await page.reload();
        
        // 페이지 로드 식별
        await page.waitForSelector('[data-testid="diary-detail-page"]', { state: 'visible' });

        // 제목 확인
        await expect(page.locator('[data-testid="diary-title"]')).toContainText(diary.title);

        // 감정 텍스트 확인
        const emotionLabel = await page.locator('[data-testid="emotion-label"]').textContent();
        const expectedLabels: Record<EmotionType, string> = {
          [EmotionType.Happy]: '행복해요',
          [EmotionType.Sad]: '슬퍼요',
          [EmotionType.Angry]: '화나요',
          [EmotionType.Surprise]: '놀랐어요',
          [EmotionType.Etc]: '기타'
        };
        expect(emotionLabel).toBe(expectedLabels[diary.emotion]);

        // 내용 확인
        await expect(page.locator('[data-testid="diary-content"]')).toContainText(diary.content);
      }
    });
  });

  test.describe('실패 시나리오 - 일기를 찾을 수 없는 경우', () => {
    test('로컬스토리지가 비어있을 때 에러 메시지가 표시되는지 확인', async ({ page }) => {
      // 먼저 페이지로 이동
      await page.goto('/diaries/1');
      
      // 로컬스토리지 초기화
      await page.evaluate(() => {
        localStorage.clear();
      });

      // 페이지 새로고침
      await page.reload();

      // 에러 메시지가 표시되는지 확인
      await expect(page.locator('[data-testid="diary-error"]')).toBeVisible();
      await expect(page.locator('text=일기를 찾을 수 없습니다.')).toBeVisible();
    });

    test('존재하지 않는 id로 접근할 때 에러 메시지가 표시되는지 확인', async ({ page }) => {
      // 테스트 데이터 준비 (id: 1, 2만 존재)
      const testDiaries = [
        {
          id: 1,
          title: '첫 번째 일기',
          content: '내용',
          emotion: EmotionType.Happy,
          createdAt: new Date('2024-01-15T10:30:00.000Z').toISOString()
        },
        {
          id: 2,
          title: '두 번째 일기',
          content: '내용',
          emotion: EmotionType.Sad,
          createdAt: new Date('2024-01-16T10:30:00.000Z').toISOString()
        }
      ];

      // 존재하지 않는 id로 접근
      await page.goto('/diaries/999');
      
      // 페이지가 로드된 후 로컬스토리지에 설정
      await page.evaluate((diaries) => {
        localStorage.setItem('diaries', JSON.stringify(diaries));
      }, testDiaries);
      
      // 페이지 새로고침
      await page.reload();

      // 에러 메시지가 표시되는지 확인
      await expect(page.locator('[data-testid="diary-error"]')).toBeVisible();
      await expect(page.locator('text=일기를 찾을 수 없습니다.')).toBeVisible();
    });
  });

  test.describe('실제 데이터 바인딩 - 다중 일기 시나리오', () => {
    test('여러 일기 중 특정 id의 일기만 올바르게 표시되는지 확인', async ({ page }) => {
      // 여러 일기 데이터 준비
      const testDiaries = [
        {
          id: 10,
          title: '10번 일기',
          content: '10번 일기의 내용입니다.',
          emotion: EmotionType.Happy,
          createdAt: new Date('2024-01-15T10:30:00.000Z').toISOString()
        },
        {
          id: 20,
          title: '20번 일기',
          content: '20번 일기의 내용입니다.',
          emotion: EmotionType.Sad,
          createdAt: new Date('2024-01-16T10:30:00.000Z').toISOString()
        },
        {
          id: 30,
          title: '30번 일기',
          content: '30번 일기의 내용입니다.',
          emotion: EmotionType.Angry,
          createdAt: new Date('2024-01-17T10:30:00.000Z').toISOString()
        }
      ];

      // 20번 일기로 이동
      await page.goto('/diaries/20');
      
      // 페이지가 로드된 후 로컬스토리지에 설정
      await page.evaluate((diaries) => {
        localStorage.setItem('diaries', JSON.stringify(diaries));
      }, testDiaries);
      
      // 페이지 새로고침
      await page.reload();
      
      // 페이지 로드 식별
      await page.waitForSelector('[data-testid="diary-detail-page"]', { state: 'visible' });

      // 20번 일기 데이터만 표시되는지 확인
      await expect(page.locator('[data-testid="diary-title"]')).toContainText('20번 일기');
      await expect(page.locator('[data-testid="diary-content"]')).toContainText('20번 일기의 내용입니다.');
      
      // 감정이 올바르게 표시되는지 확인 (Sad)
      const emotionLabel = await page.locator('[data-testid="emotion-label"]').textContent();
      expect(emotionLabel).toBe('슬퍼요');
    });
  });
});
