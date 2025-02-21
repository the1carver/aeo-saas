const express = require('express');
const router = express.Router();
const {
  createProject,
  generateFaqSuggestions,
  analyzeSnippetPotential,
} = require('../controllers/aeoController');
const auth = require('../middleware/auth');
const subscription = require('../middleware/subscription');

router.post('/project', auth, subscription, createProject);
router.post('/faq-suggestions', auth, subscription, generateFaqSuggestions);
router.post('/snippet-analysis', auth, subscription, analyzeSnippetPotential);

module.exports = router; 