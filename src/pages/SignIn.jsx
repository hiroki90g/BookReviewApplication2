import { useEffect, useState } from "react";

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleEmailChange = (e) => {setEmail(e.target.value)}
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const onSignIn = (e) => {
        e.preventDefault(); 
        if(!email){
            setEmailError('メールアドレスを入力してください');
            return;
        }
        const eamilPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
        if(!eamilPattern.test(email)){
            setEmailError('メールアドレスの形式が不正です');
            return;
        }
        if(!password){
            setPasswordError('パスワードを入力してください');
            return;
        }   
    };

    useEffect(() => {
        console.log(emailError);
    }, [emailError]);

    useEffect(() => {
        console.log(passwordError);
    }, [passwordError]);

    return (
        <div>
            <main className="signin">
                <h2>サインイン</h2>
                <form className="signin-form">
                <label className="email-label">メールアドレス</label>
                <input 
                    type="email"
                    className="email-input"
                    required
                    onChange={handleEmailChange}
                />
                {emailError && <p className="error-message">{emailError}</p>}
                <br />
                <label className="password-label">パスワード</label>
                <input 
                    type="password"
                    className="password-input"
                    required
                    minLength="8"
                    onChange={handlePasswordChange}
                />
                {passwordError && <p className="error-message">{passwordError}</p>}
                < br />
                <button type="submit" className="signin-button" onClick={onSignIn}>サインイン</button>
                </form>
            </main>
        </div>
    );
};