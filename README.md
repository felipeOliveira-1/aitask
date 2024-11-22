# AI Task Prioritizer

## Overview
The AI Task Prioritizer is a web application designed to help users prioritize their tasks based on alignment with long-term goals. It leverages OpenAI's GPT-4o model to analyze tasks and assign priority levels, ensuring that users focus on what truly matters to achieve their objectives.

## Features
- **Task Analysis:** Uses AI to evaluate the importance of tasks in relation to a user's long-term goals.
- **Priority Levels:** Tasks are assigned a priority from 1 to 3, with 1 being the most important and urgent.
- **Language Adaptability:** The AI provides responses in the language of the user, ensuring clarity and understanding.

## Project Structure
- **src/components:** Contains React components used throughout the application.
- **src/lib:** Includes utility functions and integrations, such as the OpenAI API interaction.
- **src/main.tsx:** The entry point for the React application.
- **src/types.ts:** Type definitions for TypeScript used in the project.

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd project-bolt-sb1-b5twgc
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Scripts
- `npm run dev`: Start the development server using Vite.
- `npm run build`: Build the project for production.

- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Preview the production build locally.

## Dependencies
- **React & React-DOM:** Core libraries for building the user interface.
- **OpenAI:** For integrating AI capabilities.
- **Tailwind CSS:** For styling the application.
- **TypeScript:** For type safety in JavaScript.

## Rationale
The AI Task Prioritizer was developed to assist individuals in managing their tasks more effectively by aligning daily activities with long-term objectives. By using advanced AI models, the application provides intelligent insights into task importance, helping users make informed decisions about where to focus their efforts.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
