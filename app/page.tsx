'use client';

import { AppShell } from './components/AppShell';
import { HeroSection } from './components/HeroSection';
import { Dashboard } from './components/Dashboard';
import { MintingInterface } from './components/MintingInterface';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function HomePage() {
  const [showMinting, setShowMinting] = useState(false);

  return (
    <AppShell>
      {!showMinting ? (
        <>
          <HeroSection />
          <Dashboard />
          
          {/* CTA Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center py-12"
          >
            <motion.button
              onClick={() => setShowMinting(true)}
              className="btn-accent inline-flex items-center text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First OriginStamp
            </motion.button>
          </motion.section>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between py-8">
            <h1 className="text-3xl font-bold text-white">Create OriginStamp</h1>
            <button
              onClick={() => setShowMinting(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
          
          <MintingInterface />
        </>
      )}
    </AppShell>
  );
}
