import React from 'react';
import './App.css';

import { BrowserRouter as Router, Link } from 'react-router-dom';
import { AppRoutes } from './routes/Routes';
import { Copyright } from './components/dashboard/CopyRight';
import { StickyFooter } from './components/dashboard/StickyFooter';

function App() {
    return (
        <div className='App'>
            <Router>
                <AppRoutes />
            </Router>
            <StickyFooter />
        </div>
    );
}

export default App;
