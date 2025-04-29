import React from 'react';
import { useEffect, useState } from 'react';

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [icon, setIcon] = useState('');
    const [iconPreview, setIconPreview] = useState(null);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState(null);
    const handleNameChange = (e) => {
      setName(e.target.value);
      if(nameError) setNameError('');
    }
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      if(emailError) setEmailError('');
    }
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      if(passwordError) setPasswordError('');
    }
    const handleIconChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setIcon(e.target.files[0]);

        const reader = new FileReader(); // FileReaderで画像読み込む準備
        reader.onloadend = () => {
          setIconPreview(reader.result); // 画像プレビューをセット
        };
        reader.readAsDataURL(file); // ファイルをデータURLとして読み込む
      }
    }

    const onSignUp = (e) => {
        e.preventDefault();
        if(!name){
            setNameError('名前を入力してください');
            return;
        }
        if(!email){
            setEmailError('メールアドレスを入力してください');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email)){
            setEmailError('メールアドレスの形式が不正です');
            return;
        }
        if(!password){
            setPasswordError('パスワードを入力してください');
            return;
        }
    }
    useEffect(() => {
      console.log(nameError);
    }, [nameError]);
    
    useEffect(() => {
        console.log(emailError);
    }, [emailError]);
    
    useEffect(() => {
        console.log(passwordError);
    }, [passwordError]);

    return (
      <div>
      <main className="signup">
          <h2>ユーザー新規登録</h2>
          <form className="signup-form">
            <label className="name-label">
                名前
                <input 
                    type="text"
                    className="name-input"  
                    value={name}                  
                    required
                    onChange={handleNameChange}
                />
            </label>
            {emailError && <p className="error-message">{nameError}</p>}
            <br />
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
            {emailError && <p className="error-message">{passwordError}</p>}
            <br />
            <label className='icon-label'>
              アイコン画像
              <input 
                type="file"
                accept='image/*'
                onChange={handleIconChange}
              />
              {icon && <p>ファイル名: {icon.name}</p>}
              {iconPreview && <img src={iconPreview} alt="アイコンプレビュー" style={{ width: 100, height: 100, objectFit: 'cover' }} />}
            </label>
            {passwordError && <p className="error-message">{passwordError}</p>}
            < br />
            <button type="submit" className="signup-button" onClick={onSignUp}>新規登録</button>
          </form>
      </main>
  </div>
    );
  }
  
  export default SignUp;