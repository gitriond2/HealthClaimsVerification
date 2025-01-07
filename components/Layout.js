// components/Layout.js
import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto p-4 bg-blue-50 text-blue-900 min-h-screen">
      <nav className="mb-4">
        <Link href="/" className="mr-4 text-blue-600">Home</Link>
        <Link href="/leaderboard" className="text-blue-600">Leaderboard</Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
