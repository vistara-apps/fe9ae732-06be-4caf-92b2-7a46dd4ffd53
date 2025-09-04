'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check, AlertCircle } from 'lucide-react';

interface MintButtonProps {
  onMint: () => Promise<void>;
  disabled?: boolean;
  variant?: 'primary' | 'disabled';
}

export function MintButton({ onMint, disabled, variant = 'primary' }: MintButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleMint = async () => {
    if (disabled || status === 'loading') return;
    
    setStatus('loading');
    try {
      await onMint();
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Minting...
          </>
        );
      case 'success':
        return (
          <>
            <Check className="w-5 h-5 mr-2" />
            Minted!
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="w-5 h-5 mr-2" />
            Error
          </>
        );
      default:
        return 'Mint Token';
    }
  };

  const getButtonClass = () => {
    if (disabled || variant === 'disabled') {
      return 'btn-primary opacity-50 cursor-not-allowed';
    }
    
    switch (status) {
      case 'success':
        return 'bg-green-600 text-white px-6 py-3 rounded-md font-medium';
      case 'error':
        return 'bg-red-600 text-white px-6 py-3 rounded-md font-medium';
      default:
        return 'btn-primary';
    }
  };

  return (
    <motion.button
      onClick={handleMint}
      disabled={disabled || status === 'loading'}
      className={getButtonClass()}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
    >
      {getButtonContent()}
    </motion.button>
  );
}
