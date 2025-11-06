
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
        ☕ Espresso Decaf Testnet
      </h1>
      <p className="text-purple-300 text-lg">Real-time Network Dashboard</p>
      <div className="mt-4 inline-flex items-center gap-2 bg-green-900/30 border border-green-500 rounded-full px-4 py-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-green-300 text-sm font-medium">Network Active</span>
      </div>
    </header>
  );
};

export default Header;
