export default function VideoEmbed({ url, type, title }) {
  const getEmbedUrl = () => {
    if (type === 'youtube') {
      let videoId = ''
      const watchMatch = url.match(/[?&]v=([^&]+)/)
      const shortMatch = url.match(/youtu\.be\/([^?]+)/)
      const embedMatch = url.match(/youtube\.com\/embed\/([^?]+)/)
      if (watchMatch) videoId = watchMatch[1]
      else if (shortMatch) videoId = shortMatch[1]
      else if (embedMatch) videoId = embedMatch[1]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }
    if (type === 'vimeo') {
      const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
      return match ? `https://player.vimeo.com/video/${match[1]}` : null
    }
    return null
  }

  const embedUrl = getEmbedUrl()

  if (!embedUrl) return <div className="text-brand-silver/50 text-sm text-center p-4">Video no disponible</div>

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="text-brand-silver/70 text-xs flex-1 text-center">{title || 'Video'}</span>
      </div>
      {/* 16:9 responsive iframe */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={title || 'Video embed'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  )
}
