import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SignIn () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if(emailError) setEmailError(''); // 変更があったらエラークリア
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if(passwordError) setPasswordError(''); // 変更があったらエラークリア
    }
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

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        
        // if (icon) {
        //   formData.append('icon', icon);
        // }

        // try{
        //   const userData = {
        //     name: name,
        //     email: email,
        //     password: password,
        //   }

        //   const responseUser = await axios.post(
        //     `${import.meta.env.VITE_API_URL}/users`,
        //     userData,
        //     {
        //       headers: {
        //         'Content-Type': 'application/json', /////この辺りNA
        //       },
        //     }
        //   );
        //   console.log('ユーザー情報送信結果: ', responseUser.data);
        //   console.log('ユーザー情報送信結果、トークン: ', responseUser.data.token);  
        // } catch(err){

        // };
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
                <label className="email-label">
                    メールアドレス
                    <input 
                        type="email"
                        className="email-input"
                        value={email}
                        required
                        onChange={handleEmailChange}
                    />
                </label>
                {emailError && <p className="error-message">{emailError}</p>}
                <br />
                <label className="password-label">
                    パスワード
                    <input 
                        type="password"
                        className="password-input"
                        value={password}
                        required
                        minLength="8"
                        onChange={handlePasswordChange}
                    />
                </label>
                {passwordError && <p className="error-message">{passwordError}</p>}
                < br />
                <button type="submit" className="signin-button" onClick={onSignIn}>サインイン</button>
                </form>

                <Link to="/signup">新規登録画面はこちら</Link>
            </main>
        </div>
    );
};

export default SignIn;