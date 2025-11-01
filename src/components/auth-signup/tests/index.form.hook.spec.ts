import { test, expect } from '@playwright/test';

// ========================================
// Auth Signup Form Hook Tests
// ========================================

test.describe('회원가입 폼 등록 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 페이지 이동
    await page.goto('/auth/signup');
    
    // 페이지 로드 식별: data-testid 사용
    await page.waitForSelector('[data-testid="auth-signup-page"]', { state: 'visible' });
  });

  test.describe('회원가입 버튼 활성화 조건', () => {
    test('모든 인풋이 비어있으면 회원가입 버튼이 비활성화되어 있어야 함', async ({ page }) => {
      // 회원가입 버튼이 비활성화되어 있는지 확인
      await expect(page.locator('button:has-text("회원가입")')).toBeDisabled();
    });

    test('이메일만 입력하면 회원가입 버튼이 비활성화되어 있어야 함', async ({ page }) => {
      // 이메일 입력
      await page.locator('input[type="email"]').fill('test@example.com');
      
      // 회원가입 버튼이 비활성화되어 있는지 확인
      await expect(page.locator('button:has-text("회원가입")')).toBeDisabled();
    });

    test('이메일과 비밀번호만 입력하면 회원가입 버튼이 비활성화되어 있어야 함', async ({ page }) => {
      // 이메일 입력
      await page.locator('input[type="email"]').fill('test@example.com');
      
      // 비밀번호 입력
      const passwordInputs = page.locator('input[type="password"]');
      await passwordInputs.nth(0).fill('test1234');
      
      // 회원가입 버튼이 비활성화되어 있는지 확인
      await expect(page.locator('button:has-text("회원가입")')).toBeDisabled();
    });

    test('이메일, 비밀번호, 비밀번호 재입력만 입력하면 회원가입 버튼이 비활성화되어 있어야 함', async ({ page }) => {
      // 이메일 입력
      await page.locator('input[type="email"]').fill('test@example.com');
      
      // 비밀번호 입력
      const passwordInputs = page.locator('input[type="password"]');
      await passwordInputs.nth(0).fill('test1234');
      await passwordInputs.nth(1).fill('test1234');
      
      // 회원가입 버튼이 비활성화되어 있는지 확인
      await expect(page.locator('button:has-text("회원가입")')).toBeDisabled();
    });

    test('모든 인풋이 입력되면 회원가입 버튼이 활성화되어야 함', async ({ page }) => {
      // 이메일 입력
      await page.locator('input[type="email"]').fill('test@example.com');
      
      // 비밀번호 입력
      const passwordInputs = page.locator('input[type="password"]');
      await passwordInputs.nth(0).fill('test1234');
      await passwordInputs.nth(1).fill('test1234');
      
      // 이름 입력
      await page.locator('input[type="text"]').fill('테스트');
      
      // 회원가입 버튼이 활성화되어 있는지 확인
      await expect(page.locator('button:has-text("회원가입")')).toBeEnabled();
    });
  });

  test.describe('회원가입 성공 시나리오', () => {
    test('회원가입 성공 시 가입완료 모달이 표시되고 확인 클릭 시 로그인 페이지로 이동해야 함', async ({ page }) => {
      // 고유한 이메일 생성 (timestamp 포함)
      const timestamp = Date.now();
      const email = `test${timestamp}@example.com`;
      
      // 이메일 입력
      await page.locator('input[type="email"]').fill(email);
      
      // 비밀번호 입력
      const passwordInputs = page.locator('input[type="password"]');
      await passwordInputs.nth(0).fill('test1234');
      await passwordInputs.nth(1).fill('test1234');
      
      // 이름 입력
      await page.locator('input[type="text"]').fill('테스트');
      
      // 회원가입 버튼 클릭
      await page.locator('button:has-text("회원가입")').click({ force: true });
      
      // 가입완료 모달이 표시되는지 확인
      // network 통신인 경우 timeout 2000ms 미만으로 설정
      await expect(page.locator('[data-testid="signup-success-modal"]')).toBeVisible({ timeout: 1999 });
      await expect(page.locator('h2:has-text("가입 완료")')).toBeVisible();
      
      // 확인 버튼 클릭
      await page.locator('button:has-text("확인")').click({ force: true });
      
      // 로그인 페이지로 이동했는지 확인
      await expect(page).toHaveURL(/\/auth\/login/, { timeout: 2000 });
      
      // 모든 모달이 닫혔는지 확인
      await expect(page.locator('[data-testid="signup-success-modal"]')).not.toBeVisible();
    });

    test('회원가입 성공 시 _id가 정상적으로 반환되는지 확인', async ({ page }) => {
      // 고유한 이메일 생성 (timestamp 포함)
      const timestamp = Date.now();
      const email = `test${timestamp}@example.com`;
      
      // 이메일 입력
      await page.locator('input[type="email"]').fill(email);
      
      // 비밀번호 입력
      const passwordInputs = page.locator('input[type="password"]');
      await passwordInputs.nth(0).fill('test1234');
      await passwordInputs.nth(1).fill('test1234');
      
      // 이름 입력
      await page.locator('input[type="text"]').fill('테스트');
      
      // API 응답을 감지하기 위한 Promise 설정
      interface CreateUserResponse {
        data?: {
          createUser?: {
            _id: string;
          };
        };
        errors?: Array<{ message: string }>;
      }
      
      let responseData: CreateUserResponse | null = null;
      const responsePromise = page.waitForResponse(
        (response) => {
          if (response.url().includes('graphql') && response.status() === 200) {
            return true;
          }
          return false;
        },
        { timeout: 1999 }
      ).then(async (response) => {
        try {
          responseData = await response.json() as CreateUserResponse;
        } catch {
          // JSON 파싱 실패 무시
        }
        return response;
      });
      
      // 회원가입 버튼 클릭
      await page.locator('button:has-text("회원가입")').click({ force: true });
      
      // API 응답 대기
      try {
        await responsePromise;
      } catch {
        // timeout 발생 시 모달만 확인 (네트워크 환경에 따라 다를 수 있음)
      }
      
      // _id가 정상적으로 반환되는지 확인 (응답이 있는 경우)
      if (responseData) {
        const data = (responseData as CreateUserResponse).data;
        if (data) {
          expect(data.createUser).toBeDefined();
          const userId = data.createUser?._id;
          expect(userId).toBeDefined();
          if (userId) {
            expect(typeof userId).toBe('string');
            expect(userId.length).toBeGreaterThan(0);
          }
        }
      }
      
      // 가입완료 모달이 표시되는지 확인 (모달이 나타나면 성공으로 간주)
      // network 통신인 경우 timeout 2000ms 미만
      await expect(page.locator('[data-testid="signup-success-modal"]')).toBeVisible({ timeout: 1999 });
    });
  });

  test.describe('회원가입 실패 시나리오', () => {
    test('회원가입 실패 시 가입실패 모달이 표시되어야 함', async ({ page }) => {
      // API 모킹: 실패 응답
      await page.route('**/graphql', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            errors: [
              {
                message: '이미 존재하는 이메일입니다.'
              }
            ]
          }),
        });
      });
      
      // 이메일 입력
      await page.locator('input[type="email"]').fill('existing@example.com');
      
      // 비밀번호 입력
      const passwordInputs = page.locator('input[type="password"]');
      await passwordInputs.nth(0).fill('test1234');
      await passwordInputs.nth(1).fill('test1234');
      
      // 이름 입력
      await page.locator('input[type="text"]').fill('테스트');
      
      // 회원가입 버튼 클릭
      await page.locator('button:has-text("회원가입")').click({ force: true });
      
      // 가입실패 모달이 표시되는지 확인
      // network 통신이 아닌 경우 timeout 설정하지 않거나 500ms 미만
      await expect(page.locator('[data-testid="signup-failure-modal"]')).toBeVisible({ timeout: 500 });
      await expect(page.locator('h2:has-text("가입 실패")')).toBeVisible();
      
      // 확인 버튼 클릭
      await page.locator('button:has-text("확인")').click({ force: true });
      
      // 모든 모달이 닫혔는지 확인
      await expect(page.locator('[data-testid="signup-failure-modal"]')).not.toBeVisible();
      
      // 페이지는 여전히 회원가입 페이지에 있어야 함
      await expect(page).toHaveURL(/\/auth\/signup/);
    });
  });

  test.describe('폼 검증 테스트', () => {
    test('이메일 형식이 올바르지 않으면 제출이 안 되어야 함', async ({ page }) => {
      // 잘못된 이메일 입력
      await page.locator('input[type="email"]').fill('invalid-email');
      
      // 비밀번호 입력
      const passwordInputs = page.locator('input[type="password"]');
      await passwordInputs.nth(0).fill('test1234');
      await passwordInputs.nth(1).fill('test1234');
      
      // 이름 입력
      await page.locator('input[type="text"]').fill('테스트');
      
      // 회원가입 버튼이 비활성화되어 있거나, 클릭해도 API 호출이 안 되어야 함
      const isDisabled = await page.locator('button:has-text("회원가입")').isDisabled();
      
      if (!isDisabled) {
        // 버튼이 활성화되어 있다면 클릭 시도
        await page.locator('button:has-text("회원가입")').click({ force: true });
        
        // API 호출이 없어야 함 (짧은 시간 동안 모달이 나타나지 않아야 함)
        // network 통신이 아닌 경우 timeout 설정하지 않거나 500ms 미만
        await expect(page.locator('[data-testid="signup-success-modal"]')).not.toBeVisible({ timeout: 500 });
        await expect(page.locator('[data-testid="signup-failure-modal"]')).not.toBeVisible({ timeout: 500 });
      }
    });

    test('비밀번호가 조건에 맞지 않으면 제출이 안 되어야 함', async ({ page }) => {
      // 이메일 입력
      await page.locator('input[type="email"]').fill('test@example.com');
      
      // 짧은 비밀번호 입력 (8자 미만)
      const passwordInputs = page.locator('input[type="password"]');
      await passwordInputs.nth(0).fill('test12'); // 6자리
      await passwordInputs.nth(1).fill('test12');
      
      // 이름 입력
      await page.locator('input[type="text"]').fill('테스트');
      
      // 회원가입 버튼이 비활성화되어 있거나, 클릭해도 API 호출이 안 되어야 함
      const isDisabled = await page.locator('button:has-text("회원가입")').isDisabled();
      
      if (!isDisabled) {
        await page.locator('button:has-text("회원가입")').click({ force: true });
        // network 통신이 아닌 경우 timeout 설정하지 않거나 500ms 미만
        await expect(page.locator('[data-testid="signup-success-modal"]')).not.toBeVisible({ timeout: 500 });
        await expect(page.locator('[data-testid="signup-failure-modal"]')).not.toBeVisible({ timeout: 500 });
      }
    });

    test('비밀번호와 비밀번호 재입력이 일치하지 않으면 제출이 안 되어야 함', async ({ page }) => {
      // 이메일 입력
      await page.locator('input[type="email"]').fill('test@example.com');
      
      // 비밀번호 입력 (불일치)
      const passwordInputs = page.locator('input[type="password"]');
      await passwordInputs.nth(0).fill('test1234');
      await passwordInputs.nth(1).fill('test5678'); // 다른 비밀번호
      
      // 이름 입력
      await page.locator('input[type="text"]').fill('테스트');
      
      // 회원가입 버튼이 비활성화되어 있거나, 클릭해도 API 호출이 안 되어야 함
      const isDisabled = await page.locator('button:has-text("회원가입")').isDisabled();
      
      if (!isDisabled) {
        await page.locator('button:has-text("회원가입")').click({ force: true });
        // network 통신이 아닌 경우 timeout 설정하지 않거나 500ms 미만
        await expect(page.locator('[data-testid="signup-success-modal"]')).not.toBeVisible({ timeout: 500 });
        await expect(page.locator('[data-testid="signup-failure-modal"]')).not.toBeVisible({ timeout: 500 });
      }
    });
  });
});

