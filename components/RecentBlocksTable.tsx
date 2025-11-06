
import React from 'react';
import { RecentBlock } from '../types';
import { Box, Zap } from './icons';

interface RecentBlocksTableProps {
  blocks: RecentBlock[];
}

const formatTime = (timestamp: number): string => {
  if (!timestamp) return '...';
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 1) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
};

const RecentBlocksTable: React.FC<RecentBlocksTableProps> = ({ blocks }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Box className="w-6 h-6 text-purple-400" />
        Recent Blocks
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-purple-500/30">
              <th className="text-left py-3 px-4 text-purple-300 font-semibold text-sm">Block</th>
              <th className="text-left py-3 px-4 text-purple-300 font-semibold text-sm">Transactions</th>
              <th className="text-left py-3 px-4 text-purple-300 font-semibold text-sm">Size</th>
              <th className="text-left py-3 px-4 text-purple-300 font-semibold text-sm">Time</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => (
              <tr 
                key={block.height} 
                className="border-b border-slate-700/50 hover:bg-purple-900/20 transition-colors"
              >
                <td className="py-4 px-4">
                  <a href={`https://explorer.decaf.testnet.espresso.network/block/${block.height}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 font-mono font-semibold hover:underline">
                    #{block.height}
                  </a>
                </td>
                <td className="py-4 px-4">
                  <span className="text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    {block.transactions} txs
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-300">{block.size} bytes</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-gray-400">{formatTime(block.timestamp)}</span>
                </td>
              </tr>
            ))}
             {blocks.length === 0 && (
                <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-400">Fetching recent blocks...</td>
                </tr>
             )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBlocksTable;
