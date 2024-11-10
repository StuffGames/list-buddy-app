require('dotenv').config();

const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to calculate days remaining until the deadline
const daysUntilDeadline = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);
    return Math.max(0, Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)));
};

// Function to prompt OpenAI for missing task assessment values
const getOpenAIEstimates = async (taskDescription) => {
    const prompt = `
        Estimate the following values for the task: "${taskDescription}"
        1. Rate the difficulty on a scale of 1 to 5 (1 being very easy, 5 being very difficult), based on potential challenges and required effort.
        2. Rate the priority on a scale of 1 to 5 (1 being low priority, 5 being very high priority), based on how crucial it is to complete this task.
        Provide the answers as two numbers separated by a comma (difficulty, priority).
    `;

    const response = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        model: "gpt-4o-mini"
    });

    const [difficulty, priority] = response.choices[0].message.content.trim().split(",").map(num => parseFloat(num));
    return { difficulty, priority};
};

// Main function to assess a task and calculate importance score
async function calculateTaskImportance({ taskDescription, daysUntilDeadline, difficulty, priority }) {
    // Check if difficulty and priority are provided; if not, use ChatGPT to estimate them
    if (!difficulty || !priority) {
        const estimates = await getOpenAIEstimates(taskDescription);
        difficulty = difficulty || estimates.difficulty;
        priority = priority || estimates.priority;
    }

    // Normalize days until deadline
    // If the task is past due, set normalizedDays to 0 for maximum priority
    const normalizedDays = daysUntilDeadline <= 0 ? 0 : Math.min(daysUntilDeadline, 10) / 10;
    
    // Scale difficulty and priority factors (1-5 scaled down to 0.2 - 1)
    const difficultyFactor = 1 - (difficulty / 5);
    const priorityFactor = 1 - (priority / 5);

    // Calculate importance score
    const importanceScore = normalizedDays + priorityFactor + difficultyFactor;

    return importanceScore.toFixed(2);
}

// Example usage

// (async () => {
//     const task = {
//         taskDescription: "Complete the final project report with all data visualizations.",
//         daysUntilDeadline: 10, // Example of a past-due task
//         difficulty: 1,      // Set to null to let ChatGPT estimate
//         priority: 1         // Set to null to let ChatGPT estimate
//     };

//     const importanceScore = await calculateTaskImportance(task);
//     console.log(importanceScore);
// })();

export {daysUntilDeadline, calculateTaskImportance, getOpenAIEstimates};