import { useState, useEffect } from 'react'
import Header from './components/Header'
import DayView from './components/DayView'
import DailyQuote from './components/DailyQuote'
import ClaritySection from './components/ClaritySection'
import PhaseBlock from './components/PhaseBlock'
import BackgroundTrack from './components/BackgroundTrack'
import RewardsPage from './components/RewardsPage'
import Confetti from './components/Confetti'
import { useTaskState } from './hooks/useTaskState'
import { getOverallPercent, getTasksLeftToday } from './utils/calculations'
import { phases, getTodayDayIndex } from './data/tasks'
import { rewards, isRewardUnlocked } from './data/rewards'

export default function App() {
  const { taskState, bgState, dailyLog, toggleTask, toggleBgTask, markDayComplete } = useTaskState()
  const percent = getOverallPercent(taskState)
  const tasksLeftToday = getTasksLeftToday(taskState)
  const [dayIndex, setDayIndex] = useState(getTodayDayIndex)
  const [showConfetti, setShowConfetti] = useState(false)
  const [prevPercent, setPrevPercent] = useState(percent)
  const [phaseOverviewOpen, setPhaseOverviewOpen] = useState(false)
  const [showRewards, setShowRewards] = useState(false)

  const unlockedRewards = rewards.filter(r => isRewardUnlocked(r, taskState, phases)).length

  useEffect(() => {
    if (percent === 100 && prevPercent < 100) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
    setPrevPercent(percent)
  }, [percent, prevPercent])

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* ZONE 1: Pinned top bar */}
      <Header percent={percent} tasksLeftToday={tasksLeftToday} />

      {/* ZONE 2: Main daily view */}
      <main className="flex-1 max-w-3xl mx-auto w-full">
        {/* Daily quote */}
        <div className="pt-6">
          <DailyQuote />
        </div>

        {/* Day view */}
        <DayView
          dayIndex={dayIndex}
          setDayIndex={setDayIndex}
          taskState={taskState}
          onToggle={toggleTask}
        />

        {/* Rewards button */}
        <div className="px-4 md:px-8 mb-6">
          <button
            onClick={() => setShowRewards(true)}
            className="w-full flex items-center justify-between py-3 px-4 bg-dark-card border border-gold/20 rounded-lg hover:border-gold/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🏆</span>
              <span className="font-heading text-lg tracking-wider text-white">
                REWARDS
              </span>
            </div>
            <span className="text-sm font-body text-gold">
              {unlockedRewards}/{rewards.length} unlocked
            </span>
          </button>
        </div>

        {/* Clarity section */}
        <ClaritySection />

        {/* ZONE 3: Phase overview (collapsed by default) */}
        <div className="px-4 md:px-8 mb-8">
          <button
            onClick={() => setPhaseOverviewOpen(!phaseOverviewOpen)}
            className="w-full flex items-center justify-between py-3 px-4 bg-dark-card border border-dark-border rounded-lg hover:border-olive transition-colors"
          >
            <h2 className="font-heading text-lg tracking-wider text-white">
              ALL PHASES
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary font-body">{percent}% overall</span>
              <span className={`text-text-secondary text-xs transition-transform ${phaseOverviewOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </div>
          </button>

          {phaseOverviewOpen && (
            <div className="mt-2 bg-dark-card border border-dark-border rounded-lg overflow-hidden">
              {phases.map((phase, i) => (
                <PhaseBlock
                  key={phase.id}
                  phase={phase}
                  phaseIndex={i}
                  taskState={taskState}
                  onToggle={toggleTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Background track */}
        <BackgroundTrack bgState={bgState} onToggle={toggleBgTask} />

        <footer className="text-center py-8 text-text-muted text-xs font-body tracking-wider">
          WELLBUILT AI — MARCH 2026
        </footer>
      </main>

      {/* Rewards page overlay */}
      <RewardsPage
        isOpen={showRewards}
        onClose={() => setShowRewards(false)}
        taskState={taskState}
      />

      <Confetti trigger={showConfetti} />
    </div>
  )
}
