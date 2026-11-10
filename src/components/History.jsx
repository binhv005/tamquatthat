import { useRef } from 'react'
import { motion, useAnimationFrame, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useLang } from '../i18n/LangContext'
import { Petal, Reveal, ShapedImage, SplitTitle } from './ui'

/* ---------- Hình học quạt (gốc tại tâm CX, CY; góc tính từ phương thẳng đứng) ---------- */
const CX = 500
const CY = 500
const R = 480 // bán kính ngoài của giấy quạt
const R0 = 120 // bán kính trong (nơi giấy bắt đầu)
const SPAN = 90 // nửa góc xoè tối đa (độ) → xoè 180°

const pt = (r, a) => [CX + r * Math.sin((a * Math.PI) / 180), CY - r * Math.cos((a * Math.PI) / 180)]
const sector = (r1, r2, a1, a2) => {
  const [x1, y1] = pt(r1, a1)
  const [x2, y2] = pt(r2, a1)
  const [x3, y3] = pt(r2, a2)
  const [x4, y4] = pt(r1, a2)
  return `M${x1} ${y1}L${x2} ${y2}A${r2} ${r2} 0 0 1 ${x3} ${y3}L${x4} ${y4}A${r1} ${r1} 0 0 0 ${x1} ${y1}Z`
}
const arc = (r, a1, a2) => {
  const [x1, y1] = pt(r, a1)
  const [x2, y2] = pt(r, a2)
  return `M${x1} ${y1}A${r} ${r} 0 0 1 ${x2} ${y2}`
}

const RIBS = 19
/* Ảnh ghép thành các cánh quạt – mỗi ảnh một phân vùng hình quạt, khớp sát nhau */
const PANEL_PHOTOS = ['khong-gian', 'giac-hoi', 'bam-huyet', 'hands-back', 'tam-quat-vai']
// vị trí lấy nét ảnh trong từng cánh (object-position)
const PANEL_FOCUS = ['xMidYMid', 'xMidYMid', 'xMidYMin', 'xMidYMid', 'xMidYMid']

/** Khung bao (bounding box) của 1 cánh quạt R0..R, góc a1..a2 – để ảnh phủ kín cánh (object-fit: cover) */
function panelBox(a1, a2) {
  const pts = [pt(R0, a1), pt(R0, a2), pt(R, a1), pt(R, a2)]
  ;[-90, 0, 90].forEach((k) => k > a1 && k < a2 && pts.push(pt(R, k), pt(R0, k)))
  const xs = pts.map((q) => q[0])
  const ys = pts.map((q) => q[1])
  const x = Math.min(...xs)
  const y = Math.min(...ys)
  return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y }
}

const PANEL_DEG = 36 // độ rộng mỗi cánh ảnh
const RING = 360 / PANEL_DEG // số cánh trên cả vòng tròn (nửa dưới bị giấy quạt che)
const SPIN = 5 // độ mỗi giây – quay sang phải (chiều kim đồng hồ)

/** Cánh ảnh: vẽ ở vị trí thẳng đứng (-18°..18°), ảnh luôn hướng ra ngoài theo nan quạt */
const HALF = PANEL_DEG / 2
const BOX = panelBox(-HALF, HALF)

