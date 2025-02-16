const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectName: { type: String, required: true },
  websiteUrl: { type: String },
  // Store relevant AEO data, e.g. structured data scans, snippet opportunities
  contentAnalysis: [
    {
      pageUrl: String,
      snippetSuggestions: String,
      faqSuggestions: [String],
      schemaMarkup: String,
      voiceReadinessScore: Number,
      // etc...
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema); 