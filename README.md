# 🚀 CP Squad - Official Website

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

The official website for CP Squad - CHARUSAT's premier Competitive Programming club. A modern, responsive web application built with Next.js featuring Matrix-inspired animations, sticky horizontal scroll galleries, and a cyberpunk aesthetic.

## ✨ Features

### 🎨 Design & UI
- **Matrix Digital Rain Effect** - Dynamic particle background with Japanese characters and falling code
- **Cyberpunk Aesthetic** - Dark theme with neon green (#00FF41) accents and glowing effects
- **Sticky Horizontal Scroll** - Auto-scrolling image gallery synced with vertical page scroll
- **Responsive Design** - Pixel-perfect across all devices (mobile, tablet, desktop)
- **Smooth Animations** - Letter-by-letter text reveals and decoder effects

### 🏗️ Sections
1. **Hero Section**
   - Animated Matrix particle background (>/< symbol formation)
   - Letter-dropping "CP SQUAD" animation
   - Rotating sentences with decoder reveal effect
   - Full viewport height with green gradient glow

2. **About Section**
   - "BUILD_ CODE_ DEPLOY_" headline
   - Three feature cards (Competitive Programming, Workshops, Contests)
   - Numbered cards (00, 01, 02) with hover effects
   - Color-changing gradients (pink, blue, green)

3. **About Us Section**
   - Large impactful headlines
   - Statistics display (50+ contests, 200+ members, 5+ years)
   - Green glowing numbers with monospace font
   - Two-column responsive layout

4. **Projects Gallery**
   - Sticky horizontal scroll (500vh section)
   - Auto-scrolling carousel synced with page scroll
   - Centered container (85% width with margins)
   - 5 project images from `/gallery`
   - Hover effects with green borders

5. **Blogs Section**
   - Grid layout for blog cards
   - "View more" button
   - Integrated with blog data system

### 🎯 Technical Highlights
- **Next.js 14** with App Router
- **Framer Motion** for animations
- **HTML5 Canvas** for custom particle system
- **Tailwind CSS** with custom responsive breakpoints
- **React Hooks** (useState, useRef, useEffect)
- **Next.js Image** optimization
- **Custom scroll event handling**

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+
npm or yarn or pnpm
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/CPSquad1/CPSquad.git
cd CPSquad/cpsquad
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open browser**
```
http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
cpsquad/
├── app/
│   ├── globals.css          # Global styles & animations
│   ├── layout.js            # Root layout with fonts
│   ├── page.js              # Main landing page
│   └── lib/
│       └── data/
│           └── blogdata.js  # Blog data
├── component/
│   ├── BlogCard/
│   │   └── BlogCard.jsx
│   ├── Footer/
│   │   └── Footer.jsx       # Footer with ASCII art & contributors
│   ├── HeroText/
│   │   └── HeroText.jsx     # Animated hero text component
│   ├── Navbar/
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx
│   │   ├── NavLinks.jsx
│   │   └── MobileMenu/
│   │       ├── MobileMenu.jsx
│   │       └── MobileMenuButton.jsx
│   ├── ParticleBackground/
│   │   └── ParticleBackground.jsx  # Matrix rain effect
│   └── ScrollSidebar/
│       └── ScrollSidebar.jsx
├── public/
│   ├── gallery/             # Project images (image.png - image4.png)
│   └── images/              # Other static assets
└── README.md
```

## 🎨 Design System

### Color Palette
```css
--primary-green: #00FF41     /* Matrix green */
--hover-green: #00DD35       /* Hover state */
--dark-bg: #0a0a0a          /* Main background */
--card-bg: #1e293b          /* Card background */
--navy: #1a1d2e             /* Section background */
```

### Typography
- **Headings**: Nunito (400-900 weights)
- **Body**: Geist Sans
- **Code**: Geist Mono, Monospace
- **Matrix**: Monospace for particle effects

### Responsive Breakpoints
```css
xs: 480px    /* Extra small devices */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
```

## 🛠️ Key Components

### ParticleBackground
Matrix Digital Rain effect with:
- Japanese katakana characters
- Trailing particle effects
- Three animation phases (entry, idle, exit)
- Responsive sizing across devices
- Canvas-based rendering

### HeroText
Animated text component featuring:
- Letter-by-letter falling animation
- Decoder reveal effect for sentences
- Rotating text (3 sentences)
- Green glow effects
- Responsive font scaling

### Projects Gallery
Sticky horizontal scroll section:
- 500vh tall section for scroll duration
- Auto-scrolling carousel synced with page scroll
- useEffect hook for scroll event handling
- Centered container with responsive widths
- Smooth transitions

## 🔧 Configuration

### Fonts (layout.js)
```javascript
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});
```

### Smooth Scrolling (globals.css)
```css
html {
  scroll-behavior: smooth;
}

* {
  scroll-behavior: smooth !important;
}
```

## 📱 Responsive Design

The website is fully responsive with specific optimizations for:
- **Mobile (320px - 640px)**: Single column, compact spacing
- **Tablet (640px - 1024px)**: Two columns, medium spacing
- **Desktop (1024px+)**: Full layout, optimal spacing
- **Large Screens (1440px+)**: Maximum widths, extra spacing

## 🎯 Performance Optimizations

- ✅ Next.js Image optimization
- ✅ Server Components where possible
- ✅ Canvas animations with requestAnimationFrame
- ✅ Passive scroll event listeners
- ✅ CSS transitions over JavaScript animations
- ✅ Lazy loading for images
- ✅ Optimized particle count based on viewport

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Maintain responsive design principles
- Test on multiple devices/browsers
- Optimize images before committing
- Write meaningful commit messages

## 👥 Contributors

<div align="center">
  <a href="https://github.com/DevSsChar">
    <img src="https://github.com/DevSsChar.png" width="80" height="80" style="border-radius: 50%;" />
    <br />
    <b>Dev Shah</b>
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/UtsavSavani08">
    <img src="https://github.com/UtsavSavani08.png" width="80" height="80" style="border-radius: 50%;" />
    <br />
    <b>Utsav Savani</b>
  </a>
</div>

## 📞 Contact

**CP Squad**
- 📧 Email: cpsquad@charusat.ac.in
- 📧 Email: cpsquad@gmail.com
- 📍 Location: KDPIT, CSPIT, CHARUSAT, Gujarat, India
- 📱 Instagram: [@cpsquad_vitb](https://www.instagram.com/cpsquad_vitb/)
- 💼 LinkedIn: [CP Squad](https://www.linkedin.com/company/cp-squad/)
- 💻 GitHub: [CPSquad1](https://github.com/CPSquad1)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- Open source libraries and frameworks used
- Matrix Digital Rain animation concept
- Next.js and React communities
- CHARUSAT University
© 2025 CP Squad. All rights reserved.
---
