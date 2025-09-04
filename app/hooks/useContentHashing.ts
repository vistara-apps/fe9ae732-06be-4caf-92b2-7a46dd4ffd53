'use client';

import { useState, useCallback } from 'react';
import CryptoJS from 'crypto-js';

export interface ContentHash {
  hash: string;
  timestamp: number;
  algorithm: string;
}

export function useContentHashing() {
  const [isHashing, setIsHashing] = useState(false);

  const generateHash = useCallback(async (content: string): Promise<ContentHash> => {
    setIsHashing(true);
    
    try {
      // Add timestamp to content for uniqueness
      const timestamp = Date.now();
      const contentWithTimestamp = `${content}_${timestamp}`;
      
      // Generate SHA-256 hash
      const hash = CryptoJS.SHA256(contentWithTimestamp).toString();
      
      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        hash,
        timestamp,
        algorithm: 'SHA-256'
      };
    } finally {
      setIsHashing(false);
    }
  }, []);

  const verifyHash = useCallback((content: string, expectedHash: string, timestamp: number): boolean => {
    const contentWithTimestamp = `${content}_${timestamp}`;
    const computedHash = CryptoJS.SHA256(contentWithTimestamp).toString();
    return computedHash === expectedHash;
  }, []);

  return {
    generateHash,
    verifyHash,
    isHashing
  };
}
