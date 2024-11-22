import React, { useState } from 'react';
import { Task } from '../types';
import { CheckCircle2, Circle, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority);

  const toggleExpand = (id: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {sortedTasks.map((task) => {
        const isExpanded = expandedTasks.has(task.id);
        
        return (
          <div
            key={task.id}
            className={`p-4 rounded-lg border ${
              task.completed
                ? 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-200 hover:border-blue-300'
            } transition-all duration-200 group`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onToggleTask(task.id)}
                className="mt-1 text-gray-400 hover:text-blue-500 transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 className="text-green-500" size={20} />
                ) : (
                  <Circle size={20} />
                )}
              </button>
              <div className="flex-1">
                <h3
                  className={`font-medium ${
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </h3>
                {task.description && (
                  <p
                    className={`mt-1 text-sm ${
                      task.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {task.description}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getPriorityColor(task.priority)
                    }`}
                  >
                    Priority {task.priority}
                  </span>
                  <button
                    onClick={() => toggleExpand(task.id)}
                    className="text-gray-400 hover:text-blue-500 transition-colors inline-flex items-center gap-1 text-sm"
                  >
                    {isExpanded ? (
                      <>
                        Hide reasoning
                        <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        Show reasoning
                        <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                </div>
                {isExpanded && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                    <strong className="text-gray-700">AI Reasoning:</strong> {task.reasoning}
                  </div>
                )}
              </div>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        );
      })}
      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tasks yet. Add some tasks to get started!
        </div>
      )}
    </div>
  );
}

function getPriorityColor(priority: number): string {
  switch (priority) {
    case 3:
      return 'bg-red-100 text-red-800';
    case 2:
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-green-100 text-green-800';
  }
}