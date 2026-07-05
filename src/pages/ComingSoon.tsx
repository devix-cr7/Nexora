import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'

export default function ComingSoon({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-14 h-14 rounded-xl bg-surface border border-border flex items-center justify-center mb-5">
        <Icon size={22} strokeWidth={1.5} className="text-brass" />
      </div>
      <h2 className="text-lg font-semibold text-text mb-2">{title}</h2>
      <p className="text-text-muted text-sm max-w-sm">
        هذا القسم قيد البناء حالياً، وبيوصل بمرحلة قادمة من التطوير.
      </p>
    </motion.div>
  )
}
