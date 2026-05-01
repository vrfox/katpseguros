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
    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: req.body },
      { upsert: true, new: true }
    )
    res.json(profile)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
