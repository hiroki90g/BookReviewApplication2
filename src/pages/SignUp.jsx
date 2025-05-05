import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Compressor from 'compressorjs';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';

function SignUp() {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [icon, setIcon] = useState('');
    const [iconPreviewURL, setIconPreviewURL] = useState(null);
    const [apiError, setApiError] = useState('');
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

  const onSubmit = async ( data ) => {
    const {name, email, password} = data;
    try {
      const responseUser = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        { name, email, password },
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
    }
  }
  return (
    <div>
    <main className="signup">
        <h2>ユーザー新規登録</h2>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="name-label">
              名前
              <input 
                  type="text"
                  className="name-input"  
                  {...register('name', { required: '名前を入力してください' })}
              />
          </label>
          {errors.name && <p className="error-message">{errors.name.message}</p>}
          <br />
          <label className="email-label">
              メールアドレス
              <input 
                  type="email"
                  className="email-input"
                  {...register('email', {
                    required: 'メールアドレスを入力してください',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'メールアドレスの形式が不正です'
                    }
                  }
                  )}
              />
          </label>
          {errors.email && <p className="error-message">{errors.email.message}</p>}
          <br />
          <label className="password-label">
              パスワード
              <input 
                  type="password"
                  className="password-input"
                  {...register('password', {
                    required: 'パスワードを入力してください',
                    minLength: {
                      value: 8,
                      message: 'パスワードは8文字以上で入力してください'
                    },
                    maxLength: {
                      value: 20,
                      message: 'パスワードは20文字以内で入力してください'
                    }
                  }
                  )}
              />
          </label>
          {errors.password && <p className="error-message">{errors.password.message}</p>}
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