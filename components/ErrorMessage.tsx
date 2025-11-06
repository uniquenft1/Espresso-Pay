
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md w-full text-center">
        <p className="text-red-300">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-500/50 hover:bg-red-500/70 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
