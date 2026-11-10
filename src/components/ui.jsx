import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export const ease = [0.22, 0.61, 0.36, 1]

/**
 * Khung ảnh dạng SVG clipPath (objectBoundingBox) – dùng: style={{ clipPath: 'url(#shape-notch)' }}
 * notch: chữ nhật khuyết 4 góc · bottle: vai lọ/vòm · pebble: viên sỏi
 */
export function ShapeDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <clipPath id="shape-notch" clipPathUnits="objectBoundingBox">
          <path d="M.12 0H.88V.1H1V.9H.88V1H.12V.9H0V.1H.12Z" />
        </clipPath>
        <clipPath id="shape-bottle" clipPathUnits="objectBoundingBox">
          <path d="M.3 .04Q.3 0 .35 0H.65Q.7 0 .7 .04V.09Q.7 .13 .76 .145Q.99 .2 1 .36V.96Q1 1 .95 1H.05Q0 1 0 .96V.36Q.01 .2 .24 .145Q.3 .13 .3 .09Z" />
        </clipPath>
        <clipPath id="shape-tab" clipPathUnits="objectBoundingBox">
          <path d="M.06 0H.94Q1 0 1 .05V.95Q1 1 .94 1H.62Q.58 1 .57 .97Q.55 .93 .5 .93Q.45 .93 .43 .97Q.42 1 .38 1H.06Q0 1 0 .95V.05Q0 0 .06 0Z" />
        </clipPath>
        <clipPath id="shape-pebble" clipPathUnits="objectBoundingBox">
          <path d="M.52 0C.8 0 1 .18 1 .46C1 .78 .78 1 .48 1C.18 1 0 .8 0 .52C0 .22 .22 0 .52 0Z" />
        </clipPath>
      </defs>
    </svg>
  )
}

/** Cánh hoa bay – trôi theo cuộn & lơ lửng */
export function Petal({ className = '', color = '#c0705a', speed = 90, rotate = 40, delay = 0 }) {
  return (
    <Parallax speed={speed} rotate={rotate} className={`pointer-events-none absolute z-20 hidden sm:block ${className}`}>
      <svg viewBox="0 0 40 52" className="floaty h-full w-full drop-shadow-[0_10px_12px_rgba(90,40,30,0.25)]" style={{ animationDelay: `${delay}s` }} aria-hidden="true">
        <path d="M20 0C34 10 41 28 33 42 27 52 13 52 7 42-1 28 6 10 20 0Z" fill={color} />
        <path d="M20 5C23 20 22 34 18 47" stroke="rgba(0,0,0,.14)" strokeWidth="1.2" fill="none" />
      </svg>
    </Parallax>
  )
}

/** Vòng hoa ngang trang – dây leo tự vẽ, hoa nở lần lượt */
const GARLAND_FLOWERS = [
  [40, 92, 26, 0], [130, 70, 20, 1], [215, 100, 30, 2], [320, 74, 22, 0], [410, 104, 28, 1], [505, 80, 24, 2],
  [600, 96, 32, 0], [700, 72, 22, 1], [790, 100, 28, 2], [885, 78, 24, 0], [980, 102, 30, 1], [1075, 76, 22, 2], [1165, 94, 26, 0],
]
const ROSE = [
  ['#9e3b2c', '#c45a45', '#e48c74'],
  ['#d99a86', '#ecbcaa', '#f6dccf'],
  ['#b4503c', '#d77a62', '#f0b39d'],
]
export function Garland({ className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <svg ref={ref} viewBox="0 0 1200 170" fill="none" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <motion.path
        d="M-10 96C90 50 170 130 280 92S470 50 590 94 790 136 900 92 1100 52 1210 92"
        stroke="#5b4a33"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
      />
      {GARLAND_FLOWERS.map(([x, y, r], i) => (
        <motion.g
          key={`l${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.4 + i * 0.09 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        >
          <ellipse cx={x - r * 1.3} cy={y + r * 0.6} rx={r * 0.9} ry={r * 0.36} fill="#3f5f3a" transform={`rotate(-25 ${x - r * 1.3} ${y + r * 0.6})`} />
          <ellipse cx={x + r * 1.2} cy={y - r * 0.5} rx={r * 0.8} ry={r * 0.32} fill="#55744a" transform={`rotate(30 ${x + r * 1.2} ${y - r * 0.5})`} />
        </motion.g>
      ))}
      {GARLAND_FLOWERS.map(([x, y, r, c], i) => {
        const [dark, mid, light] = ROSE[c]
        return (
          <motion.g
            key={`f${i}`}
            initial={{ scale: 0, rotate: -60 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.7 + i * 0.1 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          >
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx={x} cy={y - r * 0.55} rx={r * 0.55} ry={r * 0.6} fill={light} transform={`rotate(${a} ${x} ${y})`} />
            ))}
            <circle cx={x} cy={y} r={r * 0.62} fill={mid} />
            <path d={`M${x - r * 0.35} ${y}a${r * 0.35} ${r * 0.35} 0 1 1 ${r * 0.5} ${r * 0.25}a${r * 0.2} ${r * 0.2} 0 1 1-${r * 0.3}-${r * 0.3}`} stroke={dark} strokeWidth={r * 0.12} fill="none" strokeLinecap="round" />
          </motion.g>
        )
      })}
    </svg>
  )
}

/** Fade-up khi cuộn tới */
export function Reveal({ children, delay = 0, y = 32, x = 0, className = '', as = 'div', once = true }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </M>
  )
}

/**
 * Tiêu đề tách từng chữ – mỗi từ trượt lên từ trong mặt nạ.
 * segments: [[text, italic], ...]  ·  lines (tuỳ chọn): mảng nhiều dòng segments
 */
export function SplitTitle({ segments, lines, as = 'h2', className = '', delay = 0, onLoad = false, stagger = 0.06 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const show = onLoad || inView
  const rows = lines || [segments]
  const Tag = as
  let i = 0
  return (
    <Tag ref={ref} className={className}>
      {rows.map((row, r) => (
        <span key={r} className={lines ? 'block' : ''}>
          {row.map(([text, it], s) =>
            text.split(/(\s+)/).map((w, k) => {
              if (!w) return null
              if (/^\s+$/.test(w)) return ' '
              const idx = i++
              return (
                <span key={`${s}-${k}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
                  <motion.span
                    className={`inline-block ${it ? 'italic' : ''}`}
                    initial={{ y: '110%', rotate: 4 }}
                    animate={show ? { y: '0%', rotate: 0 } : {}}
                    transition={{ duration: 1, ease, delay: delay + idx * stagger }}
                  >
                    {w}
                  </motion.span>
                </span>
              )
            }),
          )}
        </span>
      ))}
    </Tag>
  )
}

