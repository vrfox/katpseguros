import { Link } from 'react-router-dom'
import AdminPanel from '../components/AdminPanel'
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-navy">
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-brand-silver/60 hover:text-brand-gold transition-colors duration-200 text-sm">
            <FaArrowLeft className="text-xs" />
            Ver Linktree
          </Link>
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-brand-gold text-sm" />
            <h1 className="font-serif font-bold text-gradient-gold text-xl">Panel de Administración</h1>
          </div>
          <div className="w-20" />
        </div>

        <AdminPanel />
      </div>
    </div>
  )
}
