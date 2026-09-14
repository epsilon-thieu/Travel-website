import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts'
import { Route } from 'react-router-dom';
import { ToursPage } from './pages/user/SearchPages/ToursPage.tsx';
import { TourDetailPage } from './pages/user/SearchPages/TourDetailPage.tsx';

// 1. Thêm dòng import này
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="635401137109-tuv02b6hjesasevi1dbgfq89fi7eqpvo.apps.googleusercontent.com">
      <Provider store={store}>

        <App />

      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
