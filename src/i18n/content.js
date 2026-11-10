/**
 * Nội dung song ngữ VI / EN – cấu trúc 7 chương storytelling.
 * Giá & liên hệ gốc nằm ở src/data/site.js.
 */
export const content = {
  vi: {
    /** 7 chương – id dùng cho điều hướng & story progress */
    chapters: [
      { id: 'top', no: '01', name: 'Khởi đầu', title: 'Hà Nội và những nhịp sống vội vã' },
      { id: 'cau-chuyen', no: '02', name: 'Câu chuyện', title: 'Đôi tay không ánh sáng' },
      { id: 'nghe-thuat', no: '03', name: 'Sự chạm', title: 'Nghệ thuật của sự chạm' },
      { id: 'trai-nghiem', no: '04', name: 'Trải nghiệm', title: 'Một khoảng lặng giữa lòng Hà Nội' },
      { id: 'dich-vu', no: '05', name: 'Dịch vụ', title: 'Chọn trải nghiệm phù hợp với bạn' },
      { id: 'lien-he', no: '06', name: 'Hành trình', title: 'Tìm đến Tẩm Quất Thật' },
      { id: 'khoanh-khac', no: '07', name: 'Khoảnh khắc', title: 'Hãy dành cho mình một khoảng lặng' },
    ],
    nav: [
      { id: 'cau-chuyen', label: 'Câu chuyện' },
      { id: 'nghe-thuat', label: 'Sự chạm' },
      { id: 'trai-nghiem', label: 'Không gian' },
      { id: 'dich-vu', label: 'Dịch vụ' },
      { id: 'bang-gia', label: 'Bảng giá' },
      { id: 'lien-he', label: 'Liên hệ' },
    ],
    menu: 'Menu',
    close: 'Đóng',
    bookNow: 'Đặt lịch',

    hero: {
      giant: ['Khoảng lặng', 'giữa Hà Nội'],
      title: ['Giữa nhịp sống vội vã,', 'hãy dành cho cơ thể một khoảng lặng.'],
      sub: 'Nơi sự thư thái được trao gửi bằng những đôi bàn tay không nhìn thấy ánh sáng.',
      ctaBook: 'Đặt lịch ngay',
      priceLabel: 'Giá chỉ từ',
      priceVal: '150.000đ',
      priceUnit: '/ 60 phút',
      hoursLabel: 'Mở cửa mỗi ngày',
    },

    story: {
      lead: 'Không nhìn bằng đôi mắt, họ cảm nhận bằng đôi bàn tay.',
      lines: [
        'Với kỹ thuật viên khiếm thị, đôi bàn tay là cách họ cảm nhận và lắng nghe thế giới.',
        'Mỗi điểm chạm, mỗi nhịp bấm huyệt đều gửi gắm kinh nghiệm và sự tập trung.',
      ],
      imgAlt: 'Cận cảnh đôi bàn tay kỹ thuật viên đặt trên vai khách hàng',
    },

    touch: {
      title: 'Đôi bàn tay có cách kể câu chuyện riêng.',
      steps: [
        { name: 'Xoa bóp', text: 'Nhịp nhàng, đều đặn, giúp cơ thể thả lỏng.', img: 'tam-quat-vai', alt: 'Kỹ thuật viên xoa bóp vùng vai' },
        { name: 'Day ấn', text: 'Chậm rãi, tập trung vào từng vùng cơ thể.', img: 'hands-back', alt: 'Bàn tay day ấn trên lưng' },
        { name: 'Bấm huyệt', text: 'Tác động lên huyệt theo Đông y truyền thống.', img: 'bam-huyet', alt: 'Ngón tay bấm huyệt vùng cổ vai' },
      ],
      note: 'Mang tính chăm sóc, thư giãn; không thay thế điều trị y khoa.',
    },

    experience: {
      text: 'Giản dị, gần gũi, đúng tinh thần tẩm quất truyền thống.',
      items: [
        { name: 'khong-gian', caption: 'Ánh nến & thảo mộc' },
        { name: 'hands-back', caption: 'Đôi bàn tay' },
        { name: 'giac-hoi', caption: 'Giác hơi' },
        { name: 'bam-huyet', caption: 'Bấm huyệt' },
        { name: 'tam-quat-vai', caption: 'Tẩm quất vai gáy' },
      ],
    },

    services: {
      title: 'Mỗi cơ thể có một nhu cầu riêng.',
      cta: 'Đặt lịch dịch vụ này',
      numLabel: 'Dịch vụ',
      list: [
        {
          key: 'massage',
          name: 'Tẩm quất, Bấm huyệt Đông y',
          desc: 'Xoa bóp, day, ấn và bấm huyệt theo phương pháp truyền thống.',
          prices: [
            ['60 phút', '150.000đ'],
            ['90 phút', '225.000đ'],
            ['120 phút', '300.000đ'],
          ],
          imgAlt: 'Bấm huyệt vùng vai gáy',
        },
        {
          key: 'cupping',
          name: 'Cạo gió, Giác hơi bài phong hàn',
          desc: 'Chăm sóc truyền thống bằng cạo gió và giác hơi.',
          prices: [['1 lượt', '40.000đ']],
          imgAlt: 'Giác hơi trên lưng',
        },
        {
          key: 'home',
          name: 'Tẩm quất tại nhà',
          desc: 'Được chăm sóc ngay trong không gian riêng của bạn.',
          prices: [['60 phút', '200.000đ']],
          note: 'Chưa bao gồm phí di chuyển · Nhận lịch 24/7.',
          imgAlt: 'Tẩm quất vai lưng trong không gian riêng',
        },
      ],
    },
    priceList: {
      title: 'Giản dị và minh bạch.',
      caption: 'Bảng giá dịch vụ',
      head: ['Dịch vụ', 'Thời lượng', 'Giá'],
      names: { massage: 'Tẩm quất – Bấm huyệt', cupping: 'Cạo gió – Giác hơi', home: 'Tẩm quất tại nhà' },
      units: { min: 'phút', turn: 'lượt' },
      notes: ['Dịch vụ tại nhà chưa bao gồm phí di chuyển.', 'Vui lòng liên hệ trước để xác nhận lịch.'],
      menuLabel: 'Thực đơn chăm sóc',
    },

    location: {
      hoursLabel: 'Giờ hoạt động tại cơ sở',
    },

    moment: {
      title: ['Đôi khi, điều cơ thể cần', 'chỉ là được lắng nghe.'],
      sub: 'Tẩm Quất Thật luôn sẵn sàng chào đón bạn.',
      cta: 'Đặt lịch trải nghiệm',
      call: 'Gọi ngay',
      imgAlt: 'Đôi bàn tay đặt nhẹ trên vai khách hàng',
    },

    booking: {
      title: 'Đặt một khoảng thư thái.',
      name: 'Họ và tên',
      phone: 'Số điện thoại',
      service: 'Dịch vụ',
      duration: 'Thời lượng',
      date: 'Chọn ngày mong muốn',
      time: 'Chọn khung giờ',
      mode: 'Hình thức',
      modes: { store: 'Tại cơ sở', home: 'Tại nhà' },
      address: 'Địa chỉ của bạn',
      note: 'Ghi chú thêm',
      otherTime: 'Giờ khác (tại nhà 24/7)',
      otherTimePh: 'VD: 20:00',
      consent: 'Đồng ý để chúng tôi gọi xác nhận lịch.',
      submit: 'Xác nhận đặt lịch',
      orCall: 'Hoặc gọi đặt nhanh',
      errors: {
        name: 'Vui lòng nhập họ tên',
        phone: 'Số điện thoại chưa hợp lệ',
        date: 'Vui lòng chọn ngày',
        time: 'Vui lòng chọn khung giờ',
        address: 'Vui lòng nhập địa chỉ',
        consent: 'Vui lòng đồng ý để chúng tôi liên hệ',
      },
      success: {
        title: 'Chúng tôi đã tiếp nhận yêu cầu của bạn',
        text: 'Lịch chưa được xác nhận. Chúng tôi sẽ gọi lại cho bạn sớm nhất.',
        call: 'Gọi hotline',
        zalo: 'Nhắn Zalo',
        again: 'Đặt lịch khác',
      },
      weekdays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    },

    footer: {
      slogan: 'Chạm bằng đôi bàn tay – Trao gửi sự tận tâm.',
      rights: '© 2026 TẨM QUẤT THẬT. All Rights Reserved.',
    },
    floating: { call: 'Gọi', zalo: 'Zalo', book: 'Đặt lịch', top: 'Lên đầu trang' },

    /** Nội dung cho bố cục mới (mỗi tiêu đề: các đoạn [chữ, nghiêng?]) */
    home: {
      heroTitle: [[['Khoảng lặng', 0]], [['giữa lòng ', 0]], [['Hà Nội!', 1]]],
      ctaServices: 'Xem dịch vụ',
      marquee: ['Xoa bóp', 'Day ấn', 'Bấm huyệt', 'Cạo gió', 'Giác hơi', 'Thư thái', 'Tận tâm'],
      aboutTitle: [['Hơn cả một liệu trình,', 0], [' đó là ', 0], ['sự tận tâm', 1]],
      aboutLink: 'Khám phá câu chuyện',
      badge: 'TẨM QUẤT THẬT · ĐÔI TAY TRUYỀN THỐNG · ',
      stats: [
        { n: 150, suf: 'k', label: 'Giá từ / 60 phút' },
        { n: 24, suf: '/7', label: 'Nhận lịch tại nhà' },
        { n: 3, suf: '', label: 'Dịch vụ truyền thống' },
        { n: 711, suf: '', label: 'Hồng Hà, Hà Nội' },
      ],
      touchTitle: [['Đôi bàn tay với ', 0], ['nhịp chạm riêng', 1]],
      touchText: 'Mỗi kỹ thuật được thực hiện chậm rãi, tập trung, theo phương pháp Đông y truyền thống.',
      spaceTitle: [['Một không gian nhỏ để ', 0], ['thực sự nghỉ ngơi', 1]],
      dragHint: 'Kéo để xem thêm',
      servicesTitle: [['Chọn trải nghiệm ', 0], ['dành cho bạn', 1]],
      from: 'Từ',
      priceTitle: [['Giản dị & ', 0], ['minh bạch', 1]],
      editorialWord: ['Tẩm', 'Quất'],
      editorialTag: 'đôi tay truyền thống giữa lòng Hà Nội',
      historyTitle: [['Hành trình của ', 0], ['tẩm quất', 1]],
      hanoiCaption: 'Hồ Gươm – Tháp Rùa',
      hanoiAlt: 'Tranh Hà Nội xưa: Hồ Gươm với Tháp Rùa và chùa tháp',
      historyText: [
        'Tẩm quất là phương pháp xoa bóp dân gian lâu đời của người Việt, gắn liền với y học cổ truyền phương Đông.',
        'Qua nhiều thế hệ, các kỹ thuật xoa, day, ấn và bấm huyệt được truyền lại từ người đi trước cho người đi sau – bằng sự kiên nhẫn và đôi bàn tay.',
        'Ở Hà Nội, tẩm quất gắn với hình ảnh những người thợ khiếm thị – lấy xúc giác làm đôi mắt, lấy sự tận tâm làm nghề.',
      ],
      editorialText: [
        'Tẩm quất là phương pháp chăm sóc cơ thể truyền thống của người Việt, kết hợp xoa bóp, day ấn và bấm huyệt theo Đông y.',
        'Tại Tẩm Quất Thật, mỗi liệu trình được thực hiện bằng đôi bàn tay của kỹ thuật viên khiếm thị – chậm rãi, tận tâm, lắng nghe từng nhịp cơ thể.',
      ],
    },
  },

  en: {
    chapters: [
      { id: 'top', no: '01', name: 'The Beginning', title: 'Hanoi and its hurried rhythm' },
      { id: 'cau-chuyen', no: '02', name: 'The Story', title: 'Hands without light' },
      { id: 'nghe-thuat', no: '03', name: 'The Touch', title: 'The art of touch' },
      { id: 'trai-nghiem', no: '04', name: 'The Experience', title: 'A quiet pause in the heart of Hanoi' },
      { id: 'dich-vu', no: '05', name: 'The Service', title: 'Choose the experience for you' },
      { id: 'lien-he', no: '06', name: 'The Journey', title: 'Finding Tẩm Quất Thật' },
      { id: 'khoanh-khac', no: '07', name: 'The Moment', title: 'Give yourself a moment of calm' },
    ],
    nav: [
      { id: 'cau-chuyen', label: 'Story' },
      { id: 'nghe-thuat', label: 'The Touch' },
      { id: 'trai-nghiem', label: 'Space' },
      { id: 'dich-vu', label: 'Services' },
      { id: 'bang-gia', label: 'Prices' },
      { id: 'lien-he', label: 'Contact' },
    ],
    menu: 'Menu',
    close: 'Close',
    bookNow: 'Book',

    hero: {
      giant: ['A quiet pause', 'in Hanoi'],
      title: ['Amid the hurried rhythm of life,', 'give your body a moment of calm.'],
      sub: 'Calm, offered by hands that do not see the light.',
      ctaBook: 'Book now',
      priceLabel: 'Starting from',
      priceVal: '150,000 VND',
      priceUnit: '/ 60 min',
      hoursLabel: 'Open every day',
    },

    story: {
      lead: 'Not seeing with their eyes, they feel with their hands.',
      lines: [
        'For visually impaired therapists, hands are how they sense and listen to the world.',
        'Every touch and every press carries experience and focus.',
      ],
      imgAlt: 'Close-up of a therapist’s hands resting on a guest’s shoulder',
    },

    touch: {
      title: 'Hands have their own way of telling a story.',
      steps: [
        { name: 'Massage', text: 'Rhythmic and even, helping the body let go.', img: 'tam-quat-vai', alt: 'Therapist massaging the shoulders' },
        { name: 'Kneading & pressing', text: 'Slow, focused work on each area.', img: 'hands-back', alt: 'Hands pressing on the back' },
        { name: 'Acupressure', text: 'Acupoints pressed the traditional Eastern way.', img: 'bam-huyet', alt: 'Thumbs pressing acupoints on the neck' },
      ],
      note: 'For care and relaxation; not a medical treatment.',
    },

    experience: {
      text: 'Simple and warm, true to traditional tẩm quất.',
      items: [
        { name: 'khong-gian', caption: 'Candlelight & herbs' },
        { name: 'hands-back', caption: 'The hands' },
        { name: 'giac-hoi', caption: 'Cupping' },
        { name: 'bam-huyet', caption: 'Acupressure' },
        { name: 'tam-quat-vai', caption: 'Shoulder massage' },
      ],
    },

    services: {
      title: 'Every body has its own needs.',
      cta: 'Book this service',
      numLabel: 'Service',
      list: [
        {
          key: 'massage',
          name: 'Tẩm quất & Acupressure',
          desc: 'Rubbing, kneading, pressing and acupressure, the traditional way.',
          prices: [
            ['60 min', '150,000 VND'],
            ['90 min', '225,000 VND'],
            ['120 min', '300,000 VND'],
          ],
          imgAlt: 'Acupressure on the neck and shoulders',
        },
        {
          key: 'cupping',
          name: 'Coin scraping & Cupping',
          desc: 'Traditional coin scraping and cupping.',
          prices: [['1 session', '40,000 VND']],
          imgAlt: 'Cupping therapy on the back',
        },
        {
          key: 'home',
          name: 'Home massage',
          desc: 'Cared for in your own space.',
          prices: [['60 min', '200,000 VND']],
          note: 'Travel fee not included · Booking 24/7.',
          imgAlt: 'Shoulder massage in a private room',
        },
      ],
    },
    priceList: {
      title: 'Simple and transparent.',
      caption: 'Price list',
      head: ['Service', 'Duration', 'Price'],
      names: { massage: 'Tẩm quất – Acupressure', cupping: 'Coin scraping – Cupping', home: 'Home massage' },
      units: { min: 'min', turn: 'session' },
      notes: ['Home service excludes travel fee.', 'Please contact us in advance to confirm your booking.'],
      menuLabel: 'Care menu',
    },

    location: {
      hoursLabel: 'Opening hours',
    },

    moment: {
      title: ['Sometimes, all the body needs', 'is to be listened to.'],
      sub: 'Tẩm Quất Thật is always ready to welcome you.',
      cta: 'Book your session',
      call: 'Call now',
      imgAlt: 'Hands resting gently on a guest’s shoulder',
    },

    booking: {
      title: 'Book a moment of calm.',
      name: 'Full name',
      phone: 'Phone number',
      service: 'Service',
      duration: 'Duration',
      date: 'Preferred date',
      time: 'Preferred time',
      mode: 'Where',
      modes: { store: 'At our place', home: 'At your home' },
      address: 'Your address',
      note: 'Additional notes',
      otherTime: 'Other time (home 24/7)',
      otherTimePh: 'e.g. 20:00',
      consent: 'I agree to be called to confirm.',
      submit: 'Confirm booking',
      orCall: 'Or call to book',
      errors: {
        name: 'Please enter your name',
        phone: 'Invalid phone number',
        date: 'Please pick a date',
        time: 'Please pick a time',
        address: 'Please enter your address',
        consent: 'Please agree to be contacted',
      },
      success: {
        title: 'We have received your request',
        text: 'Not confirmed yet. We will call you back shortly.',
        call: 'Call hotline',
        zalo: 'Message on Zalo',
        again: 'Book another',
      },
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },

    footer: {
      slogan: 'Touched by hands – Given with devotion.',
      rights: '© 2026 TẨM QUẤT THẬT. All Rights Reserved.',
    },
    floating: { call: 'Call', zalo: 'Zalo', book: 'Book', top: 'Back to top' },

    /** Copy for the redesigned layout (each title: [text, italic?] segments) */
    home: {
      heroTitle: [[['A quiet ', 0]], [['pause in the ', 0]], [['heart of Hanoi!', 1]]],
      ctaServices: 'Explore services',
      marquee: ['Massage', 'Kneading', 'Acupressure', 'Coin scraping', 'Cupping', 'Calm', 'Devotion'],
      aboutTitle: [['More than a treatment,', 0], [' it is ', 0], ['pure devotion', 1]],
      aboutLink: 'Discover our story',
      badge: 'TẨM QUẤT THẬT · TRADITIONAL HANDS · ',
      stats: [
        { n: 150, suf: 'k', label: 'From / 60 minutes' },
        { n: 24, suf: '/7', label: 'Home service' },
        { n: 3, suf: '', label: 'Traditional services' },
        { n: 711, suf: '', label: 'Hồng Hà, Hanoi' },
      ],
      touchTitle: [['Hands with their ', 0], ['own rhythm', 1]],
      touchText: 'Each technique is performed slowly and attentively, following traditional Eastern methods.',
      spaceTitle: [['A small space for ', 0], ['true rest', 1]],
      dragHint: 'Drag to explore',
      servicesTitle: [['Choose the experience ', 0], ['made for you', 1]],
      from: 'From',
      priceTitle: [['Simple, ', 0], ['transparent', 1]],
      editorialWord: ['Tẩm', 'Quất'],
      editorialTag: 'traditional hands from the heart of Hanoi',
      historyTitle: [['The journey of ', 0], ['tẩm quất', 1]],
      hanoiCaption: 'Hoan Kiem Lake – Turtle Tower',
      hanoiAlt: 'Old Hanoi painting: Hoan Kiem Lake with Turtle Tower and pagoda',
      historyText: [
        'Tẩm quất is a long-standing Vietnamese folk massage, rooted in traditional Eastern medicine.',
        'Over generations, the techniques of rubbing, kneading, pressing and acupressure have been passed down from one pair of hands to the next – with patience.',
        'In Hanoi, tẩm quất is closely tied to visually impaired practitioners – touch as their eyes, devotion as their craft.',
      ],
      editorialText: [
        'Tẩm quất is a traditional Vietnamese way of caring for the body, combining massage, kneading and acupressure in the Eastern tradition.',
        'At Tẩm Quất Thật, every session is given by the hands of visually impaired therapists – slow, devoted, listening to each rhythm of the body.',
      ],
    },
  },
}
