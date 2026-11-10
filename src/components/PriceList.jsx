import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { prices, formatVND } from '../data/site'
import { Parallax, Petal, Reveal, RotatingBadge, ShapedImage, SplitTitle, ease } from './ui'
import { useBooking } from './bookingStore'

/** Bảng giá – bố cục “bestselling”: danh sách giá dạng thẻ + ảnh lớn khung khuyết góc */
export default function PriceList() {
  const { t, lang } = useLang()
  const p = t.priceList
  const m = t.home
  const { bookService } = useBooking()
  const fmt = (n) => (lang === 'vi' ? formatVND(n) : n.toLocaleString('en-US') + ' VND')

  return (
    <section id="bang-gia" className="relative overflow-hidden bg-mist-2/70 py-24 lg:py-32">
      <Petal className="top-[12%] right-[12%] w-10" color="#d9907a" speed={130} rotate={70} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <SplitTitle segments={m.priceTitle} className="font-serif text-[2.6rem] leading-[1.05] font-medium text-ink sm:text-6xl lg:whitespace-nowrap" />
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {prices.map((x, i) => (
                <motion.li
                  key={`${x.service}-${x.duration}`}
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, ease, delay: i * 0.08 }}
                  className={i === prices.length - 1 && prices.length % 2 ? 'sm:col-span-2' : ''}
                >
                  <button
                    type="button"
                    onClick={() => bookService(x.service, x.duration)}
                    className="group flex h-full w-full flex-col rounded-2xl bg-card p-5 text-left shadow-[0_18px_40px_-28px_rgba(30,40,30,0.5)] transition-all duration-500 hover:-translate-y-1.5 hover:bg-pine hover:text-paper"
                  >
                    <span className="text-[0.66rem] tracking-[0.2em] text-wood uppercase transition-colors group-hover:text-gold-soft">{p.names[x.service]}</span>
                    <span className="mt-4 flex items-end justify-between gap-4">
                      <span className="text-sm text-ink/60 transition-colors group-hover:text-paper/75">
                        {x.duration} {p.units[x.unit]}
                      </span>
                      <span className="font-serif text-3xl font-medium text-pine transition-colors group-hover:text-paper">{fmt(x.price)}</span>
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-pine transition-colors group-hover:text-paper">
                      {t.bookNow}
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <Reveal delay={0.3}>
              <ul className="mt-8 space-y-2 text-sm text-ink/60">
                {p.notes.map((n) => (
                  <li key={n} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-wood/60" />
                    {n}
                  </li>
                ))}
              </ul>
              <a href="#dat-lich" className="mt-8 inline-flex rounded-full bg-pine px-7 py-3.5 text-sm font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-pine-2">
                {t.bookNow}
              </a>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <ShapedImage name="tam-quat-vai" alt={t.services.list[2].imgAlt} shape="notch" className="aspect-[1/1.05]" sizes="(min-width:1024px) 520px, 90vw" />
            <Parallax speed={50} className="absolute -bottom-8 -left-6 sm:-left-12">
              <RotatingBadge text={m.badge} className="h-32 w-32 rounded-full bg-card p-2 text-wood shadow-xl" />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  )
}
