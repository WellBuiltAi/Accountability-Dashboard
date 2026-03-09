import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function GoldParticle({ delay, x, y }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        background: `hsl(${40 + Math.random() * 15}, 85%, ${50 + Math.random() * 20}%)`,
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: 0,
        scale: 0,
        y: [0, -100 - Math.random() * 200],
        x: [0, (Math.random() - 0.5) * 200],
      }}
      transition={{
        duration: 2 + Math.random(),
        delay,
        ease: 'easeOut',
      }}
    />
  )
}

export default function Confetti({ trigger }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        delay: Math.random() * 0.5,
        x: 20 + Math.random() * 60,
        y: 30 + Math.random() * 40,
      }))
      setParticles(newParticles)

      // Clean up after animation
      const timer = setTimeout(() => setParticles([]), 4000)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {particles.map(p => (
            <GoldParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
          ))}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-center">
              <h2 className="text-5xl md:text-7xl font-heading text-gold gold-glow-strong p-4">
                CLIENT CLOSED
              </h2>
              <p className="text-lg text-text-secondary font-body mt-2">
                100% — You did it.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
