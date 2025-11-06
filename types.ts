
export interface ApiBlockInfo {
  block_hash: string;
  height: number;
  timestamp: string;
  l1_finalized: null | {
    number: number;
    timestamp: string;
    hash: string;
  };
}

export interface ApiBlockResponse {
  block_info: ApiBlockInfo;
  transaction_n: number;
  transactions: string[]; // Array of transaction hashes
}

export interface RecentBlock {
  height: number;
  timestamp: number;
  transactions: number;
  size: number; // Mocked data
}

export interface NetworkStats {
  blockHeight: number | null;
  avgBlockTime: number;
  totalTransactions: number;
}
