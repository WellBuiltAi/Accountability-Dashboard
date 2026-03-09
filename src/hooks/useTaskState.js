import { useState, useCallback, useEffect, useRef } from 'react'
import { phases, backgroundTasks } from '../data/tasks'

const STORAGE_KEY = 'wellbuilt-tasks'
const BG_STORAGE_KEY = 'wellbuilt-bg-tasks'
const DAILY_LOG_KEY = 'wellbuilt-daily-log'
const API_URL = '/api/state'

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

async function saveToBackend(taskState, bgState, dailyLog) {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskState, bgState, dailyLog }),
    })
  } catch (err) {
    console.warn('[Backend] Save failed:', err.message)
  }
}

async function loadFromBackend() {
  try {
    const res = await fetch(API_URL)
    if (res.ok) return await res.json()
  } catch (err) {
    console.warn('[Backend] Load failed:', err.message)
  }
  return null
}

export function useTaskState() {
  const [taskState, setTaskState] = useState(getInitialTaskState)
  const [bgState, setBgState] = useState(getInitialBgState)
  const [dailyLog, setDailyLog] = useState(getInitialDailyLog)

  const saveTimer = useRef(null)
  const isHydrating = useRef(false)

  // On mount: pull from backend and merge (backend wins for conflicts)
  useEffect(() => {
    loadFromBackend().then(remote => {
      if (!remote) return
      isHydrating.current = true

      setTaskState(prev => {
        const merged = { ...prev, ...remote.taskState }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
        return merged
      })
      setBgState(prev => {
        const merged = { ...prev, ...remote.bgState }
        localStorage.setItem(BG_STORAGE_KEY, JSON.stringify(merged))
        return merged
      })
      setDailyLog(prev => {
        const merged = { ...prev, ...remote.dailyLog }
        localStorage.setItem(DAILY_LOG_KEY, JSON.stringify(merged))
        return merged
      })

      // Give state time to settle before enabling saves
      setTimeout(() => { isHydrating.current = false }, 300)
    })
  }, [])

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

  // Debounced save to backend (800ms after last change)
  useEffect(() => {
    if (isHydrating.current) return

    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      saveToBackend(taskState, bgState, dailyLog)
    }, 800)

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [taskState, bgState, dailyLog])

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
