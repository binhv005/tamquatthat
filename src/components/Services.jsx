import { useRef } from 'react'
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { SplitTitle, ease } from './ui'
import { useBooking } from './bookingStore'

const imgs = { massage: 'bam-huyet', cupping: 'giac-hoi', home: 'tam-quat-vai' }
const tints = ['bg-card', 'bg-[#f6eedc]', 'bg-[#efe6cf]']
const COPIES = 4 // số lần lặp danh sách để dải đủ dài
const SPEED = 1.2 // % chiều rộng dải mỗi giây

function Card({ sv, i, s, onBook, hidden }) {
  return (
    <article
      aria-hidden={hidden || undefined}
      className={`group flex w-[82vw] shrink-0 flex-col shadow-[0_24px_50px_-30px_rgba(30,40,30,0.45)] sm:w-[380px] lg:w-[420px] ${tints[i % tints.length]}`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={`/images/${imgs[sv.key]}-640.webp`}
          srcSet={`/images/${imgs[sv.key]}-640.webp 640w, /images/${imgs[sv.key]}-1200.webp 1200w`}
          sizes="(min-width:1024px) 420px, 82vw"
          alt={hidden ? '' : sv.imgAlt}
          loading="lazy"
          draggable="false"
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="font-serif text-base text-wood italic">
          {s.numLabel} 0{i + 1}
        </p>
        <h3 className="mt-2 font-serif text-[1.7rem] leading-tight font-medium text-ink">{sv.name}</h3>
        <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/70">{sv.desc}</p>

        <ul className="mt-5">
          {sv.prices.map(([d, p]) => (
            <li key={d} className="flex items-baseline gap-3 border-b border-ink/10 py-2.5">
              <span className="text-sm text-ink/70">{d}</span>
              <span className="flex-1 border-b border-dotted border-wood/40" />
              <span className="font-serif text-xl font-medium text-pine">{p}</span>
            </li>
          ))}
        </ul>
        {sv.note && <p className="mt-3 text-xs leading-relaxed text-ink/55 italic">* {sv.note}</p>}

        <div className="mt-auto pt-6">
        <button
          type="button"
          tabIndex={hidden ? -1 : 0}
          onClick={() => onBook(sv.key)}
          className="group/btn inline-flex w-fit items-center gap-3 bg-pine py-2 pr-2 pl-5 text-sm text-paper transition-colors hover:bg-pine-2"
        >
          {s.cta}
          <span className="flex h-8 w-8 items-center justify-center bg-paper text-pine transition-transform duration-500 group-hover/btn:-rotate-45">
            <ArrowRight size={15} />
          </span>
        </button>
        </div>
      </div>
    </article>
  )
}

/** Dịch vụ – dải thẻ trượt ngang vô hạn (dừng chậm khi rê chuột) */
export default function Services() {
  const { t } = useLang()
  const s = t.services
  const m = t.home
  const { bookService } = useBooking()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref)
  const x = useMotionValue(0)
  const speed = useRef(1)
  const xp = useTransform(x, (v) => `${v}%`)

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return
    let v = x.get() - (delta / 1000) * SPEED * speed.current
    if (v <= -50) v += 50 // nửa đầu = nửa sau → lặp liền mạch
    x.set(v)
  })

  // Lặp danh sách: nửa đầu (COPIES/2 lần) giống hệt nửa sau
  const items = Array.from({ length: COPIES }, (_, c) => s.list.map((sv, i) => ({ sv, i, c }))).flat()

  return (
    <section id="dich-vu" className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto mb-14 max-w-5xl px-4 text-center sm:px-6 lg:px-10">
        <SplitTitle segments={m.servicesTitle} className="font-serif text-[2.6rem] leading-[1.05] font-medium text-ink sm:text-6xl lg:whitespace-nowrap" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease }}
        onMouseEnter={() => (speed.current = 0.15)}
        onMouseLeave={() => (speed.current = 1)}
        onFocusCapture={() => (speed.current = 0)}
        onBlurCapture={() => (speed.current = 1)}
      >
        <motion.div style={{ x: xp }} className="flex w-max items-stretch gap-6 pr-6 lg:gap-8 lg:pr-8">
          {items.map(({ sv, i, c }) => (
            <Card key={`${c}-${sv.key}`} sv={sv} i={i} s={s} onBook={bookService} hidden={c > 0} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
