import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const stats = [
  { label: 'المشاريع النشطة', value: '0' },
  { label: 'الفواتير المعلقة', value: '0' },
  { label: 'إجمالي المصاريف', value: '0' },
  { label: 'العملاء', value: '0' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const firstName = (user?.user_metadata?.full_name as string | undefined)?.split(' ')[0]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold text-text mb-1">
          مرحباً{firstName ? ` ${firstName}` : ''} 👋
        </h1>
        <p className="text-text-muted text-sm mb-8">هذي نظرة سريعة على أعمالك اليوم</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="bg-surface border border-border rounded-xl p-5"
          >
            <p className="text-text-dim text-xs mb-2">{s.label}</p>
            <p className="text-2xl font-semibold text-text figure">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl p-10 text-center">
        <p className="text-text-muted text-sm">
          هذا القسم لسا بمرحلة البناء — الوحدات (المشاريع، الفواتير، المصاريف...) توصل بالمراحل الجاية.
        </p>
      </div>
    </div>
  )
}
