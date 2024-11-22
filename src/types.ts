export interface Task {
  id: string;
  title: string;
  description: string;
  priority: number;
  reasoning: string;
  completed: boolean;
  createdAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
}