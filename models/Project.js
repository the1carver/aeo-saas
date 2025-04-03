const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectName: {
      type: String,
      required: [true, 'Please provide a project name'],
      trim: true,
    },
    websiteUrl: {
      type: String,
      required: [true, 'Please provide a website URL'],
      trim: true,
    },
    contentAnalysis: [
      {
        content: String,
        analysis: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    faqSuggestions: [
      {
        content: String,
        faqs: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;