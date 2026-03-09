import { motion } from 'framer-motion'
import { getDaysRemaining } from '../utils/calculations'

export default function Header({ percent, tasksLeftToday }) {
  const daysLeft = getDaysRemaining()
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-dark-border">
      <div className="max-w-5xl mx-auto px-4 py-3">
        {/* Top row: logo + stats */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading tracking-[0.1em] text-white leading-none">
              WELLBUILT AI
            </h1>
            <p className="text-[10px] md:text-xs tracking-[0.25em] text-text-secondary uppercase">
              Road to First Client
            </p>
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-right">
            <div>
              <p className="text-2xl md:text-3xl font-heading text-gold leading-none">{daysLeft}</p>
              <p className="text-[10px] tracking-[0.15em] text-text-secondary uppercase">Days Left</p>
            </div>
            <div className="hidden md:block text-xs text-text-secondary font-body">
              {today}
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-heading text-white leading-none">{tasksLeftToday}</p>
              <p className="text-[10px] tracking-[0.15em] text-text-secondary uppercase">Tasks Today</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-6 md:h-7 bg-dark-border rounded overflow-hidden gold-glow">
          <motion.div
            className="h-full bg-gold rounded"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ boxShadow: '0 0 20px rgba(178, 133, 27, 0.4)' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm md:text-lg font-heading text-white drop-shadow-lg">
              {percent}%
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
