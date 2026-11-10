import { createContext, useCallback, useContext, useState } from 'react'

const BookingContext = createContext(null)

/** Cho phép nút "Đặt lịch dịch vụ này" chọn sẵn dịch vụ trong form */
export function BookingProvider({ children }) {
  const [preset, setPreset] = useState(null)
  const bookService = useCallback((service, duration) => {
    setPreset({ service, duration, at: Date.now() })
    document.getElementById('dat-lich')?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  return <BookingContext.Provider value={{ preset, bookService }}>{children}</BookingContext.Provider>
}

export const useBooking = () => useContext(BookingContext)
