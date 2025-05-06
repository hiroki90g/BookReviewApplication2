import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { login } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

function SignIn () {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [apiError, setApiError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async ( date ) => {
        const { email, password } = date;
    try {
        const responseUser = await axios.post(
            `${import.meta.env.VITE_API_URL}/signin`,
            {email, password},
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('ユーザー情報送信結果: ', responseUser.data);
          console.log('ユーザー情報送信結果、トークン: ', responseUser.data.token);  
          dispatch(login(responseUser.data));
          navigate('/');

          setApiError('');
        } catch(err){
            console.error('APIリクエスト中にエラー: ', err);
            if (err.response) {
                console.error('APIエラー内容:', err.response.data);
                setApiError(`エラーが発生しました：${err.response.data.ErrorMessageJP}（ErrorCode: ${err.response.data.ErrorCode}）`);
            } else {
                console.error('通信エラー:', err.message);
            };
        };
    };

    return (
        <div>
            <main className="signin">
                <h2>サインイン</h2>
                <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
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
                          }
                        }
                        )}
                    />
                </label>
                {errors.password && <p className="error-message">{errors.password.message}</p>}
                < br />
                <button type="submit" className="signin-button">サインイン</button>
                </form>
                {apiError && <p className="error-message">{apiError}</p>}
                <Link to="/signup">新規登録画面はこちら</Link>
            </main>
        </div>
    );
};

export default SignIn;