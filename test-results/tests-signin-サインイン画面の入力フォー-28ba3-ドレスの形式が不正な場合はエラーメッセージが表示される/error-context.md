# Test info

- Name: サインイン画面の入力フォーム検証 >> メールアドレスの形式が不正な場合はエラーメッセージが表示される
- Location: /Users/hayashihiroki/TechTrain/React-Kiso3/BookReviewApplication2/tests/signin.spec.ts:13:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)

Locator: locator('.error-message')
Expected string: "メールアドレスの形式が不正です"
Received: <element(s) not found>
Call log:
  - expect.toContainText with timeout 5000ms
  - waiting for locator('.error-message')

    at /Users/hayashihiroki/TechTrain/React-Kiso3/BookReviewApplication2/tests/signin.spec.ts:16:54
```

# Page snapshot

```yaml
- banner:
  - heading "書籍レビューアプリ" [level=1]:
    - link "書籍レビューアプリ":
      - /url: /
  - link "ログイン":
    - /url: /signin
- main:
  - heading "サインイン" [level=2]
  - text: メールアドレス
  - textbox "メールアドレス": email
  - text: パスワード
  - textbox "パスワード"
  - button "サインイン"
  - link "新規登録画面はこちら":
    - /url: /signup
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('サインイン画面の入力フォーム検証', () => {
   4 |     test.beforeEach(async ({ page }) => {
   5 |         await page.goto('/signin');
   6 |     });
   7 |
   8 |     test('メールアドレスが空白の場合エラーメッセージが表示される', async ({ page }) => {
   9 |         await page.click('.signin-button');
  10 |         await expect(page.locator('.error-message')).toContainText('メールアドレスを入力してください');
  11 |     }); 
  12 |
  13 |     test('メールアドレスの形式が不正な場合はエラーメッセージが表示される', async ({ page }) => {
  14 |         await page.fill('.email-input', 'email');
  15 |         await page.click('.signin-button');
> 16 |         await expect(page.locator('.error-message')).toContainText('メールアドレスの形式が不正です');
     |                                                      ^ Error: Timed out 5000ms waiting for expect(locator).toContainText(expected)
  17 |       });
  18 |     
  19 |     test('パスワード空白の場合エラーメッセージが表示される', async ({ page }) => {
  20 |         await page.fill('.email-input', 'test@test.com');
  21 |         await page.click('.signin-button');
  22 |         await expect(page.locator('.error-message')).toContainText('パスワードを入力してください');
  23 |     });
  24 |     
  25 |     test('メールアドレスとパスワードが正しい場合はエラーメッセージが表示されない', async ({ page }) => {
  26 |         await page.fill('.email-input', 'test@test.com');
  27 |         await page.fill('.password-input', 'test1234');
  28 |         await page.click('.signin-button');
  29 |         await expect(page.locator('.error-message')).toHaveCount(0);
  30 |     });
  31 |     
  32 | });
  33 |
```