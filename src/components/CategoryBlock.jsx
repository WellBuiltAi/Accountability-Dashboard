import { motion } from 'framer-motion'
import TaskItem from './TaskItem'

export default function CategoryBlock({ category, taskState, onToggle, locked }) {
  const completed = category.tasks.filter(t => taskState[t.id]).length
  const total = category.tasks.length
  const isAllDone = completed === total

  const streakTasks = category.tasks.filter(t => t.isStreak)
  const regularTasks = category.tasks.filter(t => !t.isStreak)

  return (
    <motion.div
      className="mb-6"
      animate={isAllDone ? { borderColor: 'rgba(178, 133, 27, 0.3)' } : {}}
    >
      {/* Category header */}
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs uppercase tracking-[0.2em] text-text-secondary font-body font-semibold">
          {category.name}
        </h4>
        <span className={`text-xs font-body ${isAllDone ? 'text-gold' : 'text-text-secondary'}`}>
          {completed}/{total}
        </span>
      </div>

      {/* Goal statement */}
      {category.goal && (
        <p className="text-xs text-text-muted font-body mb-3 italic">
          {category.goal}
        </p>
      )}

      {/* Regular tasks */}
      {regularTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          checked={!!taskState[task.id]}
          onToggle={onToggle}
          locked={locked}
        />
      ))}

      {/* Streak grid */}
      {streakTasks.length > 0 && (
        <div className="mt-2 px-3">
          <div className="flex flex-wrap gap-1.5">
            {streakTasks.map((task, i) => (
              <button
                key={task.id}
                onClick={() => onToggle(task.id)}
                className={`w-8 h-8 md:w-9 md:h-9 rounded text-xs font-body font-semibold transition-all ${
                  taskState[task.id]
                    ? 'bg-gold text-black'
                    : 'bg-dark-border text-text-secondary hover:border-gold border border-dark-border'
                }`}
                title={task.label}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Completion flash */}
      {isAllDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gold font-body font-semibold mt-2 px-3"
        >
          ✓ COMPLETE
        </motion.div>
      )}
    </motion.div>
  )
}