/** Đếm số khi cuộn tới */
export function CountUp({ to, suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className={className}>
      {v}
      {suffix}
    </span>
  )
}

/** Di chuyển theo cuộn (parallax) */
export function Parallax({ children, speed = 60, rotate = 0, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed, -speed])
  const r = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-rotate, rotate])
  return (
    <motion.div ref={ref} style={{ y, rotate: r }} className={className}>
      {children}
    </motion.div>
  )
}

/** Ảnh cắt khung, hé lộ bằng mặt nạ khi cuộn tới + phóng nhẹ theo cuộn */
export function ShapedImage({ name, alt = '', shape = 'notch', className = '', sizes = '50vw', imgClass = '', priority = false, delay = 0 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1])
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ clipPath: shape ? `url(#shape-${shape})` : undefined }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.2, ease, delay }}
    >
      <motion.img
        src={`/images/${name}-1200.webp`}
        srcSet={`/images/${name}-640.webp 640w, /images/${name}-1200.webp 1200w`}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        style={{ scale }}
        className={`h-full w-full object-cover ${imgClass}`}
      />
    </motion.div>
  )
}

/** Nhánh hoa / lá vẽ tay – đung đưa nhẹ (CSS) */
export function Blossom({ className = '', flip = false, delay = 0 }) {
  return (
    <svg
      viewBox="0 0 260 200"
      fill="none"
      className={`sway ${className}`}
      style={{ animationDelay: `${delay}s`, transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <path d="M4 196C60 160 96 120 150 96s82-46 104-86" stroke="#7a5a3f" strokeWidth="3" strokeLinecap="round" />
      <path d="M96 128c-6-22 4-40 22-50M150 96c14-10 34-10 50 0M196 62c-4-16 2-30 14-38" stroke="#7a5a3f" strokeWidth="2" strokeLinecap="round" />
      {[
        [70, 150, -30],
        [128, 108, 20],
        [182, 80, -15],
        [226, 44, 35],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="16" ry="6" fill="#55704a" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      {[
        [118, 78, 13],
        [202, 96, 11],
        [210, 24, 14],
        [252, 8, 9],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy={-s * 0.55} rx={s * 0.42} ry={s * 0.62} fill="#f1d9cd" stroke="#d9b4a2" strokeWidth=".8" transform={`rotate(${a})`} />
          ))}
          <circle r={s * 0.22} fill="#c98c6a" />
        </g>
      ))}
    </svg>
  )
}

/** Hoa nhỏ dùng làm dấu phân cách trong dải chữ chạy */
export function Flower({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx="12" cy="6.5" rx="2.6" ry="5" stroke="currentColor" strokeWidth="1" transform={`rotate(${a} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  )
}

/** Huy hiệu chữ chạy vòng tròn */
export function RotatingBadge({ text, className = '' }) {
  return (
    <div className={`${/(^|\s)(absolute|fixed)(\s|$)/.test(className) ? '' : 'relative'} ${className}`}>
      <svg viewBox="0 0 120 120" className="spin-slow h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <text fontSize="8.4" letterSpacing="2.6" fill="currentColor">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <img src="/images/logo-128.png" alt="" className="absolute inset-0 m-auto w-[38%]" />
    </div>
  )
}
