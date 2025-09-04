'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ContentInput } from './ContentInput';
import { MintingProgress } from './MintingProgress';
import { useMinting } from '@/app/hooks/useMinting';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { motion } from 'framer-motion';

export function MintingInterface() {
  const { isConnected } = useAccount();
  const { mintingState, mintToken, resetMinting } = useMinting();

  const handleContentSubmit = async (contentInput: any) => {
    try {
      await mintToken(contentInput);
    } catch (error) {
      console.error('Minting failed:', error);
    }
  };

  if (!isConnected) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="card glass text-white max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-4">Connect Your Wallet</h3>
          <p className="text-white/70 mb-6">
            Connect your wallet to start creating timestamped proofs and minting tokens
          </p>
          <ConnectWallet />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-8">
      <MintingProgress state={mintingState} />
      
      {(mintingState.step === 'input' || mintingState.step === 'complete') && (
        <ContentInput 
          onSubmit={handleContentSubmit}
          isLoading={mintingState.isLoading}
        />
      )}
      
      {mintingState.step === 'complete' && (
        <div className="text-center mt-8">
          <motion.button
            onClick={resetMinting}
            className="btn-accent"
            whileTap={{ scale: 0.98 }}
          >
            Create Another Token
          </motion.button>
        </div>
      )}
    </div>
  );
}
