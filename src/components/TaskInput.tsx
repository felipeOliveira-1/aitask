import React, { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (title: string, description: string) => void;
  isAnalyzing: boolean;
}

export function TaskInput({ onAddTask, isAnalyzing }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && !isAnalyzing) {
      onAddTask(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your task..."
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isAnalyzing}
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
          disabled={isAnalyzing}
        />
      </div>
      <button
        type="submit"
        disabled={isAnalyzing || !title.trim()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Analyzing Task...
          </>
        ) : (
          <>
            <PlusCircle size={20} />
            Add Task
          </>
        )}
      </button>
    </form>
  );
}