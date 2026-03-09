import { useState, useCallback, useEffect } from 'react'
import { phases, backgroundTasks } from '../data/tasks'

const STORAGE_KEY = 'wellbuilt-tasks'
const BG_STORAGE_KEY = 'wellbuilt-bg-tasks'
const DAILY_LOG_KEY = 'wellbuilt-daily-log'

function getInitialTaskState() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // corrupted — fall through to seed
    }
  }

  // First load: seed Phase 0 as completed
  const initial = {}
  phases.forEach(phase => {
    phase.categories.forEach(cat => {
      cat.tasks.forEach(task => {
        if (task.preCompleted) {
          initial[task.id] = true
        }
      })
    })
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
  return initial
}

function getInitialBgState() {
  const saved = localStorage.getItem(BG_STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // corrupted
    }
  }
  return {}
}

function getInitialDailyLog() {
  const saved = localStorage.getItem(DAILY_LOG_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      // corrupted
    }
  }
  return {}
}

export function useTaskState() {
  const [taskState, setTaskState] = useState(getInitialTaskState)
  const [bgState, setBgState] = useState(getInitialBgState)
  const [dailyLog, setDailyLog] = useState(getInitialDailyLog)

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskState))
  }, [taskState])

  useEffect(() => {
    localStorage.setItem(BG_STORAGE_KEY, JSON.stringify(bgState))
  }, [bgState])

  useEffect(() => {
    localStorage.setItem(DAILY_LOG_KEY, JSON.stringify(dailyLog))
  }, [dailyLog])

  const toggleTask = useCallback((taskId) => {
    setTaskState(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }, [])

  const toggleBgTask = useCallback((taskId) => {
    setBgState(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }, [])

  const markDayComplete = useCallback((dateKey) => {
    setDailyLog(prev => ({
      ...prev,
      [dateKey]: !prev[dateKey],
    }))
  }, [])

  return {
    taskState,
    bgState,
    dailyLog,
    toggleTask,
    toggleBgTask,
    markDayComplete,
  }
}
