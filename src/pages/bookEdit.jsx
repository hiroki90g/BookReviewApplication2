import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

function BookEdit(){
  const token = useSelector(state => state.user.token);
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  useEffect( () => {
    const fetchBook = async () => {
      console.log(id);
      console.log(token);
      try {        
        const responseGetBook = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/${id}`,
          {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
          }
        );

        reset({
          title: responseGetBook.data.title,
          url: responseGetBook.data.url,
          detail: responseGetBook.data.detail,
          review: responseGetBook.data.review,
        });

      } catch (err) {
        setApiError('書籍取得に失敗しました');
        console.log(err.response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/books/${id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('更新しました');
      navigate(`/detail/${id}`);
    } catch (err) {
      console.error(err);
      setApiError('更新に失敗しました');
    }
  };
  if (loading) return <p>ローディング中...</p>;
  if (apiError) return <p className="text-red-600">{apiError}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">書籍更新</h2>
      
      <form className="new-book-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="title">
            タイトル
            <input 
                type="text"
                className="title-input"
                {...register('title', {
                  required: 'タイトルを入力してください',
                }
                )}
            />
        </label>
        {errors.title && <p className="error-message">{errors.title.message}</p>}
        <br />
        <label className="url">
            URL
            <input 
                type="text"
                className="url-input"
                {...register('url', {
                  required: 'URLを入力してください',
                }
                )}
            />
        </label>            
        {errors.url && <p className="error-message">{errors.url.message}</p>}
        <br />
        <label className="detail">
            書籍詳細
            <input 
                type="text"
                className="detail-input"
                {...register('detail', {
                  required: '書籍詳細を入力してください',
                }
                )}
            />
        </label>            
        {errors.detail && <p className="error-message">{errors.detail.message}</p>}            
        <br />
        <label className="review">
            レビュー
            <input 
                type="text"
                className="review-input"
                {...register('review', {
                  required: 'レビューを入力してください',
                }
                )}
            />
        </label>            
        <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
        <button type="submit" className="signin-button">更新する</button>
          </form>    </div>
  )
};

export default BookEdit;