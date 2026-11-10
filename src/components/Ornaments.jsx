/** Lá bồ đề nét mảnh – lấy cảm hứng từ logo, thay cho lá cọ trong ảnh tham chiếu */
export function LeafOutline({ className = '', strokeWidth = 0.6 }) {
  return (
    <svg viewBox="0 0 200 260" fill="none" className={className} aria-hidden="true">
      <path
        d="M100 6C92 40 60 62 34 92 8 122 6 170 34 200c22 24 50 30 66 34 16-4 44-10 66-34 28-30 26-78 0-108C140 62 108 40 100 6Z"
        stroke="currentColor"
        strokeWidth={strokeWidth * 2}
      />
      <path d="M100 18v236" stroke="currentColor" strokeWidth={strokeWidth * 1.6} />
      {[60, 84, 108, 132, 156, 180, 204].map((y, i) => {
        const spread = [40, 58, 70, 74, 70, 58, 38][i]
        return (
          <g key={y} stroke="currentColor" strokeWidth={strokeWidth}>
            <path d={`M100 ${y + 14}C${100 - spread * 0.4} ${y + 6} ${100 - spread * 0.8} ${y - 4} ${100 - spread} ${y - 16}`} />
            <path d={`M100 ${y + 14}C${100 + spread * 0.4} ${y + 6} ${100 + spread * 0.8} ${y - 4} ${100 + spread} ${y - 16}`} />
          </g>
        )
      })}
      <path d="M100 254c0 0-2-8-2-20" stroke="currentColor" strokeWidth={strokeWidth * 1.6} />
    </svg>
  )
}
