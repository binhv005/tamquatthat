import Header from './components/Header'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Editorial from './components/Editorial'
import History from './components/History'
import About from './components/About'
import Touch from './components/Touch'
import Space from './components/Space'
import Services from './components/Services'
import PriceList from './components/PriceList'
import Moment from './components/Moment'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import FallingLeaves from './components/FallingLeaves'
import { ShapeDefs } from './components/ui'
import { BookingProvider } from './components/bookingStore'

/**
 * Bố cục kiểu tạp chí sáng (lấy cảm hứng từ mẫu thiết kế):
 * Hero → Dải chữ chạy → Câu chuyện & số liệu → Sự chạm → Không gian → Dịch vụ → Bảng giá → Liên hệ → CTA & đặt lịch
 */
export default function App() {
  return (
    <BookingProvider>
      <ShapeDefs />
      <div className="grain relative overflow-x-clip">
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Editorial />
          <History />
          <About />
          <Touch />
          <Space />
          <Services />
          <PriceList />
          <Moment />
        </main>
        <Footer />
        <FloatingContact />
        <FallingLeaves />
      </div>
    </BookingProvider>
  )
}
