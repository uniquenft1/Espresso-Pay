import { useState, useEffect, useCallback } from 'react';
import { fetchBlockHeight, fetchBlock } from '../services/espressoService';
import type { NetworkStats, RecentBlock, ApiBlockResponse } from '../types';
import { REFRESH_INTERVAL_MS, RECENT_BLOCKS_COUNT } from '../constants';

// Stricter type guard to ensure the block object has the required properties and types
const isValidBlockResponse = (b: any): b is ApiBlockResponse => {
  return !!(
    b &&
    b.block_info &&
    typeof b.block_info.height === 'number' &&
    typeof b.block_info.timestamp === 'string' &&
    typeof b.transaction_n === 'number'
  );
};

export const useEspressoData = () => {
  const [stats, setStats] = useState<NetworkStats>({
    blockHeight: null,
    avgBlockTime: 0,
    totalTransactions: 0,
  });
  const [recentBlocks, setRecentBlocks] = useState<RecentBlock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const height = await fetchBlockHeight();
      
      const startBlock = Math.max(0, height - (RECENT_BLOCKS_COUNT - 1));
      const blockPromises = [];
      for (let i = height; i >= startBlock; i--) {
        blockPromises.push(fetchBlock(i));
      }

      const blockResponses = await Promise.all(blockPromises);
      const validBlocks = blockResponses.filter(isValidBlockResponse);

      if (validBlocks.length > 0) {
        // Defensively sort by height descending to ensure correct order for calculations
        validBlocks.sort((a, b) => b.block_info.height - a.block_info.height);
        
        const newRecentBlocks = validBlocks.map(block => {
            const timestamp = new Date(block.block_info.timestamp).getTime();
            return {
              height: block.block_info.height,
              // Use current time as a fallback for invalid timestamps
              timestamp: isNaN(timestamp) ? Date.now() : timestamp,
              transactions: block.transaction_n,
              size: Math.floor(Math.random() * 1000) + 100, // Mock size as in example
            };
        });

        setRecentBlocks(newRecentBlocks);
        
        let avgBlockTime = 0;
        if (newRecentBlocks.length > 1) {
            const firstBlock = newRecentBlocks[0];
            const lastBlock = newRecentBlocks[newRecentBlocks.length - 1];
            const timeDiff = (firstBlock.timestamp - lastBlock.timestamp) / 1000;
            const blockDiff = firstBlock.height - lastBlock.height;
            if (blockDiff > 0) {
                avgBlockTime = timeDiff / blockDiff;
            }
        }
        
        const totalTransactions = newRecentBlocks.reduce((sum, b) => sum + b.transactions, 0);

        setStats({
          blockHeight: height,
          avgBlockTime: avgBlockTime,
          totalTransactions: totalTransactions,
        });
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load dashboard data. The network may be temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stats, recentBlocks, loading, error };
};
