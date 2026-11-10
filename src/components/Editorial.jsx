import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { Garland, Petal, Reveal, RotatingBadge, ShapedImage, ease } from './ui'

/** Khởi nguồn – chữ khổng lồ, ảnh vòm chen giữa, vòng hoa vắt ngang (cảm hứng poster tạp chí) */
export default function Editorial() {
  const { t } = useLang()
  const m = t.home
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const leftX = useTransform(p, [0.1, 0.55], reduce ? ['0vw', '0vw'] : ['6vw', '-3vw'])
  const rightX = useTransform(p, [0.1, 0.55], reduce ? ['0vw', '0vw'] : ['-6vw', '3vw'])

  return (
    <section ref={ref} className="relative overflow-hidden pt-16 lg:pt-24">
      <Petal className="top-[22%] left-[6%] w-10 sm:w-14" speed={140} rotate={60} />
      <Petal className="top-[40%] right-[8%] w-8 sm:w-12" color="#d9907a" speed={180} rotate={-70} delay={-2} />
      <Petal className="top-[70%] left-[18%] w-7 sm:w-10" color="#a8483a" speed={120} rotate={90} delay={-4} />

      {/* Chữ khổng lồ + ảnh vòm */}
      <div className="relative mt-6">
        <h2 className="flex justify-center gap-[3vw] font-serif text-[18.5vw] leading-[0.82] font-medium tracking-[-0.02em] whitespace-nowrap text-pine uppercase select-none lg:text-[17vw]">
          <motion.span style={{ x: leftX }} className="block">
            {m.editorialWord[0]}
          </motion.span>
          <motion.span style={{ x: rightX }} className="block">
            {m.editorialWord[1]}
          </motion.span>
        </h2>

        {/* Khẩu hiệu trong ngoặc + huy hiệu */}
        <Reveal delay={0.3} className="relative z-20 mx-auto -mt-[1vw] flex max-w-7xl items-start justify-end px-4 sm:px-6 lg:px-10">
          <p className="hidden max-w-[40%] text-right sm:block font-serif text-base text-ink/70 italic sm:text-xl">[{m.editorialTag}]</p>
        </Reveal>
        <div className="absolute top-[4%] right-[3%] z-20 hidden h-24 w-24 md:block lg:h-32 lg:w-32">
          <RotatingBadge text={m.badge} className="h-full w-full rounded-full bg-card/80 p-2 text-pine backdrop-blur" />
        </div>
      </div>

      {/* Vòng hoa vắt ngang trước ảnh */}
      <div className="relative z-20 -mt-[2vw] sm:-mt-[4vw]">
        <Garland className="sway-soft h-[110px] w-full sm:h-[150px] lg:h-[190px]" />
      </div>

      {/* Đoạn văn so le */}
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-4 sm:px-6 lg:px-10 lg:pt-20 lg:pb-8">
        <div className="grid items-start gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="font-serif text-2xl leading-snug text-ink first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-pine sm:text-[1.7rem]">
              {m.editorialText[0]}
            </p>
            {/* Ảnh lấp khoảng trống dưới đoạn văn trái */}
            <figure className="mt-10 md:mt-14">
              <ShapedImage name="bam-huyet" alt={t.touch.steps[2].alt} shape="" className="aspect-[4/3] w-full" sizes="(min-width:768px) 40vw, 100vw" />
              <figcaption className="mt-3 flex justify-between font-serif text-sm text-ink/55 italic">
                <span>{t.touch.steps[2].name}</span>
                <span>01</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.2} className="md:col-span-5 md:col-start-8">
            {/* Ảnh lấp khoảng trống phía trên đoạn văn phải */}
            <figure className="mb-8 md:mb-10">
              <ShapedImage name="hands-back" alt={t.story.imgAlt} shape="" className="aspect-[4/5] w-full md:w-[85%] md:ml-auto" sizes="(min-width:768px) 35vw, 100vw" />
              <figcaption className="mt-3 flex justify-between font-serif text-sm text-ink/55 italic md:ml-auto md:w-[85%]">
                <span>{t.experience.items.find((x) => x.name === 'hands-back')?.caption}</span>
                <span>02</span>
              </figcaption>
            </figure>
            <p className="text-[0.98rem] leading-[1.9] text-ink/70">{m.editorialText[1]}</p>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease, delay: 0.4 }}
              className="mt-6 block h-px w-full origin-left bg-wood/40"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
