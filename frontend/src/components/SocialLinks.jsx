import { FaInstagram, FaTwitter, FaFacebook, FaWhatsapp, FaLinkedin, FaYoutube, FaTelegram, FaTiktok } from 'react-icons/fa'

const iconMap = {
  instagram: FaInstagram,
  twitter: FaTwitter,
  facebook: FaFacebook,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  telegram: FaTelegram,
  tiktok: FaTiktok,
}

export default function SocialLinks({ links }) {
  const socialLinks = links?.filter(l => l.type === 'social' && l.active) || []
  if (socialLinks.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in">
      {socialLinks.map((link, i) => {
        const Icon = iconMap[link.icon?.toLowerCase()] || FaInstagram
        return (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-brand-silver hover:text-brand-gold hover:border-brand-gold/50 hover:shadow-md hover:shadow-brand-gold/20 transition-all duration-300 hover:scale-110"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <Icon className="text-lg" />
          </a>
        )
      })}
    </div>
  )
}
