import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { backgroundTasks } from '../data/tasks'

export default function BackgroundTrack({ bgState, onToggle }) {
  const completed = backgroundTasks.filter(t => bgState[t.id]).length
  const [showDetail, setShowDetail] = useState({})

  return (
    <div className="mx-4 md:mx-8 mb-8 p-4 md:p-6 border border-olive/50 rounded-lg bg-olive/5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-heading text-xl md:text-2xl tracking-wide text-olive">
            V1 — LASIKGROWTH
          </h2>
          <p className="text-xs text-text-secondary font-body mt-1">
            Background track — not part of the 100%
          </p>
        </div>
        <span className="text-sm font-body text-text-secondary">
          {completed}/{backgroundTasks.length}
        </span>
      </div>
      <div className="space-y-1">
        {backgroundTasks.map(task => (
          <div key={task.id}>
            <label
              className={`flex items-center gap-3 py-2 px-3 rounded cursor-pointer transition-colors hover:bg-olive/10 ${
                bgState[task.id] ? 'opacity-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={!!bgState[task.id]}
                onChange={() => onToggle(task.id)}
              />
              <span
                className={`flex-1 text-sm font-body ${
                  bgState[task.id] ? 'line-through text-text-muted' : 'text-text-primary'
                } ${task.detail ? 'cursor-pointer' : ''}`}
                onClick={(e) => {
                  if (task.detail) {
                    e.preventDefault()
                    setShowDetail(prev => ({ ...prev, [task.id]: !prev[task.id] }))
                  }
                }}
              >
                {task.label}
                {task.detail && (
                  <span className="text-text-muted text-xs ml-1.5">
                    {showDetail[task.id] ? '▾' : '▸'}
                  </span>
                )}
              </span>
            </label>
            <AnimatePresence>
              {showDetail[task.id] && task.detail && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="text-xs text-text-secondary font-body pl-10 pr-3 pb-2 overflow-hidden"
                >
                  {task.detail}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
