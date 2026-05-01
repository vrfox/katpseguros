import { FaCar, FaHome, FaShieldAlt } from 'react-icons/fa'

export default function ProfileHeader({ profile }) {
  return (
    <div className="flex flex-col items-center text-center mb-8 animate-fade-in">
      {/* Avatar */}
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full border-2 border-brand-gold shadow-lg shadow-brand-gold/30 overflow-hidden bg-brand-navy-mid flex items-center justify-center">
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-gradient-gold font-serif">KS</span>
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-brand-gold rounded-full flex items-center justify-center">
          <FaShieldAlt className="text-brand-navy text-xs" />
        </div>
      </div>

      {/* Name */}
      <h1 className="text-3xl font-bold font-serif text-gradient-gold mb-2">
        {profile?.name || 'Kat Seguros'}
      </h1>

      {/* Bio */}
      <p className="text-brand-silver text-sm max-w-xs leading-relaxed mb-4">
        {profile?.bio || 'Tu seguro de confianza'}
      </p>

      {/* Insurance icons */}
      <div className="flex gap-4 text-brand-gold/70">
        <div className="flex flex-col items-center gap-1">
          <FaCar className="text-lg" />
          <span className="text-xs text-brand-silver/60">Auto</span>
        </div>
        <div className="w-px bg-brand-gold/20 self-stretch" />
        <div className="flex flex-col items-center gap-1">
          <FaHome className="text-lg" />
          <span className="text-xs text-brand-silver/60">Hogar</span>
        </div>
        <div className="w-px bg-brand-gold/20 self-stretch" />
        <div className="flex flex-col items-center gap-1">
          <FaShieldAlt className="text-lg" />
          <span className="text-xs text-brand-silver/60">Vida</span>
        </div>
      </div>
    </div>
  )
}
