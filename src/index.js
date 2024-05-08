import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/route';
import { RefreshTokenProvider } from './components/Security/RefreshTokenProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RefreshTokenProvider>
    <RouterProvider router={router} />
  </RefreshTokenProvider>
);
