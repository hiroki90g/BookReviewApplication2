import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Books() {
  const [books, setBooks] = useState([]);
	const [apiError, setApiError] = useState('');
	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/public/books?offset=0`,
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);
				
				setBooks(response.data.slice(0.10));
				console.log('fetchBooks', books);
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

		fetchBooks();
	 },[]);

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">書籍レビュー一覧</h2>
			{apiError && <p className="text-red-600">{apiError}</p>}
			<ul className="space-y-4">
				{books.map((book) => (
					<li key={book.id} className="border p-4 shadow hover:shadow-md transition">
						<h3 className="text-lg font-semibold text-blue-600"> {book.title}</h3>
						<p className="text-sm text-gray-500 mt-2">投稿者：{book.reviewer}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Books;