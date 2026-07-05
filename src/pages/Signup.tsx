import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signUp(email, password, fullName)
    setLoading(false)
    if (error) setError(error)
    else setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-brass/10 border border-brass/30 flex items-center justify-center mx-auto mb-5">
            <span className="w-2 h-2 rounded-full bg-brass" />
          </div>
          <h2 className="text-xl font-semibold text-text mb-2">تحقق من بريدك الإلكتروني</h2>
          <p className="text-text-muted text-sm leading-relaxed">
            أرسلنا رابط تأكيد إلى <span className="text-text figure" dir="ltr">{email}</span>. افتح الرابط من نفس الجهاز لتفعيل حسابك، ثم عد إلى صفحة تسجيل الدخول.
          </p>
          <Link
            to="/login"
            className="inline-block mt-6 text-brass hover:underline text-sm"
          >
            الذهاب لتسجيل الدخول
          </Link>
        </motion.div>
      </div>
    )
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
          <h1 className="text-2xl font-semibold text-text">أنشئ حسابك</h1>
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
            <label className="block text-sm text-text-muted mb-2">الاسم الكامل</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-ink border border-border rounded-lg px-4 py-3 text-text outline-none focus:border-brass transition-colors duration-300"
              placeholder="اسمك"
            />
          </div>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-ink border border-border rounded-lg px-4 py-3 text-text outline-none focus:border-brass transition-colors duration-300"
              placeholder="6 أحرف على الأقل"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brass text-ink font-semibold rounded-lg py-3 transition-all duration-300 hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
          </button>
        </form>

        <p className="text-center text-text-muted text-sm mt-6">
          تملك حساباً؟{' '}
          <Link to="/login" className="text-brass hover:underline">
            سجّل الدخول
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
