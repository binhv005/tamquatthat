/**
 * Lá & cánh hoa rơi phủ toàn trang (lớp cố định, không chặn thao tác).
 * Mỗi chiếc: rơi chéo (leaf-fall) + lật nhẹ theo gió (leaf-flutter).
 * Tắt hoàn toàn khi người dùng bật “giảm chuyển động”.
 */
const PETAL = 'M20 0C34 10 41 28 33 42 27 52 13 52 7 42-1 28 6 10 20 0Z'
const LEAF = 'M20 0C36 14 38 36 20 52 2 36 4 14 20 0Z'

// [vị trí ngang %, cỡ px, thời gian rơi s, độ trễ s, độ trôi ngang vw, kiểu, màu]
const ITEMS = [
  [4, 22, 19, 0, 10, 'petal', '#b4503c'],
  [12, 16, 24, -8, 14, 'leaf', '#55704a'],
  [21, 26, 21, -15, 8, 'petal', '#d9907a'],
  [30, 14, 26, -4, 16, 'leaf', '#b69a62'],
  [39, 20, 18, -11, 12, 'petal', '#9e3b2c'],
  [48, 18, 23, -19, 10, 'leaf', '#6d8150'],
  [57, 24, 20, -6, 14, 'petal', '#e3b1a1'],
  [66, 15, 25, -13, 9, 'leaf', '#55704a'],
  [74, 22, 22, -2, 12, 'petal', '#c0705a'],
  [82, 17, 27, -17, 15, 'leaf', '#b69a62'],
  [90, 20, 19, -9, 8, 'petal', '#a8483a'],
  [96, 14, 24, -21, 11, 'leaf', '#6d8150'],
]

export default function FallingLeaves() {
  return (
    <div aria-hidden="true" className="falling-leaves pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {ITEMS.map(([left, size, dur, delay, dx, kind, color], i) => (
        <span
          key={i}
          className={`leaf-fall ${i % 2 ? 'max-sm:hidden' : ''}`}
          style={{
            left: `${left}%`,
            width: size,
            height: size * 1.3,
            animationDuration: `${dur}s`,
            animationDelay: `${delay}s`,
            '--dx': `${i % 3 === 0 ? -dx : dx}vw`,
            '--rot': `${(i % 2 ? -1 : 1) * (360 + i * 40)}deg`,
          }}
        >
          <svg
            viewBox="0 0 40 52"
            className="leaf-flutter block h-full w-full opacity-85 drop-shadow-[0_6px_8px_rgba(60,40,20,0.2)]"
            style={{ animationDuration: `${3 + (i % 4)}s`, animationDelay: `${-i * 0.7}s` }}
          >
            <path d={kind === 'leaf' ? LEAF : PETAL} fill={color} />
            <path
              d={kind === 'leaf' ? 'M20 4V48' : 'M20 5C23 20 22 34 18 47'}
              stroke="rgba(0,0,0,.16)"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </span>
      ))}
    </div>
  )
}
