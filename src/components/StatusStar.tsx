import { motion, useReducedMotion } from 'framer-motion'
import parts from './logoPaths'
import { useTime } from '../lib/time'

type Props = { state: 'kitchen' | 'bar' | 'closed'; className?: string }

// Their four-point star doubles as the kitchen light: lit, half-lit, or out.
export default function StatusStar({ state, className }: Props) {
  const { candle } = useTime()
  const reduce = useReducedMotion()
  const flicker = candle && state !== 'closed' && !reduce
  return (
    <motion.svg
      className={`status-star status-${state} ${className ?? ''}`}
      viewBox="941 673.4 37.2 37.2"
      aria-hidden="true"
      animate={
        flicker ? { opacity: [1, 0.78, 0.95, 0.85, 1], scale: [1, 0.96, 1.02, 0.98, 1] } : { opacity: 1, scale: 1 }
      }
      transition={flicker ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
    >
      <path d={parts.star.d} />
    </motion.svg>
  )
}
