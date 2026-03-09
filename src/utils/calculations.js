import { DEADLINE, getAllTasks, getPhaseTasks, getDays, getTodayDayIndex } from '../data/tasks'

export function getDaysRemaining() {
  const now = new Date()
  const end = new Date(DEADLINE + 'T23:59:59')
  const diff = end - now
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function getOverallPercent(taskState) {
  const tasks = getAllTasks()
  const completedWeight = tasks.reduce((sum, task) => {
    return sum + (taskState[task.id] ? task.weight : 0)
  }, 0)
  const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0)
  return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0
}

export function getPhaseStats(taskState, phase) {
  const tasks = getPhaseTasks(phase)
  const completed = tasks.filter(t => taskState[t.id]).length
  const total = tasks.length
  return { completed, total }
}

export function getDailyMinimum(taskState) {
  const tasks = getAllTasks()
  const remaining = tasks.filter(t => !taskState[t.id]).length
  const daysLeft = getDaysRemaining()
  if (daysLeft <= 0) return remaining
  return Math.ceil(remaining / daysLeft)
}

export function getTasksLeftToday(taskState) {
  const days = getDays()
  const todayIdx = getTodayDayIndex()
  const todayPhase = days[todayIdx]
  if (!todayPhase) return 0
  const tasks = getPhaseTasks(todayPhase)
  return tasks.filter(t => !taskState[t.id]).length
}

export function getStreak(dailyLog) {
  if (!dailyLog || Object.keys(dailyLog).length === 0) return 0

  const today = new Date()
  let streak = 0
  let checkDate = new Date(today)

  const todayKey = formatDate(checkDate)
  if (dailyLog[todayKey]) {
    streak = 1
    checkDate.setDate(checkDate.getDate() - 1)
  }

  while (true) {
    const key = formatDate(checkDate)
    if (dailyLog[key]) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

export function formatDate(date) {
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

export function getTodayKey() {
  return formatDate(new Date())
}
