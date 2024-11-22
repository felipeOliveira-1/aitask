interface Env {
  OPENAI_API_KEY: string;
}

function validateEnv(): Env {
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    throw new Error(
      'Missing OPENAI_API_KEY. Please add VITE_OPENAI_API_KEY to your .env.local file'
    );
  }

  return {
    OPENAI_API_KEY
  };
}

export const env = validateEnv();