import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/auth-context';
import { IsLoadingProvider } from './Context/isLoading-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <IsLoadingProvider>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </IsLoadingProvider>
  </AuthContextProvider>
);
