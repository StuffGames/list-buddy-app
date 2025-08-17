// TODO: turn this file to typescript and figure out about this "require(...)" business
require('dotenv').config();

const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const breakdown = async (taskName, taskDescription) => {
  const prompt = `
      Given the task "${taskName}" with the description: "${taskDescription}",
      break down this task into 2-5 reasonable actionable simple steps, keep the response concise to just the actions (max 12 words) and respond in plain text (do not use formatting like **)
      Format your response as a list of steps, each with a short explanation.
  `;

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    model: 'gpt-4o-mini'
  });

  const thebreakdown = response.choices[0].message.content.trim();
  //return { difficulty, priority};
  return {res: thebreakdown};
};

// async function main() {
//   const aaa = await breakdown('go holiday shopping for family','brianna wants a new purse, john lost his gucci wallet')
//   console.log(aaa)
// }

// main().catch(e => console.log(e));

export {breakdown};