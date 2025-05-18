import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { setAuth } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Profile() {
  const token = useSelector(state => state.user.token);
  const { register, handleSubmit, reset, formState: { errors }} = useForm({defaultValues: { name: '' }});  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  
  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      try {
        const responseGetUser = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const { name } = responseGetUser.data;
        reset({ name });
        setApiError('');
      } catch (err) {
        console.error('ユーザー情報取得APIエラー', err);
        setApiError('ユーザー情報の取得に失敗しました');
      }
    };
    fetchUser();
  }, [token, reset]);

  const onSubmit = async ( data ) => {
    console.log('更新データ:', data);
    try {
      const responsePutUser = await axios.put(
        `${import.meta.env.VITE_API_URL}/users`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('ユーザー情報更新結果:', responsePutUser.data);
      
      const responseGetUser = await axios.get(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }
      );
      
      console.log('ユーザー情報取得結果: ', responseGetUser.data);
      const userName = responseGetUser.data.name;
      dispatch(setAuth({ token, userName }));
      navigate('/');
      setApiError('');
    } catch (err) {
      console.error('ユーザー情報更新APIエラー', err);
      setApiError('ユーザー情報の更新に失敗しました');
    }
  };

  return (
    <div>
    <main className="update">
        <h2>ユーザー情報編集</h2>
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
          <button type="submit" className="update-button">更新する</button>
        </form>
        {apiError && <p className="error-message">{apiError}</p>}
    </main>
</div>
  );
}
  
export default Profile;