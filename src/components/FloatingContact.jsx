import { useEffect, useState } from 'react'
import { ArrowUp, CalendarDays, Phone } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { contact } from '../data/site'

const ZALO_BLUE = '#0068FF'
const CALL_RED = '#E5322D'

const toTop = () => window.scrollTo({ top: 0 })

/** Nút nổi: Lên đầu trang · Zalo · Gọi (desktop) / thanh dưới cùng (mobile) */
export default function FloatingContact() {
  const { t } = useLang()
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <>
      {/* Mobile: nút lên đầu trang phía trên thanh dưới */}
      <button
        type="button"
        onClick={toTop}
        aria-label={t.floating.top}
        className={`fixed right-4 bottom-[4.5rem] z-40 flex h-11 w-11 items-center justify-center rounded-full keep-round border border-paper/20 bg-night/90 text-paper shadow-lg backdrop-blur transition-all duration-500 lg:hidden ${
          show ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp size={18} />
      </button>

      {/* Mobile: thanh dưới cùng – Zalo · Đặt lịch · Gọi */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.2fr_1.3fr] bg-night/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <a
          href={contact.zalo}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: ZALO_BLUE }}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-white"
        >
          <ZaloIcon /> {t.floating.zalo}
        </a>
        <a href="#dat-lich" className="flex items-center justify-center gap-2 py-3.5 text-sm text-paper">
          <CalendarDays size={16} className="text-gold" /> {t.floating.book}
        </a>
        <a
          href={`tel:${contact.hotline.tel}`}
          style={{ backgroundColor: CALL_RED }}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-white"
        >
          <Phone size={16} /> {t.floating.call}
        </a>
      </div>

      {/* Desktop: nút tròn nổi */}
      <div
        className={`fixed right-6 bottom-6 z-40 hidden flex-col items-center gap-3 transition-all duration-500 lg:flex ${
          show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={toTop}
          aria-label={t.floating.top}
          title={t.floating.top}
          className="flex h-11 w-11 items-center justify-center rounded-full keep-round border border-paper/25 bg-night/85 text-paper shadow-lg backdrop-blur transition-colors hover:border-gold hover:text-gold"
        >
          <ArrowUp size={18} />
        </button>
        <a
          href={contact.zalo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.floating.zalo}
          title="Zalo"
          style={{ backgroundColor: ZALO_BLUE }}
          className="flex h-13 w-13 items-center justify-center rounded-full keep-round text-[0.8rem] font-bold tracking-tight text-white shadow-lg transition-transform hover:scale-105"
        >
          Zalo
        </a>
        <a
          href={`tel:${contact.hotline.tel}`}
          aria-label={`${t.floating.call} ${contact.hotline.display}`}
          title={contact.hotline.display}
          style={{ backgroundColor: CALL_RED }}
          className="relative flex h-13 w-13 items-center justify-center rounded-full keep-round text-white shadow-lg transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 animate-ping rounded-full keep-round bg-[#E5322D]/40 [animation-duration:2.8s]" />
          <Phone size={20} className="relative" />
        </a>
      </div>
    </>
  )
}

function ZaloIcon() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-[0.5rem] font-bold tracking-tight text-[#0068FF]">
      Zalo
    </span>
  )
}
