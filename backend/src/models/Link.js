const mongoose = require('mongoose')

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ['link', 'social', 'youtube', 'vimeo'], required: true },
  icon: { type: String },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  description: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Link', LinkSchema)
