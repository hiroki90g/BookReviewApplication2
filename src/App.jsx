import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Books from './pages/books';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { checkAuth } from './features/user/userSlice';
import Header from './pages/Header';
import { Suspense, lazy } from 'react';

const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const Profile = lazy(() => import('./pages/profile'));
const NewBook = lazy(() => import('./pages/new'));
const BookDetail = lazy(() => import('./pages/bookDetail'));
const EditBook = lazy(() => import('./pages/bookEdit'));

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await dispatch(checkAuth());
      setAuthChecked(true); 
    };
    initAuth();
  }, [dispatch]);

  if (!authChecked) {
    return <div>認証情報を確認中...</div>;
  }

  return (
    <Router>
      <Header />
      <Suspense fallback={<div>ページを読み込み中です...</div>}>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/signup" element={ isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/signin" element={ isAuthenticated ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/profile" element={ isAuthenticated ? <Profile /> : <Navigate to="/" />} />
          <Route path="/new" element={ isAuthenticated ? <NewBook /> : <NewBook />} />
          <Route path="/detail/:id" element={<BookDetail />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
