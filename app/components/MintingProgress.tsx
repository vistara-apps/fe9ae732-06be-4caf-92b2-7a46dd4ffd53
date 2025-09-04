'use client';

import { motion } from 'framer-motion';
import { Hash, Upload, Zap, CheckCircle, Loader2 } from 'lucide-react';
import { MintingState } from '@/app/types';

interface MintingProgressProps {
  state: MintingState;
}

export function MintingProgress({ state }: MintingProgressProps) {
  const steps = [
    { id: 'hash', label: 'Generating Hash', icon: Hash },
    { id: 'upload', label: 'Uploading to IPFS', icon: Upload },
    { id: 'mint', label: 'Minting Token', icon: Zap },
    { id: 'complete', label: 'Complete', icon: CheckCircle }
  ];

  const stepIndex = steps.findIndex(step => step.id === state.step);

  if (!state.isLoading && state.step === 'input') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card glass text-white max-w-2xl mx-auto mb-8"
    >
      <h3 className="text-lg font-bold mb-6 text-center">
        {state.step === 'complete' ? 'Token Minted Successfully!' : 'Minting in Progress'}
      </h3>

      {state.error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-200">{state.error}</p>
        </div>
      )}

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = index === stepIndex;
          const isCompleted = index < stepIndex || state.step === 'complete';
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={false}
              animate={{
                opacity: isActive || isCompleted ? 1 : 0.5,
                scale: isActive ? 1.02 : 1
              }}
              className={`flex items-center p-4 rounded-lg transition-all ${
                isActive ? 'bg-primary/20 border border-primary/40' : 
                isCompleted ? 'bg-green-500/20' : 'bg-white/5'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                isCompleted ? 'bg-green-500' : 
                isActive ? 'bg-primary' : 'bg-white/10'
              }`}>
                {isActive && state.isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium">{step.label}</h4>
                {isActive && (
                  <p className="text-sm text-white/60 mt-1">
                    {step.id === 'hash' && 'Creating cryptographic proof...'}
                    {step.id === 'upload' && 'Storing content on IPFS...'}
                    {step.id === 'mint' && 'Submitting transaction...'}
                  </p>
                )}
              </div>
              
              {isCompleted && (
                <CheckCircle className="w-5 h-5 text-green-400" />
              )}
            </motion.div>
          );
        })}
      </div>

      {state.step === 'complete' && state.txHash && (
        <div className="mt-6 space-y-3">
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
            <p className="text-green-200 mb-2">
              <strong>Token ID:</strong> {state.tokenId}
            </p>
            <p className="text-green-200 text-sm">
              <strong>Transaction:</strong> {state.txHash}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 btn-primary">
              View on Explorer
            </button>
            <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Share Token
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
