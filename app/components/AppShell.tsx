'use client';

import { ReactNode } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Identity } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import { Box, Clock, Shield } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { address, isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800">
      {/* Header */}
      <header className="relative z-10 p-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Box className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">OriginStamp</span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-white/80">
            <a href="#" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="hover:text-white transition-colors">Verified</a>
            <a href="#" className="hover:text-white transition-colors">Rewards</a>
          </div>

          <div className="flex items-center space-x-4">
            {isConnected && address && (
              <Identity address={address as `0x${string}`} />
            )}
            <ConnectWallet />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-pulse-slow delay-500" />
      </div>
    </div>
  );
}
