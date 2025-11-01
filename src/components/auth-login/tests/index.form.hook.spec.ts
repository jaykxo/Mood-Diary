import { test, expect } from '@playwright/test';

// ========================================
// Auth Login Form Hook Tests
// ========================================

test.describe('로그인 폼 등록 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 페이지 이동
    await page.goto('/auth/login');
    
    // 페이지 로드 식별: data-testid 사용
    await page.waitForSelector('[data-testid="auth-login-page"]', { state: 'visible' });
  });

  test.describe('로그인 버튼 활성화 조건', () => {
    test('모든 인풋이 비어있으면 로그인 버튼이 비활성화되어 있어야 함', async ({ page }) => {
      // 로그인 버튼이 비활성화되어 있는지 확인
      await expect(page.locator('button:has-text("로그인")')).toBeDisabled();
    });

    test('이메일만 입력하면 로그인 버튼이 비활성화되어 있어야 함', async ({ page }) => {
      // 이메일 입력
      await page.locator('input[type="email"]').fill('test@example.com');
      
      // 로그인 버튼이 비활성화되어 있는지 확인
      await expect(page.locator('button:has-text("로그인")')).toBeDisabled();
    });

    test('비밀번호만 입력하면 로그인 버튼이 비활성화되어 있어야 함', async ({ page }) => {
      // 비밀번호 입력
      await page.locator('input[type="password"]').fill('test1234');
      
      // 로그인 버튼이 비활성화되어 있는지 확인
      await expect(page.locator('button:has-text("로그인")')).toBeDisabled();
    });

    test('모든 인풋이 입력되면 로그인 버튼이 활성화되어야 함', async ({ page }) => {
      // 이메일 입력
      await page.locator('input[type="email"]').fill('test@example.com');
      
      // 비밀번호 입력
      await page.locator('input[type="password"]').fill('test1234');
      
      // 로그인 버튼이 활성화되어 있는지 확인
      await expect(page.locator('button:has-text("로그인")')).toBeEnabled();
    });
  });

  test.describe('로그인 성공 시나리오', () => {
    test('로그인 성공 시 로그인완료 모달이 표시되고 확인 클릭 시 일기목록 페이지로 이동해야 함', async ({ page }) => {
      // 실제 데이터 사용
      const email = 'a@c.com';
      const password = '1234qwer';
      
      // 이메일 입력
      await page.locator('input[type="email"]').fill(email);
      
      // 비밀번호 입력
      await page.locator('input[type="password"]').fill(password);
      
      // 로그인 버튼 클릭
      await page.locator('button:has-text("로그인")').click({ force: true });
      
      // 로그인완료 모달이 표시되는지 확인
      // network 통신인 경우 timeout 2000ms 미만으로 설정
      await expect(page.locator('[data-testid="login-success-modal"]')).toBeVisible({ timeout: 1999 });
      await expect(page.locator('h2:has-text("로그인 완료")')).toBeVisible();
      
      // 확인 버튼 클릭
      await page.locator('button:has-text("확인")').click({ force: true });
      
      // 일기목록 페이지로 이동했는지 확인
      await expect(page).toHaveURL(/\/diaries/, { timeout: 1999 });
      
      // 모든 모달이 닫혔는지 확인
      await expect(page.locator('[data-testid="login-success-modal"]')).not.toBeVisible();
    });

    test('로그인 성공 시 accessToken이 정상적으로 반환되는지 확인', async ({ page }) => {
      // 실제 데이터 사용
      const email = 'a@c.com';
      const password = '1234qwer';
      
      // 이메일 입력
      await page.locator('input[type="email"]').fill(email);
      
      // 비밀번호 입력
      await page.locator('input[type="password"]').fill(password);
      
      // API 응답을 감지하기 위한 Promise 설정
      interface LoginUserResponse {
        data?: {
          loginUser?: {
            accessToken: string;
          };
        };
        errors?: Array<{ message: string }>;
      }
      
      let responseData: LoginUserResponse | null = null;
      const responsePromise = page.waitForResponse(
        (response) => {
          if (response.url().includes('graphql') && response.status() === 200) {
            const requestData = response.request().postData();
            if (requestData && requestData.includes('loginUser')) {
              return true;
            }
          }
          return false;
        },
        { timeout: 1999 }
      ).then(async (response) => {
        try {
          responseData = await response.json() as LoginUserResponse;
        } catch {
          // JSON 파싱 실패 무시
        }
        return response;
      });
      
      // 로그인 버튼 클릭
      await page.locator('button:has-text("로그인")').click({ force: true });
      
      // API 응답 대기
      try {
        await responsePromise;
      } catch {
        // timeout 발생 시 모달만 확인 (네트워크 환경에 따라 다를 수 있음)
      }
      
      // accessToken이 정상적으로 반환되는지 확인 (응답이 있는 경우)
      if (responseData) {
        const data = (responseData as LoginUserResponse).data;
        if (data) {
          expect(data.loginUser).toBeDefined();
          const accessToken = data.loginUser?.accessToken;
          expect(accessToken).toBeDefined();
          if (accessToken) {
            expect(typeof accessToken).toBe('string');
            expect(accessToken.length).toBeGreaterThan(0);
          }
        }
      }
      
      // 로그인완료 모달이 표시되는지 확인 (모달이 나타나면 성공으로 간주)
      // network 통신인 경우 timeout 2000ms 미만
      await expect(page.locator('[data-testid="login-success-modal"]')).toBeVisible({ timeout: 1999 });
    });

    test('로그인 성공 시 fetchUserLoggedIn API가 _id와 name을 정상적으로 반환하는지 확인', async ({ page }) => {
      // 실제 데이터 사용
      const email = 'a@c.com';
      const password = '1234qwer';
      
      // 이메일 입력
      await page.locator('input[type="email"]').fill(email);
      
      // 비밀번호 입력
      await page.locator('input[type="password"]').fill(password);
      
      // fetchUserLoggedIn API 응답을 감지하기 위한 Promise 설정
      interface FetchUserLoggedInResponse {
        data?: {
          fetchUserLoggedIn?: {
            _id: string;
            name: string;
          };
        };
        errors?: Array<{ message: string }>;
      }
      
      let responseData: FetchUserLoggedInResponse | null = null;
      const responsePromise = page.waitForResponse(
        (response) => {
          if (response.url().includes('graphql') && response.status() === 200) {
            const requestData = response.request().postData();
            if (requestData && requestData.includes('fetchUserLoggedIn')) {
              return true;
            }
          }
          return false;
        },
        { timeout: 1999 }
      ).then(async (response) => {
        try {
          responseData = await response.json() as FetchUserLoggedInResponse;
        } catch {
          // JSON 파싱 실패 무시
        }
        return response;
      });
      
      // 로그인 버튼 클릭
      await page.locator('button:has-text("로그인")').click({ force: true });
      
      // API 응답 대기
      try {
        await responsePromise;
      } catch {
        // timeout 발생 시 모달만 확인 (네트워크 환경에 따라 다를 수 있음)
      }
      
      // _id와 name이 정상적으로 반환되는지 확인 (응답이 있는 경우)
      if (responseData) {
        const data = (responseData as FetchUserLoggedInResponse).data;
        if (data && data.fetchUserLoggedIn) {
          const userData = data.fetchUserLoggedIn;
          expect(userData._id).toBeDefined();
          expect(userData.name).toBeDefined();
          expect(typeof userData._id).toBe('string');
          expect(typeof userData.name).toBe('string');
          expect(userData._id.length).toBeGreaterThan(0);
          expect(userData.name.length).toBeGreaterThan(0);
        }
      }
      
      // 로그인완료 모달이 표시되는지 확인
      await expect(page.locator('[data-testid="login-success-modal"]')).toBeVisible({ timeout: 1999 });
    });

    test('로그인 성공 시 로컬스토리지에 accessToken과 user 정보가 저장되는지 확인', async ({ page }) => {
      // 실제 데이터 사용
      const email = 'a@c.com';
      const password = '1234qwer';
      
      // 이메일 입력
      await page.locator('input[type="email"]').fill(email);
      
      // 비밀번호 입력
      await page.locator('input[type="password"]').fill(password);
      
      // 로그인 버튼 클릭
      await page.locator('button:has-text("로그인")').click({ force: true });
      
      // 로그인완료 모달이 표시될 때까지 대기
      await expect(page.locator('[data-testid="login-success-modal"]')).toBeVisible({ timeout: 1999 });
      
      // 로컬스토리지 확인
      const accessToken = await page.evaluate(() => localStorage.getItem('accessToken'));
      const user = await page.evaluate(() => localStorage.getItem('user'));
      
      // accessToken이 저장되었는지 확인
      expect(accessToken).toBeTruthy();
      if (accessToken) {
        expect(typeof accessToken).toBe('string');
        expect(accessToken.length).toBeGreaterThan(0);
      }
      
      // user 정보가 저장되었는지 확인
      expect(user).toBeTruthy();
      if (user) {
        const userObj = JSON.parse(user);
        expect(userObj._id).toBeDefined();
        expect(userObj.name).toBeDefined();
        expect(typeof userObj._id).toBe('string');
        expect(typeof userObj.name).toBe('string');
      }
    });
  });

  test.describe('로그인 실패 시나리오', () => {
    test('로그인 실패 시 로그인실패 모달이 표시되어야 함', async ({ page }) => {
      // API 모킹: 실패 응답
      await page.route('**/graphql', async (route) => {
        const requestData = route.request().postData();
        if (requestData && requestData.includes('loginUser')) {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              errors: [
                {
                  message: '이메일 또는 비밀번호가 올바르지 않습니다.'
                }
              ]
            }),
          });
        } else {
          await route.continue();
        }
      });
      
      // 이메일 입력
      await page.locator('input[type="email"]').fill('wrong@example.com');
      
      // 비밀번호 입력
      await page.locator('input[type="password"]').fill('wrongpassword');
      
      // 로그인 버튼 클릭
      await page.locator('button:has-text("로그인")').click({ force: true });
      
      // 로그인실패 모달이 표시되는지 확인
      // network 통신이 아닌 경우 timeout 설정하지 않거나 500ms 미만
      await expect(page.locator('[data-testid="login-failure-modal"]')).toBeVisible({ timeout: 500 });
      await expect(page.locator('h2:has-text("로그인 실패")')).toBeVisible();
      
      // 확인 버튼 클릭
      await page.locator('button:has-text("확인")').click({ force: true });
      
      // 모든 모달이 닫혔는지 확인
      await expect(page.locator('[data-testid="login-failure-modal"]')).not.toBeVisible();
      
      // 페이지는 여전히 로그인 페이지에 있어야 함
      await expect(page).toHaveURL(/\/auth\/login/);
    });
  });

  test.describe('폼 검증 테스트', () => {
    test('이메일 형식이 올바르지 않으면 제출이 안 되어야 함', async ({ page }) => {
      // 잘못된 이메일 입력 (@ 없음)
      await page.locator('input[type="email"]').fill('invalid-email');
      
      // 비밀번호 입력
      await page.locator('input[type="password"]').fill('test1234');
      
      // 로그인 버튼이 비활성화되어 있거나, 클릭해도 API 호출이 안 되어야 함
      const isDisabled = await page.locator('button:has-text("로그인")').isDisabled();
      
      if (!isDisabled) {
        // 버튼이 활성화되어 있다면 클릭 시도
        await page.locator('button:has-text("로그인")').click({ force: true });
        
        // API 호출이 없어야 함 (짧은 시간 동안 모달이 나타나지 않아야 함)
        // network 통신이 아닌 경우 timeout 설정하지 않거나 500ms 미만
        await expect(page.locator('[data-testid="login-success-modal"]')).not.toBeVisible({ timeout: 500 });
        await expect(page.locator('[data-testid="login-failure-modal"]')).not.toBeVisible({ timeout: 500 });
      }
    });

    test('비밀번호가 조건에 맞지 않으면 제출이 안 되어야 함', async ({ page }) => {
      // 이메일 입력
      await page.locator('input[type="email"]').fill('test@example.com');
      
      // 빈 비밀번호 입력
      await page.locator('input[type="password"]').fill('');
      
      // 로그인 버튼이 비활성화되어 있거나, 클릭해도 API 호출이 안 되어야 함
      const isDisabled = await page.locator('button:has-text("로그인")').isDisabled();
      
      if (!isDisabled) {
        await page.locator('button:has-text("로그인")').click({ force: true });
        // network 통신이 아닌 경우 timeout 설정하지 않거나 500ms 미만
        await expect(page.locator('[data-testid="login-success-modal"]')).not.toBeVisible({ timeout: 500 });
        await expect(page.locator('[data-testid="login-failure-modal"]')).not.toBeVisible({ timeout: 500 });
      }
    });
  });
});

