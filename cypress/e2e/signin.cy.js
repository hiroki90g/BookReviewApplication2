describe('サインインページ', () => {
    it('ページが表示される', () => {
        cy.visit('/signin');
        cy.contains('サインイン');
    });
    it('メールアドレスが空の場合エラーが表示される', () => {
        cy.visit('/signin');
        cy.get('.signin-button').click();
        cy.contains('メールアドレスを入力してください').should('be.visible');
    });
    
    it('メールアドレスの形式が不正な場合エラーが表示される', () => {
        cy.visit('/signin');
        cy.get('.email-input').type('test');
        cy.get('.signin-button').click();
        cy.contains('メールアドレスの形式が不正です').should('be.visible');
    });
    
    it('パスワードが空白の場合エラーが表示される', () => {
        cy.visit('/signin');
        cy.get('.email-input').type('test@test.com');
        cy.get('.password-input').clear();
        cy.get('.signin-button').click();
        cy.contains('パスワードを入力してください').should('be.visible');
    });

    it('メールアドレスとパスワードが適切に入力されている場合、エラーを表示しない', () => {
        cy.visit('/signin');
        cy.get('.email-input').type('test@test.com');
        cy.get('.password-input').type('password1234');
        cy.get('.signin-button').click();
        cy.contains('メールアドレスを入力してください').should('not.exist');
        cy.contains('メールアドレスの形式が不正です').should('not.exist');
        cy.contains('パスワードを入力してください').should('not.exist');
    });
  });
  