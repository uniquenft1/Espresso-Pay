
import React from 'react';
import { ESPRESSO_BASE_URL } from '../constants';

const ApiInfo: React.FC = () => {
  return (
    <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">API Endpoints</h3>
      <div className="space-y-3 font-mono text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <span className="text-green-400 font-bold w-12">GET</span>
          <code className="text-purple-300 break-all bg-slate-900/50 px-2 py-1 rounded">
            {ESPRESSO_BASE_URL}/v0/status/block-height
          </code>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <span className="text-green-400 font-bold w-12">GET</span>
          <code className="text-purple-300 break-all bg-slate-900/50 px-2 py-1 rounded">
            {ESPRESSO_BASE_URL}/v0/availability/block/{'<height>'}
          </code>
        </div>
        <div className="pt-4">
          <a 
            href="https://docs.espressosys.com/network/api-reference/sequencer-api"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-sans text-base"
          >
            View Full API Documentation →
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiInfo;
