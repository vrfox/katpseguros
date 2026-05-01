import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaPlus, FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'

const emptyForm = { title: '', url: '', type: 'link', icon: '', description: '', active: true }

export default function AdminPanel() {
  const [links, setLinks] = useState([])
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [addForm, setAddForm] = useState(emptyForm)
  const [showAddForm, setShowAddForm] = useState(false)
  const [profileEdit, setProfileEdit] = useState(false)
  const [profileForm, setProfileForm] = useState({})

  const fetchData = async () => {
    try {
      const [linksRes, profileRes] = await Promise.all([
        axios.get('/api/links/all'),
        axios.get('/api/profile')
      ])
      setLinks(linksRes.data)
      setProfile(profileRes.data)
      setProfileForm(profileRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleToggleActive = async (link) => {
    try {
      const res = await axios.put(`/api/links/${link._id}`, { ...link, active: !link.active })
      setLinks(links.map(l => l._id === link._id ? res.data : l))
    } catch (err) { console.error(err) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este enlace?')) return
    try {
      await axios.delete(`/api/links/${id}`)
      setLinks(links.filter(l => l._id !== id))
    } catch (err) { console.error(err) }
  }

  const handleEditSave = async (id) => {
    try {
      const res = await axios.put(`/api/links/${id}`, editForm)
      setLinks(links.map(l => l._id === id ? res.data : l))
      setEditingId(null)
    } catch (err) { console.error(err) }
  }

  const handleAdd = async () => {
    try {
      const res = await axios.post('/api/links', { ...addForm, order: links.length })
      setLinks([...links, res.data])
      setAddForm(emptyForm)
      setShowAddForm(false)
    } catch (err) { console.error(err) }
  }

  const handleReorder = async (index, direction) => {
    const newLinks = [...links]
    const swapIdx = direction === 'up' ? index - 1 : index + 1
    if (swapIdx < 0 || swapIdx >= newLinks.length) return
    ;[newLinks[index], newLinks[swapIdx]] = [newLinks[swapIdx], newLinks[index]]
    const updated = newLinks.map((l, i) => ({ ...l, order: i }))
    setLinks(updated)
    try {
      await axios.put('/api/links/reorder', updated.map(l => ({ id: l._id, order: l.order })))
    } catch (err) { console.error(err) }
  }

  const handleProfileSave = async () => {
    try {
      const res = await axios.put('/api/profile', profileForm)
      setProfile(res.data)
      setProfileEdit(false)
    } catch (err) { console.error(err) }
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-64">
      <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-brand-gold font-serif">Perfil de Marca</h2>
          {!profileEdit ? (
            <button onClick={() => setProfileEdit(true)} className="btn-outline-gold text-sm py-1.5 px-4">
              <FaEdit className="inline mr-1.5" />Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleProfileSave} className="btn-gold text-sm py-1.5 px-4"><FaCheck className="inline mr-1" />Guardar</button>
              <button onClick={() => setProfileEdit(false)} className="btn-outline-gold text-sm py-1.5 px-4"><FaTimes className="inline mr-1" />Cancelar</button>
            </div>
          )}
        </div>
        {profileEdit ? (
          <div className="grid gap-3">
            <input className="admin-input" placeholder="Nombre" value={profileForm.name || ''} onChange={e => setProfileForm({...profileForm, name: e.target.value})} />
            <textarea className="admin-input resize-none" rows={2} placeholder="Bio" value={profileForm.bio || ''} onChange={e => setProfileForm({...profileForm, bio: e.target.value})} />
            <input className="admin-input" placeholder="URL del Avatar" value={profileForm.avatarUrl || ''} onChange={e => setProfileForm({...profileForm, avatarUrl: e.target.value})} />
          </div>
        ) : (
          <div className="space-y-1">
            <p className="font-semibold text-white">{profile?.name}</p>
            <p className="text-brand-silver/70 text-sm">{profile?.bio}</p>
          </div>
        )}
      </div>

      {/* Links Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-brand-gold font-serif">Enlaces ({links.length})</h2>
          <button onClick={() => setShowAddForm(!showAddForm)} className="btn-gold text-sm py-1.5 px-4">
            <FaPlus className="inline mr-1.5" />Agregar
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="mb-6 p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20 space-y-3">
            <h3 className="text-sm font-semibold text-brand-gold">Nuevo Enlace</h3>
            <div className="grid grid-cols-2 gap-3">
              <input className="admin-input col-span-2" placeholder="Título *" value={addForm.title} onChange={e => setAddForm({...addForm, title: e.target.value})} />
              <input className="admin-input col-span-2" placeholder="URL *" value={addForm.url} onChange={e => setAddForm({...addForm, url: e.target.value})} />
              <select className="admin-input" value={addForm.type} onChange={e => setAddForm({...addForm, type: e.target.value})}>
                <option value="link">Enlace</option>
                <option value="social">Red Social</option>
                <option value="youtube">YouTube</option>
                <option value="vimeo">Vimeo</option>
              </select>
              <input className="admin-input" placeholder="Icono (ej: instagram)" value={addForm.icon} onChange={e => setAddForm({...addForm, icon: e.target.value})} />
              <input className="admin-input col-span-2" placeholder="Descripción (opcional)" value={addForm.description} onChange={e => setAddForm({...addForm, description: e.target.value})} />
            </div>
            <div className="flex gap-2">
              <button onClick={handleAdd} className="btn-gold text-sm py-1.5 px-4"><FaCheck className="inline mr-1" />Crear</button>
              <button onClick={() => { setShowAddForm(false); setAddForm(emptyForm) }} className="btn-outline-gold text-sm py-1.5 px-4"><FaTimes className="inline mr-1" />Cancelar</button>
            </div>
          </div>
        )}

        {/* Links List */}
        <div className="space-y-2">
          {links.map((link, index) => (
            <div key={link._id} className={`rounded-xl border transition-colors duration-200 ${link.active ? 'border-white/10 bg-white/3' : 'border-white/5 bg-white/1 opacity-60'}`}>
              {editingId === link._id ? (
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input className="admin-input col-span-2" placeholder="Título" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                    <input className="admin-input col-span-2" placeholder="URL" value={editForm.url} onChange={e => setEditForm({...editForm, url: e.target.value})} />
                    <select className="admin-input" value={editForm.type} onChange={e => setEditForm({...editForm, type: e.target.value})}>
                      <option value="link">Enlace</option>
                      <option value="social">Red Social</option>
                      <option value="youtube">YouTube</option>
                      <option value="vimeo">Vimeo</option>
                    </select>
                    <input className="admin-input" placeholder="Icono" value={editForm.icon || ''} onChange={e => setEditForm({...editForm, icon: e.target.value})} />
                    <input className="admin-input col-span-2" placeholder="Descripción" value={editForm.description || ''} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditSave(link._id)} className="btn-gold text-sm py-1.5 px-4"><FaCheck className="inline mr-1" />Guardar</button>
                    <button onClick={() => setEditingId(null)} className="btn-outline-gold text-sm py-1.5 px-4"><FaTimes className="inline mr-1" />Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <button onClick={() => handleReorder(index, 'up')} className="text-brand-silver/40 hover:text-brand-gold transition-colors p-0.5" disabled={index === 0}><FaArrowUp className="text-xs" /></button>
                    <button onClick={() => handleReorder(index, 'down')} className="text-brand-silver/40 hover:text-brand-gold transition-colors p-0.5" disabled={index === links.length - 1}><FaArrowDown className="text-xs" /></button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-white text-sm">{link.title}</span>
                    <p className="text-xs text-brand-silver/50 truncate">{link.url}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold/80 border border-brand-gold/20">{link.type}</span>
                  <div className="flex gap-1">
                    <button onClick={() => handleToggleActive(link)} title={link.active ? 'Desactivar' : 'Activar'} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-brand-silver/60 hover:text-brand-gold transition-all">
                      {link.active ? <FaEye className="text-xs" /> : <FaEyeSlash className="text-xs" />}
                    </button>
                    <button onClick={() => { setEditingId(link._id); setEditForm(link) }} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-brand-silver/60 hover:text-brand-gold transition-all">
                      <FaEdit className="text-xs" />
                    </button>
                    <button onClick={() => handleDelete(link._id)} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-brand-silver/60 hover:text-red-400 transition-all">
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Extra CSS for admin inputs */}
      <style>{`
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .admin-input:focus {
          border-color: rgba(201, 168, 76, 0.5);
        }
        .admin-input option {
          background: #1a2a4a;
          color: white;
        }
      `}</style>
    </div>
  )
}
