import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { contact } from '../data/site'
import { ease } from './ui'

export function LangSwitch({ dark = true }) {
  const { lang, setLang } = useLang()
  return (
    <div className="flex items-center text-[0.7rem] tracking-[0.2em]" role="group" aria-label="Language">
      {['vi', 'en'].map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className={`mx-1.5 ${dark ? 'text-ink/30' : 'text-paper/30'}`}>/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`uppercase transition-colors ${
              lang === l ? (dark ? 'font-semibold text-pine' : 'text-gold') : dark ? 'text-ink/50 hover:text-ink' : 'text-paper/55 hover:text-paper'
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  )
}

function Logo({ small }) {
  return (
    <motion.a
      href="#top"
      aria-label="Tẩm Quất Thật"
      animate={{ paddingTop: small ? 8 : 14, paddingBottom: small ? 8 : 14 }}
      transition={{ duration: 0.4 }}
      className="round-lg -my-3 flex flex-col items-center bg-pine px-4 leading-none shadow-[0_18px_40px_-18px_rgba(30,40,25,0.7)] sm:-my-6 sm:px-8"
    >
      <motion.img
        src="/images/logo-128.png"
        alt=""
        animate={{ width: small ? 40 : 56, height: small ? 40 : 56 }}
        transition={{ duration: 0.4 }}
      />
      <span className="mt-1.5 font-serif text-[0.95rem] font-semibold tracking-[0.14em] whitespace-nowrap text-paper italic sm:text-xl">Tẩm Quất Thật</span>
    </motion.a>
  )
}

/** Header kiểu tạp chí: menu trái · logo giữa · liên hệ + đặt lịch phải */
export default function Header() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [onHero, setOnHero] = useState(true)
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // Header trong suốt khi còn nằm trên phần mở đầu
      const hero = document.getElementById('top')
      setOnHero(!!hero && hero.getBoundingClientRect().bottom > 90)
      const mid = window.innerHeight * 0.45
      let cur = null
      t.nav.forEach((n) => {
        const el = document.getElementById(n.id)
        if (el && el.getBoundingClientRect().top <= mid) cur = n.id
      })
      setCurrent(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [t.nav])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const on = () => setMobile(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const left = t.nav.slice(0, 3)
  const right = t.nav.slice(3)

  const link = (n) => (
    <a
      href={`#${n.id}`}
      aria-current={current === n.id ? 'location' : undefined}
      className={`group relative py-1 text-[0.74rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-500 ${onHero ? 'text-paper hover:text-gold-soft' : 'text-ink hover:text-pine'}`}
    >
      {n.label}
      <span
        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left transition-transform duration-500 ${onHero ? 'bg-gold-soft' : 'bg-pine'} ${
          current === n.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </a>
  )

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <div
          className={`round-lg mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 ${
            onHero ? `bg-transparent ${scrolled ? 'py-2' : 'py-3'}` : 'bg-card/85 py-2 shadow-[0_10px_40px_-20px_rgba(30,40,30,0.35)] backdrop-blur-md'
          }`}
        >
          <nav aria-label="Menu chính" className="hidden flex-1 lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {left.map((n) => (
                <li key={n.id}>{link(n)}</li>
              ))}
            </ul>
          </nav>

          <Logo small={scrolled || mobile} />

          <div className="flex flex-1 items-center justify-end gap-4 xl:gap-6">
            <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
              {right.map((n) => (
                <li key={n.id}>{link(n)}</li>
              ))}
            </ul>
            <div className="hidden sm:block">
              <LangSwitch dark={!onHero} />
            </div>
            <a
              href="#dat-lich"
              className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-[0.78rem] font-medium transition-all duration-500 hover:-translate-y-0.5 sm:inline-flex ${onHero ? 'bg-gold-soft text-pine hover:bg-paper' : 'bg-pine text-paper hover:bg-pine-2'}`}
            >
              {t.bookNow}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.menu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-pine text-paper lg:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
        {/* thanh tiến trình đọc */}
        <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 h-[2px] origin-left bg-pine" />
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[70] flex flex-col bg-pine px-6 pt-6 pb-10 text-paper"
          >
            <div className="flex items-center justify-between">
              <LangSwitch dark={false} />
              <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10">
                <X size={18} />
              </button>
            </div>
            <ul className="mt-14 space-y-4">
              {t.nav.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.25 + i * 0.06 }}
                >
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="font-serif text-4xl italic">
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <a href="#dat-lich" onClick={() => setOpen(false)} className="rounded-full bg-paper px-6 py-3.5 text-center text-sm font-medium text-pine">
                {t.bookNow}
              </a>
              <a href={`tel:${contact.hotline.tel}`} className="flex items-center justify-center gap-2 rounded-full border border-paper/40 px-6 py-3.5 text-sm">
                <Phone size={15} /> {contact.hotline.display}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
