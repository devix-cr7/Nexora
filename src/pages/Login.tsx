import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) setError(error)
    else navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brass" />
            <span className="text-text-dim text-xs tracking-widest uppercase font-mono">Ledger &amp; Ops</span>
          </div>
          <h1 className="text-2xl font-semibold text-text">سجّل دخولك إلى حسابك</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface border border-border rounded-2xl p-8 space-y-5"
        >
          {error && (
            <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-text-muted mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ink border border-border rounded-lg px-4 py-3 text-text outline-none focus:border-brass transition-colors duration-300"
              placeholder="you@example.com"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-2">كلمة المرور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-ink border border-border rounded-lg px-4 py-3 text-text outline-none focus:border-brass transition-colors duration-300"
              placeholder="••••••••"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brass text-ink font-semibold rounded-lg py-3 transition-all duration-300 hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          لا تملك حساباً؟{' '}
          <Link to="/signup" className="text-brass hover:underline">
            سجّل الآن
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
