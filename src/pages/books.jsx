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
				
				setBooks(response.data);
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
		<main>
			<h2>書籍レビュー一覧</h2>
			<ul>
				{books.map((book) => (
					<li key={book.id} className='book'>
						<h3 className='book-title'> {book.title}</h3>
						<p>{book.reviewer}</p>
					</li>
				))}
			</ul>
		</main>
	);
}

export default Books;