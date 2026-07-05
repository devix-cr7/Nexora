import { type ReactNode } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  Wallet,
  Calendar,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/', label: 'الرئيسية', icon: LayoutDashboard },
  { to: '/projects', label: 'المشاريع', icon: FolderKanban },
  { to: '/clients', label: 'العملاء', icon: Users },
  { to: '/invoices', label: 'الفواتير', icon: FileText },
  { to: '/expenses', label: 'المصاريف', icon: Wallet },
  { to: '/calendar', label: 'المواعيد', icon: Calendar },
]

export default function Layout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-ink flex">
      {/* Sidebar — right side for RTL */}
      <aside className="w-64 border-l border-border bg-surface/50 flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brass" />
            <span className="font-semibold text-text tracking-tight">Ledger &amp; Ops</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 border-r-2 ${
                  isActive
                    ? 'bg-brass/10 text-brass border-brass'
                    : 'text-text-muted border-transparent hover:bg-surface-hover hover:text-text'
                }`
              }
            >
              <item.icon size={18} strokeWidth={1.75} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-border">
          <div className="px-3 py-2 mb-1">
            <p className="text-sm text-text truncate">{user?.user_metadata?.full_name || 'مستخدم'}</p>
            <p className="text-xs text-text-dim truncate figure" dir="ltr">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:bg-danger/10 hover:text-danger transition-colors duration-300"
          >
            <LogOut size={18} strokeWidth={1.75} />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-6xl mx-auto px-8 py-8">{children}</div>
      </motion.main>
    </div>
  )
}
