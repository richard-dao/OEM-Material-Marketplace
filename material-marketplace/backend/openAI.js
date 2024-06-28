const OpenAI =require('openai');
require('dotenv').config();


const openAIKey = process.env.OPENAI_APIKEY;

// Configure the OpenAI API client
const openai = new OpenAI({
    apiKey: openAIKey,
});

const sendMessageToOpenAI = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: message }]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    throw error;
  }
};

module.exports = { sendMessageToOpenAI };
