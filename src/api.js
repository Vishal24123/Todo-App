import axios from 'axios';

const OPENAI_API_KEY = 'your-openai-api-key'; // Replace with your OpenAI API key

export const getTaskHelp = async (taskDescription) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-4', // or 'gpt-3.5-turbo'
        prompt: `How to do the task: ${taskDescription}`,
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching help:", error);
    return "Sorry, I couldn't fetch help at the moment.";
  }
};
