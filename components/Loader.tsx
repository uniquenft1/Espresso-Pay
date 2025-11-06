
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p className="text-purple-300 text-lg">Loading Espresso Decaf Testnet...</p>
      </div>
    </div>
  );
};

export default Loader;
