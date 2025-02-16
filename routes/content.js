const express = require('express');
const router = express.Router();
const {
  createProject,
  generateFaqSuggestions,
  analyzeSnippetPotential,
} = require('../controllers/contentController');
const authMiddleware = require('../middleware/authMiddleware');
const subscriptionMiddleware = require('../middleware/subscriptionMiddleware');

// create new project
router.post('/project', authMiddleware, subscriptionMiddleware, createProject);

// generate FAQ suggestions from content
router.post('/faq-suggestions', authMiddleware, subscriptionMiddleware, generateFaqSuggestions);

// analyze snippet potential
router.post('/snippet-analysis', authMiddleware, subscriptionMiddleware, analyzeSnippetPotential);

module.exports = router; 