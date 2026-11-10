import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { Petal, Reveal, SplitTitle, ease } from './ui'

export default function Space() {
  const { t } = useLang()
  const m = t.home
  const ex = t.experience
  const track = useRef(null)
  const [limit, setLimit] = useState(0)

  useEffect(() => {
    const calc = () => {
      const el = track.current
      if (el) setLimit(Math.max(0, el.scrollWidth - el.parentElement.offsetWidth))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return (
    <section id="trai-nghiem" className="relative overflow-hidden py-24 lg:py-32">
      <Petal className="top-[20%] left-[8%] w-10" speed={150} rotate={80} />
      <Petal className="top-[48%] right-[6%] w-8" color="#a8483a" speed={120} rotate={-60} delay={-2} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <SplitTitle segments={m.spaceTitle} className="font-serif text-[2.6rem] leading-[1.05] font-medium text-ink sm:text-6xl lg:whitespace-nowrap" />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-ink/65">{ex.text}</p>
          </Reveal>
        </div>

      </div>

      {/* Dải ảnh kéo ngang */}
      <div className="mt-14">
        <div className="mx-auto mb-6 flex max-w-7xl items-center gap-2 px-4 text-xs tracking-[0.18em] text-ink/50 uppercase sm:px-6 lg:px-10">
          <MoveHorizontal size={15} /> {m.dragHint}
        </div>
        <div className="px-4 sm:px-6 lg:px-10">
          <motion.ul
            ref={track}
            drag="x"
            dragConstraints={{ left: -limit, right: 0 }}
            dragElastic={0.12}
            className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
          >
            {ex.items.map((it, i) => (
              <motion.li
                key={it.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: i * 0.1 }}
                className={`group relative w-[70vw] shrink-0 overflow-hidden rounded-[1.6rem] sm:w-[340px] ${i % 2 ? 'h-[380px] self-end' : 'h-[440px]'}`}
              >
                <img
                  src={`/images/${it.name}-640.webp`}
                  alt={it.caption}
                  loading="lazy"
                  draggable="false"
                  className="pointer-events-none h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 font-serif text-2xl text-paper italic transition-transform duration-500 group-hover:-translate-y-1">
                  {it.caption}
                </p>
                <span className="absolute top-4 right-4 rounded-full bg-card/85 px-3 py-1 font-serif text-sm text-ink">0{i + 1}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
