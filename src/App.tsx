import "./lib/firebaseConfig";
import React, { useState, useEffect } from 'react';
import { Brain, LayoutDashboard, Target } from 'lucide-react';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { GoalInput } from './components/GoalInput';
import { Task, Goal } from './types';
import { analyzePriority } from './lib/openai';
import { ErrorBoundary } from './components/ErrorBoundary';
import confetti from 'canvas-confetti';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('User Info:', user);
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
};

const handleSignOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed:', user);
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button onClick={signInWithGoogle} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Sign in with Google
        </button>
      </div>
    );
  }

  const handleAddTask = async (title: string, description: string) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const analysis = await analyzePriority({ title, description }, goal);
      
      const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description,
        priority: analysis.priority,
        reasoning: analysis.reasoning,
        completed: false,
        createdAt: new Date(),
      };
      
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze task');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSetGoal = (title: string, description: string) => {
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      title,
      description,
    };
    setGoal(newGoal);
    setError(null);
    setShowWelcome(false);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => {
      const updatedTasks = prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      if (updatedTasks.every(task => task.completed)) {
        confetti();
      }
      return updatedTasks;
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
  };

  const Modal = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => (
    <div className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full border border-gray-300 mt-20 mr-10">
        {children}
        <button onClick={onClose} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Close
        </button>
      </div>
    </div>
  );

  const WelcomeMessage = () => (
    <Modal onClose={handleDismissWelcome}>
      <h2 className="text-xl font-semibold">Welcome to the AI Task Prioritizer!</h2>
      <p className="mt-2">To get started, please set your long-term goal.</p>      
    </Modal>
  );

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {showWelcome && !goal && <WelcomeMessage />}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <Brain className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">AI Task</h1>
            <button onClick={handleSignOut} className="ml-auto bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <ErrorBoundary>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-[1fr,2fr]">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <LayoutDashboard className="text-blue-600" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900">Add New Task</h2>
                </div>
                <TaskInput onAddTask={handleAddTask} isAnalyzing={isAnalyzing} />
              </div>

              {!goal ? (
                <GoalInput onSetGoal={handleSetGoal} />
              ) : (
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={24} />
                    <h2 className="text-xl font-semibold">Current Goal</h2>
                  </div>
                  <h3 className="text-lg font-medium">{goal.title}</h3>
                  <p className="mt-2 text-white/90">{goal.description}</p>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Tasks</h2>
              <TaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </div>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;