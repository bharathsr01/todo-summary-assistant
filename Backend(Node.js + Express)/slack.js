const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

async function summarizeTodos(todos) {
  const prompt = `Summarize the following to-dos: ${todos.map(t => t.text).join(', ')}`;
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.data.choices[0].message.content;
}

module.exports = { summarizeTodos };

make it simple description for this code in paragraph
