'use client';

import { motion } from 'framer-motion';
import { Shield, Clock, Coins, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-20"
    >
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-white mb-4">
          Prove Your Idea
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Turn any post into a ZK-verified, remixable token with timestamped proof of origin and automated royalty distribution.
        </p>
      </div>

      {/* 3D Visualization */}
      <motion.div 
        className="relative mb-12"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="flex justify-center items-center relative">
          <div className="w-40 h-40 bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl transform rotate-12 shadow-2xl flex items-center justify-center">
            <Shield className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -right-8 -top-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl transform -rotate-12 shadow-xl flex items-center justify-center">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -left-8 -bottom-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl transform rotate-45 shadow-xl flex items-center justify-center">
            <Coins className="w-12 h-12 text-white" />
          </div>
        </div>
        
        {/* Version Badge */}
        <div className="absolute -right-16 top-8 glass rounded-full px-4 py-2 text-white font-bold text-2xl">
          15.0
        </div>
      </motion.div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="card glass text-white"
        >
          <Clock className="w-8 h-8 text-cyan-400 mb-4 mx-auto" />
          <h3 className="font-bold text-lg mb-2">Timestamped Proof</h3>
          <p className="text-white/70 text-sm">
            Establish undeniable proof of originality with cryptographic timestamping
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="card glass text-white"
        >
          <Shield className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
          <h3 className="font-bold text-lg mb-2">ZK Verification</h3>
          <p className="text-white/70 text-sm">
            Zero-knowledge verified tokens with minimal technical friction
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="card glass text-white"
        >
          <Coins className="w-8 h-8 text-yellow-400 mb-4 mx-auto" />
          <h3 className="font-bold text-lg mb-2">Auto Royalties</h3>
          <p className="text-white/70 text-sm">
            Earn automatically from remixes and secondary sales
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
