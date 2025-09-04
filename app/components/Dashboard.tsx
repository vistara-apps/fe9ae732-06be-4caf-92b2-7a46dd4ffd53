'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Eye, Coins, Clock } from 'lucide-react';

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 700 },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#3b82f6', '#8b5cf6', '#06b6d4', '#3b82f6', '#8b5cf6'];

export function Dashboard() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid lg:grid-cols-3 gap-6 mt-8"
    >
      {/* Main Stats Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="lg:col-span-2 card glass text-white"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">ZK-verified token</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-yellow-500/20 rounded-full px-3 py-1">
              <TrendingUp className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">76.8%</span>
            </div>
            <div className="flex items-center bg-blue-500/20 rounded-full px-3 py-1">
              <Eye className="w-4 h-4 text-blue-400 mr-1" />
              <span className="text-sm font-medium">154.071K</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <span className="text-3xl font-bold">15,865K</span>
          <span className="text-white/60 ml-2">tokens minted</span>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              />
              <YAxis hide />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Side Panel */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-6"
      >
        {/* Royalty Distribution */}
        <div className="card glass text-white">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
              <Coins className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium">Royalty Distribution</h4>
              <p className="text-xs text-white/60">Mint 1.5ETH</p>
            </div>
          </div>
          <div className="text-2xl font-bold mb-2">11,26.58K</div>
          <div className="flex items-center text-sm text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+5.4% Royalty Distribution</span>
          </div>
        </div>

        {/* Mint Tokens */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 glass rounded-lg">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-white text-sm">Mint Token</span>
            </div>
            <span className="text-white font-bold">£35.00.9K</span>
          </div>
          
          <div className="flex items-center justify-between p-3 glass rounded-lg">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-purple-500 rounded mr-2"></div>
              <span className="text-white text-sm">Mint Token</span>
            </div>
            <span className="text-white">&gt;</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
