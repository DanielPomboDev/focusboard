const OpenAI = require('openai');

const qwen = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});

const chat = async (prompt, systemPrompt) => {
    const response = await qwen.chat.completions.create({
        model: 'qwen/qwen-plus',
        messages: [
            {
                role: 'system',
                content: systemPrompt || 'You are FocusBoard AI, a smart productivity assistant. Always respond with valid JSON only. No extra text, no markdown, no backticks.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.7
    });

    return response.choices[0].message.content;
};

module.exports = { chat };