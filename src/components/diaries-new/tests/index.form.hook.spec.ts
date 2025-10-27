import { test, expect } from '@playwright/test';

// ========================================
// Diaries New Form Hook Tests
// ========================================

test.describe('일기쓰기 폼 등록 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    // 페이지 로드 식별: data-testid 사용
    await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible' });
    
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.locator('[data-testid="diary-write-button"]').click({ force: true });
    
    // 일기쓰기 모달이 열렸는지 확인 (충분한 대기 시간 제공)
    await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible({ timeout: 10000 });
  });

  test.describe('등록하기 버튼 활성화 조건', () => {
    test('모든 인풋이 비어있으면 등록하기 버튼이 비활성화되어 있어야 함', async ({ page }) => {
      // 등록하기 버튼이 비활성화되어 있는지 확인
      await expect(page.locator('button:has-text("등록하기")')).toBeDisabled();
    });

    test('제목만 입력하면 등록하기 버튼이 비활성화되어 있어야 함', async ({ page }) => {
      // 제목 입력
      await page.locator('input[placeholder="제목을 입력합니다."]').fill('테스트 제목');
      
      // 등록하기 버튼이 비활성화되어 있는지 확인
      await expect(page.locator('button:has-text("등록하기")')).toBeDisabled();
    });

    test('내용만 입력하면 등록하기 버튼이 비활성화되어 있어야 함', async ({ page }) => {
      // 내용 입력
      await page.locator('textarea[placeholder="내용을 입력합니다."]').fill('테스트 내용');
      
      // 등록하기 버튼이 비활성화되어 있는지 확인
      await expect(page.locator('button:has-text("등록하기")')).toBeDisabled();
    });

    test('제목과 내용이 모두 입력되면 등록하기 버튼이 활성화되어야 함', async ({ page }) => {
      // 제목 입력
      await page.locator('input[placeholder="제목을 입력합니다."]').fill('테스트 제목');
      
      // 내용 입력
      await page.locator('textarea[placeholder="내용을 입력합니다."]').fill('테스트 내용');
      
      // 등록하기 버튼이 활성화되어 있는지 확인
      await expect(page.locator('button:has-text("등록하기")')).toBeEnabled();
    });
  });

  test.describe('일기 등록 - 빈 로컬스토리지', () => {
    test('로컬스토리지가 비어있을 때 일기 등록 후 로컬스토리지에 저장되는지 확인', async ({ page }) => {
      // 제목 입력
      await page.locator('input[placeholder="제목을 입력합니다."]').fill('테스트 제목');
      
      // 내용 입력
      await page.locator('textarea[placeholder="내용을 입력합니다."]').fill('테스트 내용');
      
      // 등록하기 버튼 클릭
      await page.locator('button:has-text("등록하기")').click();
      
      // 등록 완료 모달이 표시되는지 확인
      await expect(page.locator('h2:has-text("등록 완료")')).toBeVisible();
      
      // 로컬스토리지에 데이터가 저장되었는지 확인
      const storedData = await page.evaluate(() => {
        const data = localStorage.getItem('diaries');
        return data ? JSON.parse(data) : null;
      });
      
      expect(storedData).toBeTruthy();
      expect(Array.isArray(storedData)).toBe(true);
      expect(storedData.length).toBe(1);
      expect(storedData[0].id).toBe(1);
      expect(storedData[0].title).toBe('테스트 제목');
      expect(storedData[0].content).toBe('테스트 내용');
      expect(storedData[0].emotion).toBe('Happy');
      expect(storedData[0].createdAt).toBeTruthy();
    });

    test('등록 완료 모달 확인 버튼 클릭 시 상세페이지로 이동하는지 확인', async ({ page }) => {
      // 제목과 내용 입력
      await page.locator('input[placeholder="제목을 입력합니다."]').fill('테스트 제목');
      await page.locator('textarea[placeholder="내용을 입력합니다."]').fill('테스트 내용');
      
      // 등록하기 버튼 클릭
      await page.locator('button:has-text("등록하기")').click();
      
      // 등록 완료 모달 확인
      await expect(page.locator('h2:has-text("등록 완료")')).toBeVisible();
      
      // 확인 버튼 클릭
      await page.locator('button:has-text("확인")').click();
      
      // 상세페이지로 이동했는지 확인 (URL이 /diaries/1로 변경되어야 함)
      await expect(page).toHaveURL(/\/diaries\/1$/);
      
      // 모든 모달이 닫혔는지 확인
      await expect(page.locator('[data-testid="diary-write-modal"]')).not.toBeVisible();
    });
  });

  test.describe('일기 등록 - 기존 데이터가 있는 경우', () => {
    test.beforeEach(async ({ page }) => {
      // 기존 데이터가 있는 로컬스토리지 설정
      await page.evaluate(() => {
        localStorage.setItem('diaries', JSON.stringify([
          {
            id: 5,
            title: '기존 제목',
            content: '기존 내용',
            emotion: 'Sad',
            createdAt: '2024-01-01T00:00:00.000Z'
          }
        ]));
      });
      
      // 페이지 새로고침하여 업데이트된 로컬스토리지 적용
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-page"]', { state: 'visible' });
      
      // 일기쓰기 버튼 다시 클릭
      await page.locator('[data-testid="diary-write-button"]').click({ force: true });
      await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible({ timeout: 10000 });
    });

    test('기존 데이터가 있을 때 새 일기를 등록하면 id가 가장 큰 id+1로 설정되어야 함', async ({ page }) => {
      // 제목과 내용 입력
      await page.locator('input[placeholder="제목을 입력합니다."]').fill('새로운 제목');
      await page.locator('textarea[placeholder="내용을 입력합니다."]').fill('새로운 내용');
      
      // 등록하기 버튼 클릭
      await page.locator('button:has-text("등록하기")').click();
      
      // 등록 완료 모달 확인
      await expect(page.locator('h2:has-text("등록 완료")')).toBeVisible();
      
      // 로컬스토리지에 데이터가 추가되었는지 확인
      const storedData = await page.evaluate(() => {
        const data = localStorage.getItem('diaries');
        return data ? JSON.parse(data) : null;
      });
      
      expect(storedData).toBeTruthy();
      expect(storedData.length).toBe(2);
      
      // 기존 데이터 확인
      expect(storedData[0].id).toBe(5);
      
      // 새로운 데이터 확인
      expect(storedData[1].id).toBe(6); // 기존 id 5 + 1
      expect(storedData[1].title).toBe('새로운 제목');
      expect(storedData[1].content).toBe('새로운 내용');
    });

    test('기존 데이터에 일기 추가 후 상세페이지로 이동할 때 올바른 id로 이동하는지 확인', async ({ page }) => {
      // 제목과 내용 입력
      await page.locator('input[placeholder="제목을 입력합니다."]').fill('새로운 제목');
      await page.locator('textarea[placeholder="내용을 입력합니다."]').fill('새로운 내용');
      
      // 등록하기 버튼 클릭
      await page.locator('button:has-text("등록하기")').click();
      
      // 등록 완료 모달 확인
      await expect(page.locator('h2:has-text("등록 완료")')).toBeVisible();
      
      // 확인 버튼 클릭
      await page.locator('button:has-text("확인")').click();
      
      // 상세페이지로 이동했는지 확인 (새로운 id로)
      await expect(page).toHaveURL(/\/diaries\/6$/);
    });
  });
});

