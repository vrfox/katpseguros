import { useState, useEffect } from 'react'
import axios from 'axios'
import ProfileHeader from '../components/ProfileHeader'
import LinkCard from '../components/LinkCard'
import SocialLinks from '../components/SocialLinks'
import { FaCog } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function LinktreePage() {
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, linksRes] = await Promise.all([
          axios.get('/api/profile'),
          axios.get('/api/links')
        ])
        setProfile(profileRes.data)
        setLinks(linksRes.data)
      } catch (err) {
        setError('No se pudo cargar la información. Por favor intenta más tarde.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const nonSocialLinks = links.filter(l => l.type !== 'social')

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-navy flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-brand-silver/60 text-sm">Cargando...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-navy flex items-center justify-center p-4">
        <div className="glass-card p-8 text-center max-w-sm">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-outline-gold">Reintentar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-navy relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-gold/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-gold/3 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-gold/3 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 py-12 pb-20">
        <ProfileHeader profile={profile} />

        {/* Links */}
        <div className="space-y-3">
          {nonSocialLinks.map((link, i) => (
            <LinkCard key={link._id} link={link} index={i} />
          ))}
        </div>

        {/* Social Links */}
        <SocialLinks links={links} />

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-brand-silver/30 text-xs">© 2024 Kat Seguros</p>
          <p className="text-brand-silver/20 text-xs mt-1">Todos los derechos reservados</p>
        </div>
      </div>

      {/* Admin button */}
      <Link to="/admin" className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-brand-navy-mid border border-brand-gold/20 flex items-center justify-center text-brand-silver/40 hover:text-brand-gold hover:border-brand-gold/50 transition-all duration-300 z-50">
        <FaCog className="text-sm" />
      </Link>
    </div>
  )
}
