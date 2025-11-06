
import React from 'react';
import { REFRESH_INTERVAL_MS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 text-center text-purple-300/60 text-sm">
      <p>Data refreshes every {REFRESH_INTERVAL_MS / 1000} seconds</p>
      <p className="mt-2">
        Explorer: <a href="https://explorer.decaf.testnet.espresso.network/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
          explorer.decaf.testnet.espresso.network
        </a>
      </p>
    </footer>
  );
};

export default Footer;
