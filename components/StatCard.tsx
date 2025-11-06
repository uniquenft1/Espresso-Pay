
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: 'purple' | 'blue' | 'pink' | 'green';
  extraIcon?: React.ReactNode;
  isStatic?: boolean;
}

const colorClasses = {
  purple: {
    border: 'border-purple-500/30 hover:border-purple-500/60',
    text: 'text-purple-300',
    icon: 'text-purple-400',
  },
  blue: {
    border: 'border-blue-500/30 hover:border-blue-500/60',
    text: 'text-blue-300',
    icon: 'text-blue-400',
  },
  pink: {
    border: 'border-pink-500/30 hover:border-pink-500/60',
    text: 'text-pink-300',
    icon: 'text-pink-400',
  },
  green: {
    border: 'border-green-500/30 hover:border-green-500/60',
    text: 'text-green-300',
    icon: 'text-green-400',
  },
};

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color, extraIcon, isStatic }) => {
  const classes = colorClasses[color];
  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl p-6 transition-all ${classes.border}`}>
      <div className="flex items-center justify-between mb-2">
        {icon}
        {extraIcon}
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className={`${classes.text} text-sm`}>{title}</p>
    </div>
  );
};

export default StatCard;
