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
    const project = new Project({
      userId: req.user.userId,
      projectName,
      websiteUrl,
    });
    await project.save();
    return res.status(201).json(project);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.generateFaqSuggestions = async (req, res) => {
  try {
    const { content, projectId } = req.body;
    
    const prompt = `Generate 5 frequently asked questions with concise answers for the following content. Focus on voice search optimization and natural language queries:\n\n${content}`;
    
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AEO expert specializing in FAQ generation.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const faqs = response.data.choices[0].message.content;

    // Update project with new FAQs if projectId provided
    if (projectId) {
      await Project.findByIdAndUpdate(projectId, {
        $push: { 
          contentAnalysis: {
            type: 'faq',
            content: faqs,
            timestamp: new Date()
          }
        }
      });
    }

    return res.json({ faqs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.analyzeSnippetPotential = async (req, res) => {
  try {
    const { content, projectId } = req.body;
    
    const prompt = `Analyze the following content and suggest optimizations for featured snippets. Include:\n
    1. A concise answer (40-60 words)\n
    2. Suggested heading structure\n
    3. Key points to highlight\n
    4. Voice search optimization tips\n\nContent:\n${content}`;
    
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an AEO expert specializing in featured snippet optimization.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const analysis = response.data.choices[0].message.content;

    // Update project with new analysis if projectId provided
    if (projectId) {
      await Project.findByIdAndUpdate(projectId, {
        $push: { 
          contentAnalysis: {
            type: 'snippet',
            content: analysis,
            timestamp: new Date()
          }
        }
      });
    }

    return res.json({ analysis });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}; 