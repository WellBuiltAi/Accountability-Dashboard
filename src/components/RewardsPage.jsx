import { motion, AnimatePresence } from 'framer-motion'
import { rewards, isRewardUnlocked } from '../data/rewards'
import { phases } from '../data/tasks'

export default function RewardsPage({ isOpen, onClose, taskState }) {
  const unlockedCount = rewards.filter(r => isRewardUnlocked(r, taskState, phases)).length

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
        >
          <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl text-white tracking-wider">
                  REWARDS
                </h2>
                <p className="text-sm font-body text-text-secondary mt-1">
                  {unlockedCount}/{rewards.length} unlocked
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-white transition-colors font-body text-sm px-3 py-1 border border-dark-border rounded hover:border-text-secondary"
              >
                ✕ Close
              </button>
            </div>

            {/* Rewards grid */}
            <div className="space-y-4">
              {rewards.map((reward, i) => {
                const unlocked = isRewardUnlocked(reward, taskState, phases)

                return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`p-5 rounded-lg border transition-all ${
                      unlocked
                        ? 'border-gold/50 bg-gold/5 gold-glow'
                        : 'border-dark-border bg-dark-card opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Emoji */}
                      <div className={`text-3xl ${unlocked ? '' : 'grayscale opacity-30'}`}>
                        {reward.emoji}
                      </div>

                      <div className="flex-1">
                        {/* Name + reward */}
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-heading text-lg tracking-wide ${
                            unlocked ? 'text-gold' : 'text-text-muted'
                          }`}>
                            {reward.name}
                          </h3>
                          {unlocked && (
                            <span className="text-[10px] font-body font-semibold bg-gold text-black px-2 py-0.5 rounded">
                              UNLOCKED
                            </span>
                          )}
                        </div>

                        <p className={`text-sm font-body mb-2 ${
                          unlocked ? 'text-text-primary' : 'text-text-muted'
                        }`}>
                          {reward.reward}
                        </p>

                        {/* Description — what you accomplished */}
                        {unlocked && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs font-body text-text-secondary leading-relaxed border-t border-dark-border pt-3 mt-3"
                          >
                            {reward.description}
                          </motion.p>
                        )}

                        {/* Locked state — show trigger */}
                        {!unlocked && (
                          <p className="text-xs font-body text-text-muted">
                            🔒 {reward.triggerLabel}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Bottom message */}
            <div className="mt-8 text-center py-6 border-t border-dark-border">
              {unlockedCount === rewards.length ? (
                <div>
                  <p className="text-2xl font-heading text-gold mb-2">
                    ALL REWARDS UNLOCKED
                  </p>
                  <p className="text-sm font-body text-text-secondary">
                    You did everything you said you would. That's rare. That's you.
                  </p>
                </div>
              ) : (
                <p className="text-sm font-body text-text-muted">
                  Keep going. Every checkbox brings you closer.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