function FanPanels() {
  const reduce = useReducedMotion()
  const spin = useRef(null)
  const deg = useRef(0)

  useAnimationFrame((_, delta) => {
    if (reduce || !spin.current) return
    deg.current = (deg.current + (delta / 1000) * SPIN) % 360
    spin.current.setAttribute('transform', `rotate(${deg.current} ${CX} ${CY})`)
  })

  return (
    <g>
      <defs>
        <clipPath id="fan-panel">
          <path d={sector(R0, R, -HALF, HALF)} />
        </clipPath>
        <radialGradient id="fan-shade" gradientUnits="userSpaceOnUse" cx={CX} cy={CY} r={R}>
          <stop offset={R0 / R} stopColor="rgba(20,28,16,0.45)" />
          <stop offset="0.55" stopColor="rgba(20,28,16,0.08)" />
          <stop offset="1" stopColor="rgba(20,28,16,0.18)" />
        </radialGradient>
      </defs>

      {/* Vòng ảnh quay liên tục quanh đinh tán */}
      <g ref={spin}>
        {Array.from({ length: RING }, (_, k) => {
          const i = k % PANEL_PHOTOS.length
          const at = -SPAN + HALF + k * PANEL_DEG // vị trí ban đầu giống bố cục tĩnh
          const [x1, y1] = pt(R0, -HALF)
          const [x2, y2] = pt(R, -HALF)
          return (
            <g key={k} transform={`rotate(${at} ${CX} ${CY})`}>
              <image
                href={`/images/${PANEL_PHOTOS[i]}-1200.webp`}
                x={BOX.x}
                y={BOX.y}
                width={BOX.w}
                height={BOX.h}
                preserveAspectRatio={`${PANEL_FOCUS[i]} slice`}
                clipPath="url(#fan-panel)"
              />
              {/* đường phân cách vàng – 1 nét ở cạnh trái mỗi cánh */}
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d4bd8a" strokeWidth="2.5" />
            </g>
          )
        })}
      </g>

      {/* phủ nhẹ để các ảnh hoà thành một tổng thể */}
      <path d={sector(R0, R, -SPAN, SPAN)} fill="url(#fan-shade)" />
    </g>
  )
}

/** Nan quạt xoay quanh trục theo độ xoè */
function Rib({ spread, base, len, w, fill }) {
  const rotate = useTransform(spread, (t) => base * t)
  return <motion.rect x={CX - w / 2} y={CY - len} width={w} height={len} rx={w / 2} fill={fill} style={{ rotate, originX: 0.5, originY: 1 }} />
}

/** Quạt giấy vẽ hoa – xoè dần theo cuộn */
function Fan({ progress }) {
  const reduce = useReducedMotion()
  const raw = useTransform(progress, [0.05, 0.5], [reduce ? 1 : 0.06, 1])
  const spread = useSpring(raw, { stiffness: 70, damping: 20 })
  const clipD = useTransform(spread, (t) => sector(R0 - 4, R + 6, -SPAN * t, SPAN * t))

  return (
    <svg viewBox="0 0 1000 620" className="block w-full" aria-hidden="true">
      <defs>
        <clipPath id="fan-clip">
          <motion.path d={clipD} />
        </clipPath>
        <radialGradient id="fan-paper" cx="50%" cy="82%" r="75%">
          <stop offset="0%" stopColor="#3a4a2e" />
          <stop offset="70%" stopColor="#1f2918" />
          <stop offset="100%" stopColor="#141b10" />
        </radialGradient>
      </defs>

      {/* Nền xanh từ trục quạt trở xuống – nối liền section bên dưới */}
      <rect x="-50" y={CY} width="1100" height={620 - CY + 2} fill="var(--color-pine)" />

      {/* Nan quạt phía dưới giấy */}
      {Array.from({ length: RIBS }, (_, i) => {
        const base = -SPAN + (2 * SPAN * i) / (RIBS - 1)
        return <Rib key={i} spread={spread} base={base} len={R0 + 60} w={14} fill={i % 2 ? '#3d2a1b' : '#4a3322'} />
      })}

      {/* Giấy quạt */}
      <g clipPath="url(#fan-clip)">
        <path d={sector(R0, R, -SPAN, SPAN)} fill="url(#fan-paper)" />
        <FanPanels />
        {/* viền vàng ngoài & trong – mỗi cạnh 1 nét */}
        <path d={arc(R - 2, -SPAN, SPAN)} stroke="#d4bd8a" strokeWidth="4" fill="none" />
        <path d={arc(R0 + 1.5, -SPAN, SPAN)} stroke="#d4bd8a" strokeWidth="3" fill="none" />
      </g>

      {/* Hai nan cái hai bên */}
      <Rib spread={spread} base={-SPAN - 1.5} len={R + 8} w={20} fill="#2e1f14" />
      <Rib spread={spread} base={SPAN + 1.5} len={R + 8} w={20} fill="#2e1f14" />

      {/* Đinh tán */}
      <circle cx={CX} cy={CY} r="17" fill="#b69a62" stroke="#7a5a2f" strokeWidth="3" />
      <circle cx={CX} cy={CY} r="6" fill="#f4ebdd" />

      {/* Tua rua */}
      <g className="sway" style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}>
        <path d={`M${CX} ${CY + 16}C${CX + 4} ${CY + 40} ${CX - 4} ${CY + 58} ${CX} ${CY + 72}`} stroke="#9e3b2c" strokeWidth="3" fill="none" />
        <circle cx={CX} cy={CY + 76} r="7" fill="#d4bd8a" />
        <path d={`M${CX - 9} ${CY + 82}L${CX + 9} ${CY + 82}L${CX + 13} ${CY + 112}L${CX - 13} ${CY + 112}Z`} fill="#9e3b2c" />
      </g>
    </svg>
  )
}

