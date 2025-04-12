import { useState } from "react";

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmailChange = (e) => {setEmail(e.target.value)}
    const handlePasswordChange = (e) => setPassword(e.target.value);
    return (
        <div>
            <main calssName="signin">
                <h2>サインイン</h2>
                <form className="signin-form">
                <label className="email-label">メールアドレス</label>
                <input 
                    type="email"
                    className="email-input"
                    required
                    onChange={handleEmailChange}
                />
                <br />
                <label className="password-label">パスワード</label>
                <input 
                    type="password"
                    className="password-input"
                    required
                    minlength="8"
                    onChange={handlePasswordChange}
                />
                < br />
                </form>
            </main>
            SignIn</div>
    );
};