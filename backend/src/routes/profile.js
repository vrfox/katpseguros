const express = require('express')
const router = express.Router()
const Profile = require('../models/Profile')

// GET /api/profile
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      { $setOnInsert: { name: 'Kat Seguros', bio: 'Tu seguro de confianza - Autos, Hogar y Vida', theme: 'dark' } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    res.json(profile)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/profile
router.put('/', async (req, res) => {
  try {
    const { name, bio, avatarUrl, theme } = req.body
    const update = {}
    if (name !== undefined) update.name = name
    if (bio !== undefined) update.bio = bio
    if (avatarUrl !== undefined) update.avatarUrl = avatarUrl
    if (theme !== undefined) update.theme = theme
    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: update },
      { upsert: true, new: true, runValidators: true }
    )
    res.json(profile)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router
