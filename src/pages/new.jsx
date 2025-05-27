import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function NewBook() {
  const token = useSelector(state => state.user.token);
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  console.log(token);
  
  const onSubmit = async (data) => {
    const { title, url, detail, review } = data;
    
    try {
      const responsePostBook = await axios.post(
        `${import.meta.env.VITE_API_URL}/books`,
        { title, url, detail, review },
        {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          },
        }
      )
      alert('書籍レビューを投稿しました');
      navigate('/');
    } catch (err){
      console.log(err);
      alert('投稿に失敗しました');
    };
  };

	return (
		<div className="max-w-3xl mx-auto p-4">
      <main className="new-book">
          <h2 className="text-2xl font-bold mb-4 text-center">新規投稿</h2>
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
            {errors.review && <p className="error-message">{errors.review.message}</p>}                        
            <button type="submit" className="signin-button">投稿</button>
          </form>
          {apiError && <p className="error-message">{apiError}</p>}
          <Link to="/">投稿一覧画面はこちら</Link>
      </main>
		</div>
	);
}

export default NewBook;