import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, MessageCircle, Phone } from 'lucide-react'
import { useLang } from '../i18n/LangContext'
import { contact, prices, storeSlots } from '../data/site'
import { Reveal } from './ui'
import { LeafOutline } from './Ornaments'
import { useBooking } from './bookingStore'

const nextDays = (n = 7) => {
  const out = []
  const d = new Date()
  for (let i = 0; i < n; i++) {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i)
    out.push(x)
  }
  return out
}
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const initial = { name: '', phone: '', service: 'massage', duration: 60, mode: 'store', date: '', time: '', otherTime: '', address: '', note: '', consent: false }

function Field({ label, error, children, id }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.68rem] tracking-[0.18em] text-paper/65 uppercase">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[#f4a593]">{error}</p>}
    </div>
  )
}

export default function Booking() {
  const { t, lang } = useLang()
  const b = t.booking
  const names = t.priceList.names
  const units = t.priceList.units
  const { preset } = useBooking()
  const [f, setF] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const days = useMemo(() => nextDays(7), [])

  const durations = prices.filter((p) => p.service === f.service)
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }))

  // Đổi dịch vụ -> chỉnh thời lượng & hình thức cho khớp
  const pickService = (service) => {
    const first = prices.find((p) => p.service === service)
    setF((s) => ({
      ...s,
      service,
      duration: first.duration,
      mode: service === 'home' ? 'home' : s.mode === 'home' && s.service === 'home' ? 'store' : s.mode,
    }))
  }

  useEffect(() => {
    if (preset) {
      pickService(preset.service)
      if (preset.duration) setF((s) => ({ ...s, duration: preset.duration }))
      setSent(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset])

  const validate = () => {
    const e = {}
    if (!f.name.trim()) e.name = b.errors.name
    if (!/^(\+?84|0)\d{9,10}$/.test(f.phone.replace(/[\s.-]/g, ''))) e.phone = b.errors.phone
    if (!f.date) e.date = b.errors.date
    if (!f.time && !f.otherTime.trim()) e.time = b.errors.time
    if (f.mode === 'home' && !f.address.trim()) e.address = b.errors.address
    if (!f.consent) e.consent = b.errors.consent
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    // TODO: kết nối API / Google Sheet / email khi có hệ thống tiếp nhận. Không tự động xác nhận lịch.
    setSent(true)
  }

  const price = prices.find((p) => p.service === f.service && p.duration === Number(f.duration))
  const slots = f.mode === 'home' ? [...storeSlots, '13:00 – 17:00', '18:00 – 21:00'] : storeSlots

  return (
    <div id="dat-lich" className="relative isolate scroll-mt-20 overflow-hidden form-dark bg-pine py-20 text-paper lg:py-24">
      <LeafOutline className="absolute -right-10 top-24 -z-10 w-64 rotate-[28deg] text-paper/10" />
      <LeafOutline className="absolute -left-16 bottom-16 -z-10 w-56 -rotate-[30deg] text-paper/10" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <Reveal>
          <h3 className="max-w-2xl font-serif text-3xl text-gold-soft sm:text-4xl">{b.title}</h3>
        </Reveal>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="ok"
              role="status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-12 rounded-[2rem] border border-paper/25 px-6 py-12 text-center sm:px-14"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-soft text-gold-soft">
                <Check size={26} />
              </span>
              <h3 className="mt-6 font-serif text-3xl text-gold-soft">{b.success.title}</h3>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-paper/80">{b.success.text}</p>
              <p className="mt-4 text-xs text-paper/65">
                {names[f.service]} · {f.duration} {units[price?.unit]} · {f.date} · {f.otherTime || f.time}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <a href={`tel:${contact.hotline.tel}`} className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-7 py-3.5 text-sm font-medium text-pine transition-colors hover:bg-paper">
                  <Phone size={15} /> {b.success.call} {contact.hotline.display}
                </a>
                <a href={contact.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-paper/50 px-7 py-3.5 text-sm text-paper transition-colors hover:bg-paper hover:text-pine">
                  <MessageCircle size={15} /> {b.success.zalo}
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  setF(initial)
                  setSent(false)
                }}
                className="mt-8 text-xs tracking-[0.2em] text-paper/65 uppercase underline-offset-4 hover:text-gold-soft hover:underline"
              >
                {b.success.again}
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="mt-12">
              <div className="grid gap-x-16 gap-y-9 md:grid-cols-2">
                {/* Cột trái – thông tin */}
                <div className="space-y-8">
                  <Field id="bk-name" label={b.name} error={errors.name}>
                    <input id="bk-name" className="field" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} />
                  </Field>
                  <Field id="bk-phone" label={b.phone} error={errors.phone}>
                    <input
                      id="bk-phone"
                      className="field"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="09xx xxx xxx"
                      value={f.phone}
                      onChange={(e) => set('phone', e.target.value)}
                    />
                  </Field>
                  <div className="grid grid-cols-[1.4fr_1fr] gap-6">
                    <Field id="bk-service" label={b.service}>
                      <select id="bk-service" className="field" value={f.service} onChange={(e) => pickService(e.target.value)}>
                        {Object.entries(names).map(([k, v]) => (
                          <option key={k} value={k}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field id="bk-duration" label={b.duration}>
                      <select id="bk-duration" className="field" value={f.duration} onChange={(e) => set('duration', Number(e.target.value))}>
                        {durations.map((d) => (
                          <option key={d.duration} value={d.duration}>
                            {d.duration} {units[d.unit]}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <fieldset>
                    <legend className="text-[0.68rem] tracking-[0.18em] text-paper/65 uppercase">{b.mode}</legend>
                    <div className="mt-3 flex gap-3" role="radiogroup">
                      {['store', 'home'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          role="radio"
                          aria-checked={f.mode === m}
                          disabled={f.service === 'home' && m === 'store'}
                          onClick={() => set('mode', m)}
                          className="chip px-5 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          {b.modes[m]}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <AnimatePresence initial={false}>
                    {f.mode === 'home' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <Field id="bk-address" label={b.address} error={errors.address}>
                          <input id="bk-address" className="field" autoComplete="street-address" value={f.address} onChange={(e) => set('address', e.target.value)} />
                        </Field>
                        <p className="mt-2 text-xs text-paper/60 italic">* {t.priceList.notes[0]}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cột phải – ngày & giờ, giống ảnh tham chiếu */}
                <div className="space-y-8">
                  <fieldset>
                    <legend className="text-[0.68rem] tracking-[0.18em] text-paper/65 uppercase">{b.date}</legend>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {days.map((d) => {
                        const v = iso(d)
                        return (
                          <button
                            key={v}
                            type="button"
                            aria-pressed={f.date === v}
                            aria-label={d.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-GB')}
                            onClick={() => set('date', v)}
                            className="chip flex h-14 w-12 flex-col items-center justify-center !rounded-full"
                          >
                            <span className="text-[0.58rem] tracking-wider uppercase opacity-70">{b.weekdays[d.getDay()]}</span>
                            <span className="font-serif text-lg leading-none">{d.getDate()}</span>
                          </button>
                        )
                      })}
                    </div>
                    {errors.date && <p className="mt-2 text-xs text-[#f4a593]">{errors.date}</p>}
                  </fieldset>

                  <fieldset>
                    <legend className="text-[0.68rem] tracking-[0.18em] text-paper/65 uppercase">{b.time}</legend>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {slots.map((s) => (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={f.time === s}
                          onClick={() => setF((x) => ({ ...x, time: s, otherTime: '' }))}
                          className="chip px-4 py-2 text-sm"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {f.mode === 'home' && (
                      <div className="mt-4 flex items-center gap-4">
                        <label htmlFor="bk-other" className="text-xs whitespace-nowrap text-paper/65">
                          {b.otherTime}
                        </label>
                        <input
                          id="bk-other"
                          className="field !py-1.5"
                          placeholder={b.otherTimePh}
                          value={f.otherTime}
                          onChange={(e) => setF((x) => ({ ...x, otherTime: e.target.value, time: '' }))}
                        />
                      </div>
                    )}
                    {errors.time && <p className="mt-2 text-xs text-[#f4a593]">{errors.time}</p>}
                  </fieldset>

                  <Field id="bk-note" label={b.note}>
                    <textarea id="bk-note" rows={2} className="field resize-none" value={f.note} onChange={(e) => set('note', e.target.value)} />
                  </Field>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-8 border-t border-paper/15 pt-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-md">
                  <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-paper/70">
                    <input
                      type="checkbox"
                      checked={f.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#344a38]"
                    />
                    {b.consent}
                  </label>
                  {errors.consent && <p className="mt-1.5 text-xs text-[#f4a593]">{errors.consent}</p>}
                </div>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-7 py-3.5 text-sm font-medium text-pine transition-colors hover:bg-paper !px-10">
                    {b.submit}
                  </button>
                  <a href={`tel:${contact.hotline.tel}`} className="text-xs text-paper/65 hover:text-gold-soft">
                    {b.orCall}: <span className="text-paper">{contact.hotline.display}</span>
                  </a>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
