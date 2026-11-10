import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Phone } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { contact } from '../data/site'
import { Blossom, Reveal, SplitTitle } from './ui'
import Booking from './Booking'

/** Khung CTA mở rộng theo cuộn + form đặt lịch */
export default function Moment() {
  const { t } = useLang()
  const m = t.moment
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const inset = useTransform(p, [0, 1], reduce ? ['0%', '0%'] : ['9%', '0%'])
    const clip = useTransform(inset, (i) => `inset(0% ${i} 0% ${i})`)
  const imgScale = useTransform(p, [0, 1], reduce ? [1, 1] : [1.3, 1])

  return (
    <section id="khoanh-khac" className="pt-10">
      <div ref={ref}>
        <motion.div style={{ clipPath: clip }} className="relative isolate overflow-hidden px-6 py-24 text-center text-paper sm:py-32 lg:py-40">
          <motion.img
            src="/images/hands-back-1200.webp"
            alt=""
            loading="lazy"
            style={{ scale: imgScale }}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(46,58,36,0.82),rgba(46,58,36,0.92))]" />

          <div className="pointer-events-none absolute -top-4 -left-6 w-40 sm:w-60 lg:w-72">
            <Blossom className="w-full" />
          </div>
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-40 -scale-x-100 sm:w-60 lg:w-72">
            <Blossom className="w-full" delay={1.5} />
          </div>

          <SplitTitle
            segments={[[m.title[0] + ' ', 0], [m.title[1], 1]]}
            className="mx-auto max-w-4xl font-serif text-[2.4rem] leading-[1.05] font-medium sm:text-6xl lg:max-w-none lg:text-[3.2rem] lg:whitespace-nowrap xl:text-[3.6rem]"
          />
          <Reveal delay={0.3}>
            <p className="mx-auto mt-6 max-w-md text-[1rem] leading-relaxed text-paper/85">{m.sub}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a href="#dat-lich" className="inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-pine transition-all hover:-translate-y-0.5 hover:bg-gold-soft">
                {m.cta} <ArrowDown size={15} />
              </a>
              <a
                href={`tel:${contact.hotline.tel}`}
                className="inline-flex items-center gap-2 rounded-full border border-paper/60 px-6 py-3.5 text-sm transition-colors hover:bg-paper/15"
              >
                <Phone size={15} /> {m.call}: {contact.hotline.display}
              </a>
            </div>
          </Reveal>
        </motion.div>
      </div>
      <Booking />
    </section>
  )
}
