'use client';

import { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { MintingState, ContentInput } from '@/app/types';
import { useContentHashing } from './useContentHashing';

export function useMinting() {
  const { address, isConnected } = useAccount();
  const { generateHash } = useContentHashing();
  const [mintingState, setMintingState] = useState<MintingState>({
    isLoading: false,
    step: 'input'
  });

  const mintToken = useCallback(async (contentInput: ContentInput) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    setMintingState({
      isLoading: true,
      step: 'hash'
    });

    try {
      // Step 1: Generate content hash
      setMintingState(prev => ({ ...prev, step: 'hash' }));
      const contentHash = await generateHash(contentInput.content);
      
      // Step 2: Upload to IPFS (simulated)
      setMintingState(prev => ({ ...prev, step: 'upload' }));
      await new Promise(resolve => setTimeout(resolve, 2000));
      const ipfsHash = `QmSimulated${Date.now()}`;
      
      // Step 3: Mint on-chain (simulated)
      setMintingState(prev => ({ ...prev, step: 'mint' }));
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock transaction hash and token ID
      const txHash = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      const tokenId = `${Date.now()}`;
      
      setMintingState({
        isLoading: false,
        step: 'complete',
        txHash,
        tokenId
      });

      return {
        tokenId,
        txHash,
        contentHash: contentHash.hash,
        ipfsHash
      };
    } catch (error) {
      setMintingState({
        isLoading: false,
        step: 'input',
        error: error instanceof Error ? error.message : 'Minting failed'
      });
      throw error;
    }
  }, [isConnected, address, generateHash]);

  const resetMinting = useCallback(() => {
    setMintingState({
      isLoading: false,
      step: 'input'
    });
  }, []);

  return {
    mintingState,
    mintToken,
    resetMinting
  };
}
