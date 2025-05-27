import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function BookDetail(){
  const token = useSelector(state => state.user.token);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

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
        )
        setBook(responseGetBook.data);
      } catch (err) {
        setApiError('書籍取得に失敗しました');
        console.log(err.responseGetBook.data);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <p>ローディング中...</p>;
  if (apiError) return <p className="text-red-600">{apiError}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">書籍詳細</h2>
      
      <h2 className="text-2xl font-bold mb-4 text-center">{book.title}</h2>
      <p><strong>URL:</strong> <a href={book.url} className="text-blue-600">{book.url}</a></p>
      <p><strong>詳細:</strong> {book.detail}</p>
      <p><strong>レビュー:</strong> {book.review}</p>
      <p className="text-sm text-gray-500 mt-2">投稿者：{book.reviewer}</p>
    </div>
  )
};

export default BookDetail;