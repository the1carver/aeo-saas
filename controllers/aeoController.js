const Project = require('../models/Project');
const User = require('../models/User');
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

// Middleware to check subscription
const checkSubscription = async (req, res, next) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user || user.subscriptionStatus !== 'active') {
    return res.status(403).json({ msg: 'Subscription not active.' });
  }
  next();
};

exports.getContent = async (req, res) => {
  try {
    // Add get content logic here
    res.status(200).json({ message: 'Content retrieved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createContent = async (req, res) => {
  try {
    // Add create content logic here
    res.status(201).json({ message: 'Content created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateContent = async (req, res) => {
  try {
    // Add update content logic here
    res.status(200).json({ message: 'Content updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    // Add delete content logic here
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { projectName, websiteUrl } = req.body;
    const newProject = new Project({
      userId: req.user.userId,
      projectName,
      websiteUrl,
    });
    await newProject.save();
    return res.json(newProject);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.generateFaqSuggestions = async (req, res) => {
  try {
    // Example input: content or topic
    const { content } = req.body;
    // Call OpenAI to get suggested FAQs
    const prompt = `Generate 5 frequently asked questions with concise answers for: "${content}". The focus is on capturing how users might query in voice search or direct Q&A.`;
    
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are an expert AEO assistant.' }, 
                 { role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const result = response.data.choices[0].message.content;
    return res.json({ faqSuggestions: result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.analyzeSnippetPotential = async (req, res) => {
  try {
    const { urlContent } = req.body; // raw text from a webpage, for example
    // Here you'd parse the content, extract headings, check for readability, etc.
    // We'll do a simplified approach using OpenAI to parse snippet suggestions:

    const prompt = `Suggest a short paragraph (40-60 words) that directly answers a potential user question related to the following text, optimized for a Google Featured Snippet:\n\n${urlContent}\n\nFormat the answer clearly.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are an AEO optimization expert.' },
                 { role: 'user', content: prompt }],
    });

    const snippetSuggestion = response.data.choices[0].message.content;
    return res.json({ snippetSuggestion });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}; 