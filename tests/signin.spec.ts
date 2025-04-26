import { test, expect } from '@playwright/test';

test.describe('サインイン画面の入力フォーム検証', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/signin');
    });

    test('メールアドレスが空白の場合エラーメッセージが表示される', async ({ page }) => {
        await page.click('.signin-button');
        await expect(page.locator('.error-message')).toContainText('メールアドレスを入力してください');
    }); 

    test('メールアドレスの形式が不正な場合はエラーメッセージが表示される', async ({ page }) => {
        await page.fill('.email-input', 'email');
        await page.click('.signin-button');
        await expect(page.locator('.error-message')).toContainText('メールアドレスの形式が不正です');
      });
    
    test('パスワード空白の場合エラーメッセージが表示される', async ({ page }) => {
        await page.fill('.email-input', 'test@test.com');
        await page.click('.signin-button');
        await expect(page.locator('.error-message')).toContainText('パスワードを入力してください');
    });
    
    test('メールアドレスとパスワードが正しい場合はエラーメッセージが表示されない', async ({ page }) => {
        await page.fill('.email-input', 'test@test.com');
        await page.fill('.password-input', 'test1234');
        await page.click('.signin-button');
        await expect(page.locator('.error-message')).toHaveCount(0);
    });
    
});
