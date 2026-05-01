const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Kat Seguros' },
  bio: { type: String, default: 'Tu seguro de confianza - Autos, Hogar y Vida' },
  avatarUrl: { type: String },
  theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
}, { timestamps: true })

module.exports = mongoose.model('Profile', ProfileSchema)
