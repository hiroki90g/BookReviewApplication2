import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuth } from '../features/user/userSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userName, iconUrl } = useSelector((state) => state.user);
  
  const handleLogout = () => {
    dispatch(removeAuth());
    navigate('/signin');
  };

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold text-blue-600">
      <Link to="/">書籍レビューアプリ</Link>
    </h1>
    
    {isAuthenticated ? (
        <div className="flex items-center gap-4">
        {iconUrl && (
          <img
            src={iconUrl}
            alt="ユーザーアイコン"
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
          <span>{userName}でログイン中</span>
          <Link to="/profile" className="text-blue-600 hover:underline">
          ユーザー情報更新
          </Link>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded">
            ログアウト
          </button>
        </div>
      ) : (
        <Link to="/signin" className="text-blue-600 hover:underline">
          ログイン
        </Link>
      )}
    </header>
  );
}

export default Header;
