import { motion, AnimatePresence } from 'framer-motion'
import CategoryBlock from './CategoryBlock'
import { getDays, getPhaseTasks, phases } from '../data/tasks'
import { rewards, isRewardUnlocked } from '../data/rewards'

export default function DayView({ dayIndex, setDayIndex, taskState, onToggle }) {
  const days = getDays()
  const currentDay = days[dayIndex]
  const canGoBack = dayIndex > 0
  const canGoForward = dayIndex < days.length - 1

  // Check if all tasks for this day are done
  const dayTasks = getPhaseTasks(currentDay)
  const dayCompleted = dayTasks.every(t => taskState[t.id])
  const dayCompletedCount = dayTasks.filter(t => taskState[t.id]).length

  // Find reward tied to this day
  const dayReward = rewards.find(r => r.trigger === currentDay.id)
  const dayRewardUnlocked = dayReward && isRewardUnlocked(dayReward, taskState, phases)
  // Also check for single-task rewards in this day's tasks
  const taskRewards = rewards.filter(r => {
    const allTaskIds = dayTasks.map(t => t.id)
    return allTaskIds.includes(r.trigger) && isRewardUnlocked(r, taskState, phases)
  })

  return (
    <div className="px-4 md:px-8 py-6">
      {/* Day navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => canGoBack && setDayIndex(dayIndex - 1)}
          className={`text-sm font-body transition-colors ${
            canGoBack ? 'text-text-secondary hover:text-gold cursor-pointer' : 'text-text-muted/30 cursor-default'
          }`}
          disabled={!canGoBack}
        >
          ← Yesterday
        </button>

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-heading text-white tracking-wider">
            {currentDay.name}
          </h2>
          <p className="text-xs text-text-secondary font-body">{currentDay.label}</p>
        </div>

        <button
          onClick={() => canGoForward && setDayIndex(dayIndex + 1)}
          className={`text-sm font-body transition-colors ${
            canGoForward ? 'text-text-secondary hover:text-gold cursor-pointer' : 'text-text-muted/30 cursor-default'
          }`}
          disabled={!canGoForward}
        >
          Tomorrow →
        </button>
      </div>

      {/* Day progress summary */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 bg-dark-border rounded overflow-hidden">
          <motion.div
            className="h-full bg-gold rounded"
            animate={{ width: `${dayTasks.length > 0 ? (dayCompletedCount / dayTasks.length) * 100 : 0}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-xs text-text-secondary font-body shrink-0">
          {dayCompletedCount}/{dayTasks.length}
        </span>
      </div>

      {/* Day complete badge */}
      <AnimatePresence>
        {dayCompleted && dayTasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6 py-3 border border-gold/30 rounded-lg bg-gold/5"
          >
            <span className="text-lg font-heading text-gold tracking-wider">
              DAY COMPLETE ✓
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward unlocked banner */}
      <AnimatePresence>
        {dayRewardUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 border border-gold/40 rounded-lg bg-gold/5 gold-glow"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{dayReward.emoji}</span>
              <div>
                <p className="text-xs text-gold font-body font-semibold tracking-wider">REWARD UNLOCKED</p>
                <p className="text-sm font-heading text-white tracking-wide">{dayReward.name}</p>
                <p className="text-xs text-text-secondary font-body">{dayReward.reward}</p>
              </div>
            </div>
          </motion.div>
        )}
        {taskRewards.map(r => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 border border-gold/40 rounded-lg bg-gold/5 gold-glow"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{r.emoji}</span>
              <div>
                <p className="text-xs text-gold font-body font-semibold tracking-wider">REWARD UNLOCKED</p>
                <p className="text-sm font-heading text-white tracking-wide">{r.name}</p>
                <p className="text-xs text-text-secondary font-body">{r.reward}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Categories */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDay.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {currentDay.categories.map(category => (
            <CategoryBlock
              key={category.id}
              category={category}
              taskState={taskState}
              onToggle={onToggle}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
