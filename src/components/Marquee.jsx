import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { Flower } from './ui'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

/** Dải chữ chạy vô tận – tăng tốc & đổi chiều theo hướng cuộn */
export default function Marquee({ speed = 2.2, className = '', light = false }) {
  const { t } = useLang()
  const words = t.home.marquee
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(vel, [-1000, 0, 1000], [-4, 0, 4], { clamp: false })
  const dir = useRef(-1)
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const f = factor.get()
    if (f < 0) dir.current = 1
    else if (f > 0) dir.current = -1
    base.set(base.get() + dir.current * speed * (delta / 1000) * (1 + Math.abs(f)))
  })

  const row = (k) => (
    <div key={k} className="flex shrink-0 items-center" aria-hidden={k > 0 || undefined}>
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <Flower className={`mx-8 h-6 w-6 sm:mx-12 ${light ? 'text-wood' : 'text-gold-soft'}`} />
          <span className={`text-sm tracking-[0.22em] whitespace-nowrap uppercase ${light ? 'font-medium text-pine' : 'text-paper'}`}>{w}</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`overflow-hidden py-5 ${light ? 'bg-paper' : 'bg-pine'} ${className}`}>
      <motion.div style={{ x }} className="flex w-max">
        {[0, 1, 2, 3].map(row)}
      </motion.div>
    </div>
  )
}
