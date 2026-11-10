import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { contact } from '../data/site'
import { ease } from './ui'

/* Dải ảnh chạy ngang – chiều cao so le */
const STRIP = ['bam-huyet', 'khong-gian', 'giac-hoi', 'hands-back', 'tam-quat-vai']
const H_DESKTOP = ['lg:h-[46vh]', 'lg:h-[58vh]', 'lg:h-[40vh]', 'lg:h-[62vh]', 'lg:h-[50vh]']
const H_MOBILE = ['h-[30vh]', 'h-[38vh]', 'h-[26vh]', 'h-[40vh]', 'h-[34vh]']
const SPEED = 2.2 // % chiều rộng dải mỗi giây

const fade = (d, y = 24) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease, delay: d },
})

function Strip({ captionOf }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const speed = useRef(1)
  const xp = useTransform(x, (v) => `${v}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let v = x.get() - (delta / 1000) * SPEED * speed.current
    if (v <= -50) v += 50 // 2 bản sao → lặp vô tận
    x.set(v)
  })

  const items = [...STRIP, ...STRIP]
  return (
    <motion.div
      style={{ x: xp }}
      onMouseEnter={() => (speed.current = 0.2)}
      onMouseLeave={() => (speed.current = 1)}
      className="flex w-max items-start"
    >
      {items.map((name, i) => {
        const k = i % STRIP.length
        return (
          <motion.figure
            key={i}
            initial={{ y: '-105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.15 + k * 0.1 }}
            aria-hidden={i >= STRIP.length || undefined}
            className={`group relative w-[62vw] shrink-0 overflow-hidden sm:w-[38vw] lg:w-[29vw] ${H_MOBILE[k]} ${H_DESKTOP[k]}`}
          >
            <img
              src={`/images/${name}-1200.webp`}
              srcSet={`/images/${name}-640.webp 640w, /images/${name}-1200.webp 1200w`}
              sizes="(min-width:1024px) 29vw, 62vw"
              alt={i < STRIP.length ? captionOf(name) : ''}
              fetchPriority={i === 0 ? 'high' : undefined}
              loading={i < 3 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent px-4 pt-10 pb-3 text-[0.66rem] font-medium tracking-[0.2em] text-paper uppercase transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100">
              <span>{captionOf(name)}</span>
              <span className="font-serif text-sm tracking-normal">0{k + 1}</span>
            </figcaption>
          </motion.figure>
        )
      })}
    </motion.div>
  )
}

/** Tên thương hiệu khổng lồ – từng chữ cái trồi lên */
function GiantWord({ text, delay = 0.6 }) {
  const words = text.split(' ')
  let n = 0
  return words.map((word, w) => (
    <span key={w} className="inline-block whitespace-nowrap">
      {[...word].map((ch, c) => {
        const i = n++
        return (
          <span key={c} className="-mt-[0.35em] inline-block overflow-hidden pt-[0.35em] pb-[0.06em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: delay + i * 0.045 }}
            >
              {ch}
            </motion.span>
          </span>
        )
      })}
      {w < words.length - 1 && <span className="inline-block w-[0.28em]" />}
    </span>
  ))
}

/** Phần mở đầu: dải ảnh chạy ngang phía trên · tên thương hiệu khổng lồ & giới thiệu phía dưới */
export default function Hero() {
  const { t } = useLang()
  const h = t.hero
  const m = t.home
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const captionOf = (name) => t.experience.items.find((x) => x.name === name)?.caption || ''

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const stripY = useTransform(p, [0, 1], [0, reduce ? 0 : -140])
  const wordY = useTransform(p, [0, 1], [0, reduce ? 0 : -50])
  const bgY = useTransform(p, [0, 1], ['0%', reduce ? '0%' : '18%'])

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden bg-night text-paper lg:h-[100svh] lg:min-h-[720px]">
      {/* Nền ảnh phòng trị liệu + lớp phủ */}
      <motion.img
        src="/images/hero-bg-1600.webp"
        srcSet="/images/hero-bg-960.webp 960w, /images/hero-bg-1600.webp 1600w"
        sizes="100vw"
        alt=""
        style={{ y: bgY }}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease }}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(18,26,16,0.55)_0%,rgba(18,26,16,0.72)_55%,rgba(18,26,16,0.92)_100%)]" />

      {/* Dải ảnh */}
      <motion.div style={{ y: stripY }} className="relative lg:absolute lg:inset-x-0 lg:top-0">
        <Strip captionOf={captionOf} />
      </motion.div>

      {/* Tên thương hiệu + giới thiệu */}
      <div className="relative px-4 pt-10 pb-24 sm:px-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:px-8 lg:pt-0 lg:pb-5">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_minmax(0,23rem)] lg:gap-12">
          <motion.h1
            style={{ y: wordY }}
            className="font-serif text-[15vw] leading-[0.86] font-semibold tracking-[-0.02em] text-paper uppercase lg:text-[8.4vw] lg:whitespace-nowrap"
          >
            <GiantWord text="Tẩm Quất Thật" />
            <span className="sr-only"> – {h.title.join(' ')}</span>
          </motion.h1>

          <div className="lg:pb-3">
            <motion.p {...fade(1.1)} className="font-serif text-2xl text-gold-soft italic">
              {h.giant.join(' ')}
            </motion.p>
            <motion.p {...fade(1.25)} className="mt-3 text-[0.95rem] leading-relaxed text-paper/80">
              {h.sub}
            </motion.p>
            <motion.div {...fade(1.4)} className="mt-6 flex flex-wrap items-center gap-5">
              <a
                href="#dat-lich"
                className="group relative inline-flex items-center overflow-hidden bg-gold-soft px-6 py-3 text-sm font-medium text-pine transition-transform hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 -translate-x-full bg-paper transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative">{h.ctaBook}</span>
              </a>
              <a href="#dich-vu" className="group inline-flex items-center gap-2 text-sm font-medium text-gold-soft">
                {m.ctaServices}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Dòng thông tin đáy */}
        <motion.div
          {...fade(1.6, 10)}
          className="mt-8 flex flex-col gap-3 border-t border-paper/15 pt-4 text-[0.68rem] font-medium tracking-[0.14em] text-paper/70 uppercase sm:flex-row sm:items-center sm:justify-between lg:mt-6"
        >
          <p className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <span>{contact.address}</span>
            <span className="hidden text-paper/30 sm:inline">|</span>
            <span>
              {h.priceLabel} {h.priceVal} {h.priceUnit}
            </span>
            <span className="hidden text-paper/30 sm:inline">|</span>
            <span>
              {h.hoursLabel} {contact.openHours}
            </span>
          </p>
          <p className="flex items-center gap-3">
            <a href={`tel:${contact.hotline.tel}`} className="transition-colors hover:text-gold-soft">
              Hotline {contact.hotline.display}
            </a>
            <span className="hidden text-paper/30 sm:inline">|</span>
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-soft">
              Facebook
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
