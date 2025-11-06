
import React from 'react';
import { useEspressoData } from './hooks/useEspressoData';
import Header from './components/Header';
import StatCard from './components/StatCard';
import RecentBlocksTable from './components/RecentBlocksTable';
import ApiInfo from './components/ApiInfo';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { Activity, Box, Zap, Clock, TrendingUp } from './components/icons';

const App: React.FC = () => {
  const { stats, recentBlocks, loading, error } = useEspressoData();

  if (loading && !stats.blockHeight) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Box className="w-8 h-8 text-purple-400" />}
            title="Current Block Height"
            value={stats.blockHeight ? stats.blockHeight.toLocaleString() : '...'}
            color="purple"
            extraIcon={loading ? <Activity className="w-5 h-5 text-purple-400 animate-spin" /> : <Activity className="w-5 h-5 text-purple-400" />}
          />
          <StatCard
            icon={<Clock className="w-8 h-8 text-blue-400" />}
            title="Avg Block Time"
            value={stats.avgBlockTime > 0 ? `${stats.avgBlockTime.toFixed(2)}s` : '...'}
            color="blue"
          />
          <StatCard
            icon={<Zap className="w-8 h-8 text-pink-400" />}
            title="Recent Transactions"
            value={stats.totalTransactions > 0 ? stats.totalTransactions.toLocaleString() : '...'}
            color="pink"
          />
          <StatCard
            icon={<TrendingUp className="w-8 h-8 text-green-400" />}
            title="Active Nodes"
            value="100+"
            color="green"
            isStatic={true}
          />
        </div>

        <RecentBlocksTable blocks={recentBlocks} />

        <ApiInfo />

        <Footer />
      </div>
    </div>
  );
};

export default App;
