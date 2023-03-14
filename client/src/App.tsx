import React from 'react';
import './App.css';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Link,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import KatasPage from './pages/KatasPage';
import KatasDetailPage from './pages/KatasDetailPage';

function App() {
    return (
        <div className='App'>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/login'>Home</Link>
                        </li>
                        <li>
                            <Link to='/register'>Home</Link>
                        </li>
                        <li>
                            <Link to='/katas'>Home</Link>
                        </li>
                    </ul>
                </nav>
            </Router>
            <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
                <Route path='/katas' element={<KatasPage />}></Route>
                <Route path='/katas/:id' element={<KatasDetailPage />}></Route>
                <Route path='*' element={<Navigate to='/' replace />}></Route>
            </Routes>
        </div>
    );
}

export default App;
