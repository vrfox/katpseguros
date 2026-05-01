import { FaExternalLinkAlt, FaCar, FaHome, FaShieldAlt, FaPhone, FaEnvelope, FaFileAlt, FaGlobe } from 'react-icons/fa'
import VideoEmbed from './VideoEmbed'

const typeIcons = {
  auto: FaCar,
  hogar: FaHome,
  vida: FaShieldAlt,
  contacto: FaPhone,
  email: FaEnvelope,
  cotiza: FaFileAlt,
  default: FaGlobe,
}

function getIcon(link) {
  if (link.icon) {
    const lower = link.icon.toLowerCase()
    for (const [key, Icon] of Object.entries(typeIcons)) {
      if (lower.includes(key)) return Icon
    }
  }
  const titleLower = link.title?.toLowerCase() || ''
  for (const [key, Icon] of Object.entries(typeIcons)) {
    if (titleLower.includes(key)) return Icon
  }
  return typeIcons.default
}

export default function LinkCard({ link, index }) {
  if (link.type === 'youtube' || link.type === 'vimeo') {
    return (
      <div className="w-full animate-slide-up" style={{ animationDelay: `${index * 80}ms`, opacity: 0 }}>
        <VideoEmbed url={link.url} type={link.type} title={link.title} />
      </div>
    )
  }

  const Icon = getIcon(link)

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group w-full glass-card-hover flex items-center gap-4 px-5 py-4 animate-slide-up"
      style={{ animationDelay: `${index * 80}ms`, opacity: 0 }}
    >
      <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-all duration-300 flex-shrink-0">
        <Icon className="text-sm" />
      </div>
      <div className="flex-1 text-center pr-6">
        <span className="font-semibold text-white group-hover:text-brand-gold transition-colors duration-300">
          {link.title}
        </span>
        {link.description && (
          <p className="text-xs text-brand-silver/60 mt-0.5">{link.description}</p>
        )}
      </div>
      <FaExternalLinkAlt className="text-brand-silver/30 group-hover:text-brand-gold/50 text-xs flex-shrink-0 transition-colors duration-300" />
    </a>
  )
}
