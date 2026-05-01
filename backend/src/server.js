require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/api/profile', require('./routes/profile'))
app.use('/api/links', require('./routes/links'))

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/katpseguros'

async function seedDatabase() {
  const Link = require('./models/Link')
  const count = await Link.countDocuments()
  if (count > 0) return

  await Link.insertMany([
    // Social links
    { title: 'Instagram', url: 'https://instagram.com/katseguros', type: 'social', icon: 'instagram', order: 0, active: true },
    { title: 'Twitter / X', url: 'https://twitter.com/katseguros', type: 'social', icon: 'twitter', order: 1, active: true },
    { title: 'Facebook', url: 'https://facebook.com/katseguros', type: 'social', icon: 'facebook', order: 2, active: true },
    { title: 'WhatsApp', url: 'https://wa.me/521234567890', type: 'social', icon: 'whatsapp', order: 3, active: true },
    { title: 'LinkedIn', url: 'https://linkedin.com/company/katseguros', type: 'social', icon: 'linkedin', order: 4, active: true },
    // Regular links
    { title: 'Cotiza tu Seguro de Auto', url: 'https://katseguros.com/auto', type: 'link', icon: 'auto', order: 5, active: true, description: 'Obtén tu cotización en minutos' },
    { title: 'Seguro de Hogar', url: 'https://katseguros.com/hogar', type: 'link', icon: 'hogar', order: 6, active: true, description: 'Protege tu patrimonio' },
    { title: 'Seguro de Vida', url: 'https://katseguros.com/vida', type: 'link', icon: 'vida', order: 7, active: true, description: 'Cuida a quienes más quieres' },
    { title: 'Contáctanos', url: 'https://katseguros.com/contacto', type: 'link', icon: 'contacto', order: 8, active: true, description: 'Estamos para ayudarte' },
    // Video
    { title: 'Conoce Kat Seguros', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', type: 'youtube', order: 9, active: true },
  ])

  console.log('Database seeded with sample data')
}

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB')
    await seedDatabase()
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })
