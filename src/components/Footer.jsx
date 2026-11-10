import { useLang } from '../i18n/LangContext'
import { contact } from '../data/site'
import { LangSwitch } from './Header'

/** Footer nền tranh Hà Nội xưa (footer.png) – chữ màu đậm trên nền kem, copyright trên dải sóng xanh */
export default function Footer() {
  const { t } = useLang()
  return (
    <footer id="lien-he" className="bg-paper text-ink">
      <div className="relative isolate overflow-hidden">
      <picture className="absolute inset-0 -z-10">
        <source media="(min-width: 768px)" srcSet="/images/footer-bg-1920.webp" />
        <img
          src="/images/footer-bg-960.webp"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-[66%_100%] md:object-bottom"
        />
      </picture>

      <div className="mx-auto flex min-h-[640px] max-w-6xl flex-col items-center px-4 pt-10 text-center sm:px-6 md:min-h-[clamp(480px,36vw,680px)] lg:pt-12">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <img src="/images/logo-128.png" alt="Logo Tẩm Quất Thật" width="56" height="56" loading="lazy" />
          <div className="sm:text-left">
            <p className="font-serif text-2xl font-semibold tracking-[0.2em] text-moss sm:text-[1.7rem]">TẨM QUẤT THẬT</p>
            <p className="font-serif text-base text-wood italic">{t.footer.slogan}</p>
          </div>
        </div>

        <nav aria-label="Menu chân trang" className="mt-6">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-normal text-ink/80">
            {t.chapters.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="transition-colors hover:text-moss hover:underline hover:underline-offset-4">
                  {n.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="my-5 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-wood/40 to-transparent" />

        <address className="flex flex-col flex-wrap justify-center gap-x-10 gap-y-2.5 text-sm font-normal text-ink/75 not-italic md:flex-row">
          <span>{contact.address}</span>
          <span>
            Hotline{' '}
            <a href={`tel:${contact.hotline.tel}`} className="font-semibold text-moss hover:text-wood">
              {contact.hotline.display}
            </a>
          </span>
          <span>
            {t.location.hoursLabel}: {contact.openHours}
          </span>
          <span className="flex justify-center gap-6">
            <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-moss hover:underline">
              Facebook
            </a>
            <a href={contact.mapsDirection} target="_blank" rel="noopener noreferrer" className="hover:text-moss hover:underline">
              Google Maps
            </a>
          </span>
        </address>
        <div className="mt-5">
          <LangSwitch dark />
        </div>
      </div>
      </div>

      {/* Copyright nằm trên dải sóng xanh rêu ở đáy ảnh */}
      <div className="-mt-px bg-[#363e2a] px-4 pt-1 pb-20 text-center lg:pb-6">
        <p className="text-[0.68rem] tracking-[0.2em] text-paper/80">{t.footer.rights}</p>
      </div>
    </footer>
  )
}
