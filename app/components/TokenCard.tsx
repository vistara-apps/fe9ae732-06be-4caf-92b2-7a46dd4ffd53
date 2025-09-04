'use client';

import { motion } from 'framer-motion';
import { Clock, Shield, ExternalLink, Copy, Check } from 'lucide-react';
import { Token } from '@/app/types';
import { useState } from 'react';

interface TokenCardProps {
  token: Token;
  variant?: 'minted' | 'remixable';
}

export function TokenCard({ token, variant = 'minted' }: TokenCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className={`card glass text-white ${variant === 'remixable' ? 'border-accent border-2' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{token.title || `Token #${token.tokenId}`}</h3>
          <p className="text-white/60 text-sm">{token.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          {variant === 'remixable' && (
            <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-medium">
              Remixable
            </span>
          )}
          <Shield className="w-5 h-5 text-green-400" />
        </div>
      </div>

      {/* Content Preview */}
      <div className="bg-white/5 rounded-lg p-3 mb-4 text-sm">
        <p className="text-white/80 line-clamp-3">
          {token.associatedContentLink.length > 100 
            ? `${token.associatedContentLink.substring(0, 100)}...`
            : token.associatedContentLink
          }
        </p>
      </div>

      {/* Metadata */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Token ID</span>
          <div className="flex items-center">
            <span className="font-mono">{token.tokenId.substring(0, 8)}...</span>
            <button
              onClick={() => copyToClipboard(token.tokenId)}
              className="ml-2 p-1 hover:bg-white/10 rounded"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Minted</span>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{formatDate(token.mintTimestamp)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Royalty</span>
          <span className="font-medium">{token.royaltyPercentage}%</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded text-sm transition-colors">
          View Details
        </button>
        <button className="bg-primary hover:opacity-90 text-white px-3 py-2 rounded text-sm transition-opacity">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
