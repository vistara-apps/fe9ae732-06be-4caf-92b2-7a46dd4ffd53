'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Link, Type, Image as ImageIcon } from 'lucide-react';
import { ContentInput as ContentInputType } from '@/app/types';

interface ContentInputProps {
  onSubmit: (content: ContentInputType) => void;
  isLoading?: boolean;
}

export function ContentInput({ onSubmit, isLoading }: ContentInputProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'url'>('text');
  const [formData, setFormData] = useState({
    content: '',
    title: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim() || !formData.title.trim()) return;
    
    onSubmit({
      type: activeTab,
      content: formData.content,
      title: formData.title,
      description: formData.description
    });
  };

  const tabs = [
    { id: 'text' as const, label: 'Text', icon: Type },
    { id: 'image' as const, label: 'Image', icon: ImageIcon },
    { id: 'url' as const, label: 'URL', icon: Link },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card glass text-white max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create Your OriginStamp</h2>
      
      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center px-4 py-2 rounded-lg transition-all ${
              activeTab === id 
                ? 'bg-primary text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Give your content a title"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
        </div>

        {/* Content Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Content *</label>
          {activeTab === 'text' && (
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Paste your text content here..."
              rows={6}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              required
            />
          )}
          
          {activeTab === 'url' && (
            <input
              type="url"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="https://example.com/your-content"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          )}
          
          {activeTab === 'image' && (
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 mb-2">Drag and drop your image here</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData(prev => ({ ...prev, content: file.name }));
                  }
                }}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-block bg-white/10 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
              >
                Choose File
              </label>
            </div>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Optional description..."
            rows={3}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading || !formData.content.trim() || !formData.title.trim()}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Processing...' : 'Create Timestamp & Mint'}
        </motion.button>
      </form>

      <div className="mt-4 text-center text-white/60 text-sm">
        <p>Minting cost: $0.01 USDC + gas fees</p>
      </div>
    </motion.div>
  );
}
