/**
 * @jest-environment jsdom
 */
import React from 'react';
import { getByLabelText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { SignIn } from '../pages/SignIn'; 

describe('サインインフォームのコンポーネント', () => {
    it('メールアドレスの入力フォームがある', () => {
        render(<SignIn />);
        const emailInput = screen.getByLabelText('メールアドレス');
        expect(emailInput).toBeInTheDocument();
    });
});