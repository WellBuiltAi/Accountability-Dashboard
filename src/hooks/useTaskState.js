import { useState, useCallback, useEffect, useRef } from 'react'
import { phases, backgroundTasks } from '../data/tasks'
import { saveDashboardState, subscribeToDashboard } from '../services/firestore'
import { isFirebaseEnabled } from '../firebase'

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

  // Track whether updates are from Firestore (to avoid echo saves)
  const isRemoteUpdate = useRef(false)
  // Debounce timer for Firestore saves
  const saveTimer = useRef(null)

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskState))
  }, [taskState])

  useEffect(() => {
    localStorage.setItem(BG_STORAGE_KEY, JSON.stringify(bgState))
  }, [bgState])

  useEffect(() => {
    localStorage.setItem(DAILY_LOG_KEY, JSON.stringify(dailyLog))
  }, [dailyLog])

  // Debounced save to Firestore (500ms after last change)
  useEffect(() => {
    if (!isFirebaseEnabled()) return
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false
      return
    }

    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      saveDashboardState(taskState, bgState, dailyLog)
    }, 500)

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [taskState, bgState, dailyLog])

  // Subscribe to Firestore real-time updates (cross-device sync)
  useEffect(() => {
    if (!isFirebaseEnabled()) return

    const unsubscribe = subscribeToDashboard((remote) => {
      if (!remote) return

      // Only update if remote data is different from local
      isRemoteUpdate.current = true

      setTaskState(prev => {
        const merged = { ...prev, ...remote.taskState }
        return JSON.stringify(merged) !== JSON.stringify(prev) ? merged : prev
      })
      setBgState(prev => {
        const merged = { ...prev, ...remote.bgState }
        return JSON.stringify(merged) !== JSON.stringify(prev) ? merged : prev
      })
      setDailyLog(prev => {
        const merged = { ...prev, ...remote.dailyLog }
        return JSON.stringify(merged) !== JSON.stringify(prev) ? merged : prev
      })
    })

    return unsubscribe
  }, [])

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
