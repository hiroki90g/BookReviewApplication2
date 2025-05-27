import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Books from './pages/books';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/profile';
import NewBook from './pages/new';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './features/user/userSlice';
import Header from './pages/Header';
import BookDetail from './pages/bookDetail';
import EditBook from './pages/bookEdit'

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/signup" element={ isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/signin" element={ isAuthenticated ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/profile" element={ isAuthenticated ? <Profile /> : <Navigate to="/" />} />
        <Route path="/new" element={ isAuthenticated ? <NewBook /> : <NewBook />} />
        <Route path="/detail/:id" element={<BookDetail />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
