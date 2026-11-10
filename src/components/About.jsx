import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { CountUp, Parallax, Petal, Reveal, RotatingBadge, ShapedImage, SplitTitle } from './ui'
import Marquee from './Marquee'

/** Câu chuyện: tiêu đề giữa, ảnh sỏi trôi hai bên, số liệu quanh ảnh hình lọ */
export default function About() {
  const { t } = useLang()
  const m = t.home
  const s = t.story
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bottleY = useTransform(p, [0, 1], reduce ? [0, 0] : [50, -50])
  const bandReveal = useTransform(p, [0.25, 0.6], reduce ? [0, 0] : [100, 0])
  const bandClip = useTransform(bandReveal, (v) => `inset(0% ${v}% 0% 0%)`)

  return (
    <section id="cau-chuyen" className="relative overflow-hidden bg-pine pt-6 text-paper lg:pt-8">
      <Petal className="top-[38%] left-[30%] w-9" speed={160} rotate={70} />
      <Petal className="top-[55%] right-[22%] w-12" color="#d9907a" speed={110} rotate={-50} delay={-3} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Ảnh trôi hai bên */}
        <Parallax speed={90} rotate={8} className="absolute top-40 -left-6 hidden w-72 lg:block xl:left-0 xl:w-80">
          <ShapedImage name="khong-gian" alt="" shape="pebble" className="aspect-[5/6] shadow-xl" sizes="320px" />
        </Parallax>
        <Parallax speed={130} rotate={-6} className="absolute top-48 -right-4 hidden w-64 lg:block xl:right-2 xl:w-72">
          <div className="relative">
            <ShapedImage name="giac-hoi" alt="" shape="bottle" className="aspect-[3/4]" sizes="300px" />
            <RotatingBadge text={m.badge} className="absolute -top-12 -left-14 h-32 w-32 text-gold-soft" />
          </div>
        </Parallax>

        <div className="relative mx-auto max-w-5xl text-center">
          <SplitTitle
            segments={m.aboutTitle}
            className="font-serif text-[2.6rem] leading-[1.05] font-medium text-paper sm:text-6xl lg:whitespace-nowrap"
          />
          <Reveal delay={0.2}>
            <p className="mt-7 font-serif text-xl text-gold-soft italic">{s.lead}</p>
            {s.lines.map((l) => (
              <p key={l} className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-paper/75 lg:max-w-none lg:whitespace-nowrap">
                {l}
              </p>
            ))}
            <a href="#trai-nghiem" className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold-soft">
              {m.aboutLink}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>

      {/* Số liệu quanh ảnh hình lọ */}
      <div ref={ref} className="relative mt-20 lg:mt-28">
        <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-y-12 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <ul className="order-2 space-y-12 text-center lg:order-1 lg:text-right">
            {m.stats.slice(0, 2).map((x, i) => (
              <Reveal as="li" key={x.label} x={-40} y={0} delay={i * 0.15}>
                <CountUp to={x.n} suffix={x.suf} className="font-serif text-6xl text-paper italic sm:text-7xl" />
                <p className="mt-1 text-sm text-paper/65">{x.label}</p>
              </Reveal>
            ))}
          </ul>

          <motion.div style={{ y: bottleY }} className="relative z-10 col-span-2 mx-auto mb-10 w-[min(86vw,460px)] lg:mb-0 lg:order-2 lg:col-span-1 lg:mx-12">
            <div className="absolute inset-x-6 top-10 -bottom-6 -z-10 rounded-full bg-[#6d8150]/60 blur-3xl" />
            <ShapedImage name="hands-back" alt={s.imgAlt} shape="bottle" className="aspect-[3/4.2]" sizes="(min-width:1024px) 460px, 86vw" />
          </motion.div>

          <ul className="order-3 space-y-12 text-center lg:text-left">
            {m.stats.slice(2).map((x, i) => (
              <Reveal as="li" key={x.label} x={40} y={0} delay={i * 0.15}>
                <CountUp to={x.n} suffix={x.suf} className="font-serif text-6xl text-paper italic sm:text-7xl" />
                <p className="mt-1 text-sm text-paper/65">{x.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Dải xanh nằm ngang */}
        <motion.div className="relative mt-20 lg:mt-24">
          <motion.div style={{ clipPath: bandClip }}>
            <Marquee speed={3} light />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
