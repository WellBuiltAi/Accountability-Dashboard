import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskItem from './TaskItem'
import { getPhaseStats } from '../utils/calculations'

export default function PhaseBlock({ phase, phaseIndex, taskState, onToggle }) {
  const stats = getPhaseStats(taskState, phase)
  const isAllDone = stats.completed === stats.total
  const isPhaseZero = phaseIndex === 0
  const [isOpen, setIsOpen] = useState(false)

  const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <div className="border-b border-dark-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-dark-card/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-gold font-heading text-sm shrink-0">
            {isPhaseZero ? '✦' : phase.name}
          </span>
          <span className="text-sm font-body text-text-secondary truncate">
            {isPhaseZero ? 'FOUNDATION' : phase.label}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {isAllDone ? (
            <span className="text-[10px] font-body font-semibold tracking-wider bg-gold text-black px-2 py-0.5 rounded">
              DONE ✓
            </span>
          ) : (
            <>
              <span className="text-xs font-body text-text-secondary">
                {stats.completed}/{stats.total}
              </span>
              <div className="w-12 md:w-20 h-1.5 bg-dark-border rounded overflow-hidden">
                <motion.div
                  className="h-full bg-gold rounded"
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-xs font-body text-text-secondary w-8 text-right">
                {pct}%
              </span>
            </>
          )}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-text-secondary text-[10px]"
          >
            ▼
          </motion.span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-4 md:pl-8 pr-4">
              {phase.categories.map(category => {
                const catCompleted = category.tasks.filter(t => taskState[t.id]).length
                const streakTasks = category.tasks.filter(t => t.isStreak)
                const regularTasks = category.tasks.filter(t => !t.isStreak)

                return (
                  <div key={category.id} className="mb-3">
                    {category.name && (
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-body">
                          {category.name}
                        </h5>
                        <span className="text-[10px] text-text-muted font-body">
                          {catCompleted}/{category.tasks.length}
                        </span>
                      </div>
                    )}
                    {regularTasks.map(task => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        checked={!!taskState[task.id]}
                        onToggle={onToggle}
                        locked={isPhaseZero}
                      />
                    ))}
                    {streakTasks.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1 px-3">
                        {streakTasks.map((task, i) => (
                          <button
                            key={task.id}
                            onClick={() => onToggle(task.id)}
                            className={`w-7 h-7 rounded text-[10px] font-body font-semibold transition-all ${
                              taskState[task.id]
                                ? 'bg-gold text-black'
                                : 'bg-dark-border text-text-muted border border-dark-border'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
