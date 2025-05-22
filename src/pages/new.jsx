import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { nextPage, prevPage } from '../features/pagination/paginationSlice';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";


function NewBook() {
  const token = useSelector(state => state.user.token);
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [apiError, setApiError] = useState('');

  const onSubmit = async (data) => {
    console.log("test", data);
  };
	return (
		<div className="max-w-3xl mx-auto p-4">
      <main className="new-book">
          <h2 className="text-2xl font-bold mb-4 text-center">新規投稿</h2>
          <form className="new-book-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="title">
                タイトル
                <input 
                    type="string"
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
                    type="string"
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
                    type="string"
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
                    type="string"
                    className="review-input"
                    {...register('review', {
                      required: 'レビューを入力してください',
                    }
                    )}
                />
            </label>            
            {errors.review && <p className="error-message">{errors.review.message}</p>}                        
            <button type="submit" className="signin-button">サインイン</button>
          </form>
          {apiError && <p className="error-message">{apiError}</p>}
          <Link to="/">投稿一覧画面はこちら</Link>
      </main>
		</div>
	);
}

export default NewBook;