/** Lịch sử – chữ so le, cánh hoa bay, quạt xoè theo cuộn */
export default function History() {
  const { t } = useLang()
  const m = t.home
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const [p1, p2, p3] = m.historyText

  return (
    <section className="relative overflow-hidden pt-20 lg:pt-28">
      <Petal className="top-[8%] right-[10%] w-12" speed={160} rotate={80} />
      <Petal className="top-[30%] left-[4%] w-10" color="#a8483a" speed={120} rotate={-70} delay={-2} />
      <Petal className="top-[24%] right-[34%] w-7" color="#d9907a" speed={200} rotate={110} delay={-4} />
      <Petal className="top-[52%] right-[5%] w-9" color="#9e3b2c" speed={140} rotate={-90} delay={-1} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SplitTitle
          segments={m.historyTitle}
          className="font-serif text-[2.6rem] leading-[1.05] font-medium text-ink uppercase sm:text-6xl lg:whitespace-nowrap"
        />

        <div className="mt-10 grid gap-6 text-[0.95rem] leading-[1.85] text-ink/75 md:grid-cols-12 lg:mt-14">
          <Reveal className="md:col-span-4">
            <p>{p1}</p>
          </Reveal>
          {/* Ảnh Hà Nội – Hồ Gươm, Tháp Rùa */}
          <figure className="md:col-span-7 md:col-start-6 md:row-span-2">
            <ShapedImage name="ho-guom" alt={m.hanoiAlt} shape="" className="aspect-[3/1] w-full" sizes="(min-width:768px) 55vw, 100vw" />
            <figcaption className="mt-3 flex justify-between font-serif text-sm text-ink/55 italic">
              <span>{m.hanoiCaption}</span>
              <span>Hà Nội</span>
            </figcaption>
          </figure>
          <Reveal delay={0.15} className="md:col-span-5 md:col-start-1 md:mt-16">
            <p className="font-serif text-xl leading-snug text-ink italic sm:text-2xl">{p2}</p>
          </Reveal>
          <Reveal delay={0.3} className="md:col-span-4 md:col-start-9 md:mt-6">
            <p>{p3}</p>
          </Reveal>
          {/* Ảnh Hà Nội – Cột cờ, Đoan Môn (góc dưới bên phải) */}
          <figure className="md:col-span-4 md:col-start-9 md:mt-6">
            <ShapedImage name="ha-noi" alt={m.hanoi2Alt} shape="" className="aspect-[4/5] w-full" sizes="(min-width:768px) 30vw, 100vw" />
            <figcaption className="mt-3 flex justify-between font-serif text-sm text-ink/55 italic">
              <span>{m.hanoi2Caption}</span>
              <span>Hà Nội</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div ref={ref} className="mt-6 bg-[linear-gradient(to_bottom,transparent_80.6%,var(--color-pine)_80.6%)] lg:mt-10">
        <Fan progress={scrollYProgress} />
      </div>
    </section>
  )
}
