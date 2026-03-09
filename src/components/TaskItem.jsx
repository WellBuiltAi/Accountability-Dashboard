import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TaskItem({ task, checked, onToggle, locked }) {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <div>
      <motion.div
        className={`flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors hover:bg-dark-border/50 ${
          checked ? 'opacity-50' : ''
        }`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: checked ? 0.5 : 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={() => !locked && onToggle(task.id)}
          disabled={locked}
        />
        <span
          className={`flex-1 text-sm font-body ${
            checked ? 'line-through text-text-muted' : 'text-text-primary'
          } ${task.detail ? 'cursor-pointer' : ''}`}
          onClick={() => task.detail && setShowDetail(!showDetail)}
        >
          {task.label}
          {task.detail && (
            <span className="text-text-muted text-xs ml-1.5 select-none">
              {showDetail ? '▾' : '▸'}
            </span>
          )}
        </span>
        <span className="text-xs font-body text-text-secondary shrink-0 ml-2 bg-olive/30 px-2 py-0.5 rounded">
          {task.weight}%
        </span>
      </motion.div>

      <AnimatePresence>
        {showDetail && task.detail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-text-secondary font-body pl-10 pr-3 pb-2 leading-relaxed">
              {task.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
