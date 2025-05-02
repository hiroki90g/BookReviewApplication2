import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Compressor from 'compressorjs';
import { Link } from 'react-router-dom'

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [icon, setIcon] = useState('');
    const [iconPreviewURL, setIconPreviewURL] = useState(null);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [apiError, setApiError] = useState('');
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

        new Compressor(file, {
          quality: 0.6,
          maxWidth: 800,
          maxHeight: 800,
          success(result) {
            setIcon(result);

            const previewURL = URL.createObjectURL(result);
            setIconPreviewURL(previewURL);
          },
          error(err) {
            console.error('アイコン画像リサイズ中にエラーが発生しました: ', err);
          }
        })
      }
    }

    const onSignUp = async (e) => {
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

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if (icon) {
          formData.append('icon', icon);
        }

        try{
          const userData = {
            name: name,
            email: email,
            password: password,
          }

          const responseUser = await axios.post(
            `${import.meta.env.VITE_API_URL}/users`,
            userData,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('ユーザー情報送信結果: ', responseUser.data);
          console.log('ユーザー情報送信結果、トークン: ', responseUser.data.token);  
          const token = responseUser.data.token;
          if (icon) {
            const formData = new FormData();
            formData.append('icon', icon);
    
            const responseIcon = await axios.post(
              `${import.meta.env.VITE_API_URL}/uploads`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`
                },
              }
            );
            console.log('アイコン送信結果: ', responseIcon.data);
          }
        } catch (err) {  
          console.error('APIリクエスト中にエラー: ', err);
          if (err.response) {
            console.error('APIエラー内容:', err.response.data);
            setApiError(`エラーが発生しました：${err.response.data}`);
          } else {
            console.error('通信エラー:', err.message);
          };
          // if (err.response?.status === 400)  {
          //   setApiError('バリデーションエラー');
          // }
          // if (err.response?.status === 403)  {
          //   setApiError('認証エラー');
          // }
          // if (err.response?.status === 409) {
          //   setApiError('このメールアドレスは既に使われています。');
          // } 
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
          <form className="signup-form" onSubmit={onSignUp}>
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
            {nameError && <p className="error-message">{nameError}</p>}
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
            {passwordError && <p className="error-message">{passwordError}</p>}
            <br />
            <label className='icon-label'>
              アイコン画像
              <input 
                type="file"
                accept='image/*'
                onChange={handleIconChange}
              />
              {icon && <p>ファイル名: {icon.name}</p>}
              {iconPreviewURL && <img src={iconPreviewURL} alt="アイコンプレビュー" style={{ width: 100, height: 100, objectFit: 'cover' }}  />}
            </label>
            < br />
            <button type="submit" className="signup-button">新規登録</button>
          </form>
          {apiError && <p className="error-message">{apiError}</p>}
          <br />
          <div>
            <Link to="/signin">ログイン画面はこちら</Link>
          </div>
          
      </main>
  </div>
    );
  }
  
  export default SignUp;