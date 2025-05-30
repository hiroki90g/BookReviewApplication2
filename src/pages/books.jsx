import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './pagination'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

function Books() {
	const token = useSelector(state => state.user.token);
	const navigate = useNavigate();
  const [books, setBooks] = useState([]);
	const [apiError, setApiError] = useState('');
	const offset = useSelector((state) => state.pagination.offset);

	const fetchBooks = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/books?offset=${offset}`,
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
				}
			);
			
			setBooks(response.data.slice(0, 10));
		} catch (err) {
			console.error('APIリクエスト中にエラー: ', err);
			if (err.response) {
				console.error('APIエラー内容:', err.response.data);
				setApiError(`エラーが発生しました：${err.response.data.errMessageJP}（errCode: ${err.response.data.errCode}）`);
			} else {
				console.error('通信エラー:', err.message);
			}
		};
	};

	useEffect(() => {
		fetchBooks();
	 }, [offset]);

	 const handleSelectBook = async (selectBookId) => {
		try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logs`,
        { selectBookId },
        {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          },
        }
      )
			console.log('ログを送信しました');
    } catch (err){
      console.log('ログを送信できませんでした', err);
    }	finally {
			navigate(`/detail/${selectBookId}`);
		};
	 }

	 const handleDeleteBook = async (deleteBookId) => {
		const delete_confirm = window.confirm("削除しますか？");
		if (!delete_confirm) return;
	
		try {
			await axios.delete(
				`${import.meta.env.VITE_API_URL}/books/${deleteBookId}`,
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
				}
			);
			console.log('削除成功');
			await fetchBooks();
		} catch (err) {
			console.error('削除に失敗しました', err);
			alert('削除に失敗しました');
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">書籍レビュー一覧</h2>
			<Link to="/new">新規投稿はこちら</Link>
			{apiError && <p className="text-red-600">{apiError}</p>}
			<ul className="space-y-4">
				{books.map((book) => (
					<li key={book.id} className="border p-4 shadow hover:shadow-md transition">
						<h3 className="text-lg font-semibold text-blue-600">
							<span onClick={() => handleSelectBook(book.id)}>
								{book.title}
							</span>
						</h3>
						{book.isMine && (
							<p className="text-sm text-gray-500 mt-2">
								<Link to={`/edit/${book.id}`}>編集はこちら</Link>
							</p>
						)}
						{book.isMine && (
							<p className="text-sm text-gray-500 mt-2">
								 <button onClick={() => handleDeleteBook(book.id)} className="text-red-500 hover:underline">
      							削除はこちら
								</button>
							</p>
						)}
						<p className="text-sm text-gray-500 mt-2">投稿者：{book.reviewer}</p>
					</li>
				))}
			</ul>
			<Pagination />
		</div>
	);
}

export default Books;