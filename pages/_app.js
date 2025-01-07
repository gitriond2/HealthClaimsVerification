// pages/_app.js
import '../styles/globals.css';
import '../styles/tailwind.css'; // Importa el archivo CSS de Tailwind
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
