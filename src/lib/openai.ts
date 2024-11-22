import OpenAI from 'openai';
import { env } from './env';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface TaskAnalysis {
  priority: number;
  reasoning: string;
}

interface TaskInput {
  title: string;
  description: string;
}

interface GoalInput {
  title: string;
  description: string;
}

export async function analyzePriority(
  task: TaskInput,
  goal: GoalInput | null
): Promise<TaskAnalysis> {
  if (!goal) {
    return {
      priority: 1,
      reasoning: "No long-term goal set. Please set a goal for better task prioritization."
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI task prioritizer. Analyze tasks and determine their priority (1-3) based on alignment with the user's long-term goal. Your answers must be give in pt-br.
            - Priority 3: Highly aligned and urgent
            - Priority 2: Moderately aligned or medium urgency
            - Priority 1: Low alignment or not urgent
            Remember to give your answers alwaysin pt-br. Provide clear, concise reasoning for the priority level.`
        },
        {
          role: "user",
          content: `Long-term goal: ${goal.title}
Goal description: ${goal.description}

Task: ${task.title}
Task description: ${task.description || '[No description provided]'}

Analyze this task's priority in relation to the goal. Format response as:
Priority: [number]
Reasoning: [your analysis]`
        }
      ],
      temperature: 0.3,
      max_tokens: 150
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Invalid response from OpenAI");
    }

    const priorityMatch = content.match(/priority:\s*([1-3])/i);
    const reasoningMatch = content.match(/reasoning:\s*(.+)/i);

    if (!priorityMatch || !reasoningMatch) {
      throw new Error("Unexpected response format from OpenAI");
    }

    return {
      priority: parseInt(priorityMatch[1]),
      reasoning: reasoningMatch[1].trim()
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : "Failed to analyze task priority"
    );
  }
}