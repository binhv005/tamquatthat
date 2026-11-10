import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { Reveal, SplitTitle, ease } from './ui'

/** Thẻ nghiêng 3D theo vị trí chuột */
export function TiltCard({ children, className = '', i = 0 }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 15 })
  const sry = useSpring(ry, { stiffness: 150, damping: 15 })
  const glareX = useTransform(sry, [-8, 8], ['0%', '100%'])
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, ease, delay: i * 0.15 }}
      style={{ perspective: 900 }}
      className={className}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="group relative h-full overflow-hidden bg-card shadow-[0_24px_50px_-30px_rgba(30,40,30,0.5)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-30px_rgba(30,40,30,0.6)]"
      >
        {children}
        <motion.span
          aria-hidden="true"
          style={{ left: glareX }}
          className="pointer-events-none absolute inset-y-0 w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </motion.div>
    </motion.div>
  )
}

export default function Touch() {
  const { t } = useLang()
  const m = t.home
  const steps = t.touch.steps

  return (
    <section id="nghe-thuat" className="relative overflow-hidden bg-pine py-24 text-paper lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <SplitTitle segments={m.touchTitle} className="font-serif text-[2.6rem] leading-[1.05] font-medium text-paper sm:text-6xl lg:whitespace-nowrap" />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-paper/70 lg:max-w-none">{m.touchText}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {steps.map((st, i) => (
            <TiltCard key={st.name} i={i} className={i === 1 ? 'lg:translate-y-10' : ''}>
              <div className="aspect-[4/3.6] overflow-hidden">
                <img
                  src={`/images/${st.img}-640.webp`}
                  alt={st.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
              </div>
              <div className="px-6 pt-5 pb-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl font-medium text-ink">{st.name}</h3>
                  <span className="font-serif text-xl text-wood italic">0{i + 1}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{st.text}</p>
                <a href="#dich-vu" className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-pine">
                  {t.home.ctaServices}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
        <Reveal className="mt-20 text-center">
          <p className="text-xs text-paper/55 italic">* {t.touch.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
