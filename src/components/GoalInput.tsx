import React, { useState } from 'react';
import { Target } from 'lucide-react';

interface GoalInputProps {
  onSetGoal: (title: string, description: string) => void;
}

export function GoalInput({ onSetGoal }: GoalInputProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSetGoal(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
      <div className="flex items-center gap-2 mb-4">
        <Target size={24} />
        <h2 className="text-xl font-semibold">Set Your Long-term Goal</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's your main goal?"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your goal in detail..."
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-white/70 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent h-24"
        />
        <button
          type="submit"
          className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          Set Goal
        </button>
      </form>
    </div>
  );
}