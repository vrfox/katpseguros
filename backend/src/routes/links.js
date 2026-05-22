const express = require('express')
const router = express.Router()
const Link = require('../models/Link')

// GET /api/links - active links sorted by order
router.get('/', async (req, res) => {
  try {
    const links = await Link.find({ active: true }).sort({ order: 1 })
    res.json(links)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/links/all - all links (admin)
router.get('/all', async (req, res) => {
  try {
    const links = await Link.find().sort({ order: 1 })
    res.json(links)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/links - create new link
router.post('/', async (req, res) => {
  try {
    const { title, url, type, icon, order, active, description } = req.body
    const link = new Link({ title, url, type, icon, order, active, description })
    await link.save()
    res.status(201).json(link)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT /api/links/reorder - must be defined BEFORE /:id
router.put('/reorder', async (req, res) => {
  try {
    const updates = req.body // [{id, order}]
    await Promise.all(
      updates.map(({ id, order }) => Link.findByIdAndUpdate(id, { order }))
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/links/:id - update link
router.put('/:id', async (req, res) => {
  try {
    const { title, url, type, icon, order, active, description } = req.body
    const update = {}
    if (title !== undefined) update.title = title
    if (url !== undefined) update.url = url
    if (type !== undefined) update.type = type
    if (icon !== undefined) update.icon = icon
    if (order !== undefined) update.order = order
    if (active !== undefined) update.active = active
    if (description !== undefined) update.description = description
    const link = await Link.findByIdAndUpdate(req.params.id, { $set: update }, { new: true, runValidators: true })
    if (!link) return res.status(404).json({ error: 'Link not found' })
    res.json(link)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/links/:id - delete link
router.delete('/:id', async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id)
    if (!link) return res.status(404).json({ error: 'Link not found' })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
