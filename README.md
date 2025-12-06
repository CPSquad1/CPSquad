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

- Design inspiration from [Delta Force NIT Trichy](https://delta.nitt.edu/)
- Matrix Digital Rain animation concept
- Next.js and React communities
- CHARUSAT University

---

<div align="center">
  <b>Made with ❤️ by CP Squad</b>
  <br />
  <sub>© 2024 CP Squad. All Rights Reserved.</sub>
</div>

**Organized by CP Squad in association with HacktoberFest**

Welcome to the CP Squad official website project! Build a stunning, modern website for our college club using Next.js.

---

## 📋 Table of Contenjs

- [Project Overview](#project-overview)
- [Design References](#design-references)
- [Features to Implement](#features-to-implement)
- [Technical Requiremenjs](#technical-requiremenjs)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Design Guidelines](#design-guidelines)
- [Page Specifications](#page-specifications)
- [Component Guidelines](#component-guidelines)
- [Contribution Workflow](#contribution-workflow)
- [Code Standards](#code-standards)
- [Submission Checklist](#submission-checklist)
- [Resources](#resources)
- [Support](#support)

---

## 🎯 Project Overview

Create a professional, visually stunning website for CP Squad that showcases our events, team members, and blog content. The website should reflect our club's technical excellence and community spirit through modern design and smooth user experience.

**Difficulty Level:** Intermediate

**Estimated Time:** 20-35 hours

**Tech Stack:** Next.js 14+ (App Router), React, JavaScript, Tailwind CSS

**Design Inspiration:**
- **Primary Reference:** [Delta Force NIT Trichy](https://delta.nitt.edu/) - Follow design style strictly
- **Secondary Reference:** [CodeMate AI](https://deploy-preview-23--codemate-landing-page-nextjs.netlify.app/) - Modern UI inspiration
---

## 🎨 Design References

### Delta Force (Primary Reference - Strict)
**Key Design Elements to Follow:**
- Dark theme with bold typography
- Large, impactful hero sections
- Minimalist color palette (dark backgrounds, accent colors)
- Grid-based layouts for content sections
- Smooth scroll animations
- Clean card-based designs for projects/events
- Terminal/code aesthetic Elements
- Bold headings with underscores (`_`)
- Monospace fonts for technical feel
- Hover effects with smooth transitions

**Color Scheme (similar to Delta):**
- Background: Very dark (`#0a0a0a`, `#111111`)
- Text: White/Off-white (`#ffffff`, `#f5f5f5`)
- Accent: Bright colors (`#5b278d`, `#a93eff`)
- Cards: Subtle dark grey (`#1a1a1a`, `#252525`)

**Typography Style:**
- Large, bold headings with uppercase
- Technical/monospace fonts for code-related text
- Clean sans-serif for body text
- Generous spacing and padding

### CodeMate AI (Secondary - Inspiration Only)
**Elements to Draw Inspiration From:**
- Modern, gradient accents
- Smooth animations and transitions
- Professional layout structure
- Clean component organization
- Responsive grid systems

**Note:** Use CodeMate for modern UI inspiration but maintain Delta's dark, technical aesthetic as the primary design language.

---

## ✨ Features to Implement

### Core Pages & Navigation
- [ ] Landing/Home page with hero section
- [ ] events page with event cards
- [ ] Members page with team profiles
- [ ] Blogs page with articles
- [ ] Navigation bar with smooth scrolling
- [ ] Footer with social links and contact info
- [ ] Mobile-responsive hamburger menu

### Home Page Features
- [ ] Hero section with club introduction
- [ ] "What We Do" section
- [ ] Featured events showcase
- [ ] Recent blog posts preview
- [ ] Call-to-action sections
- [ ] Statistics/achievements counter
- [ ] Smooth scroll animations

### events Page
- [ ] Event cards with images
- [ ] Event categories/filters (upcoming, past, workshops)
- [ ] Event details modal or dedicated pages
- [ ] Search/filter functionality
- [ ] Calendar integration view
- [ ] Event registration links
- [ ] Image gallery for past events

### Members Page
- [ ] Team member cards with photos
- [ ] Member roles/positions
- [ ] Social media links per member
- [ ] Filter by batch/year
- [ ] Search functionality
- [ ] Grid/list view toggle
- [ ] Core team vs members sections

### Blogs Page
- [ ] Blog post cards with thumbnails
- [ ] Categories/tags filtering
- [ ] Search functionality
- [ ] Read time estimation
- [ ] Author information
- [ ] Date sorting (newest first)
- [ ] Pagination or infinite scroll
- [ ] Individual blog post pages with Markdown support

### Additional Features
- [ ] Loading states and skeletons
- [ ] 404 error page (creative design)
- [ ] SEO optimization (meta tags, Open Graph)
- [ ] Performance optimization
- [ ] Accessibility features (ARIA labels, keyboard navigation)
- [ ] Smooth page transitions
- [ ] Back-to-top button

---

## 🛠 Technical Requirements

### Mandatory Stack

**Framework & Core:**
- Next.js 14+ with App Router
- React 18+
- Javascript (strongly recommended)
- Tailwind CSS for styling

**Recommended Libraries:**
- `framer-motion` - Animations and transitions
- `next/image` - Optimized image loading
- `react-icons` or `lucide-react` - Icons
- `gray-matter` + `remark` - Markdown blog parsing
- `date-fns` - Date formatting

**Optional Enhancements:**
- `swiper` - Carousels/sliders
- `react-intersection-observer` - Scroll animations
- `next-seo` - SEO optimization
- `react-markdown` - Markdown rendering

### Folder Structure (Next.js App Router)
```
cp-squad-website/
│
├── public/
│   ├── images/
│   ├── blog-images/
│   ├── team-photos/
│   └── event-images/
│
├── src/
│   ├── app/
│   │   ├── layout.jsx          # Root layout
│   │   ├── page.jsx            # Home page
│   │   ├── events/
│   │   │   ├── page.jsx        # events listing
│   │   │   └── [slug]/
│   │   │       └── page.jsx    # Individual event
│   │   ├── members/
│   │   │   └── page.jsx        # Members page
│   │   ├── blogs/
│   │   │   ├── page.jsx        # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.jsx    # Individual blog post
│   │   └── not-found.jsx       # 404 page
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── MobileMenu.jsx
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── WhatWeDo.jsx
│   │   │   └── Featuredevents.jsx
│   │   ├── events/
│   │   │   ├── EventCard.jsx
│   │   │   └── EventFilters.jsx
│   │   ├── members/
│   │   │   ├── MemberCard.jsx
│   │   │   └── MemberGrid.jsx
│   │   └── blogs/
│   │       ├── BlogCard.jsx
│   │       └── BlogPost.jsx
│   │
│   ├── lib/
│   │   ├── data/
│   │   │   ├── events.js       # Event data
│   │   │   ├── members.js      # Member data
│   │   │   └── blogs.js        # Blog data/fetcher
│   │   └── utils.js            # Helper functions
│   │
│   ├── styles/
│   │   └── globals.css         # Global styles
│   │
│   └── types/
│       └── index.js            # Javascript types
│
├── content/                    # Markdown blog posts
│   └── blogs/
│       ├── post-1.md
│       └── post-2.md
│
├── tailwind.config.js
├── next.config.js
├── jsconfig.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Git and GitHub account
- Basic knowledge of React and Next.js
- Code editor (VS Code recommended)

### Initial Setup

1. **Fork the Repository**
   ```bash
   # Click 'Fork' button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/cp-squad-website.git
   cd cp-squad-website
   ```

3. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. **Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # Example: git checkout -b feature/events-page
   ```

---

## 📐 Design Guidelines

### Color Palette (Strictly Follow Delta Style)

```css
/* Primary Colors */
--background: #0a0a0a;        /* Main background */
--surface: #1a1a1a;           /* Cards, sections */
--surface-light: #252525;     /* Hover states */

/* Text Colors */
--text-primary: #ffffff;      /* Main text */
--text-secondary: #a0a0a0;    /* Secondary text */
--text-muted: #666666;        /* Muted text */

/* Accent Colors */
--accent-dark-purple: #5b278d   /* Primary accent */ 
--accent-light-purple: #a93eff  /* Secondary accent */


/* Status Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
```

### Typography

```css
/* Font Families */
--font-heading: 'Inter', 'Space Grotesk', sans-serif;  /* Bold headings */
--font-body: 'Inter', system-ui, sans-serif;           /* Body text */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace; /* Code/technical */

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```


## 📄 Page Specifications

### 1. Home Page (`/`)

**Hero Section:**
- Full viewport height
- Club name with large, bold typography
- Tagline/mission statement
- CTA buttons (Join Us, View events)
- Background: Dark with subtle gradient or pattern
- Animated text or Elements

**What We Do Section:**
```
Layout: 3-column grid
Content:
- Competitive Programming
- Web Development
- Workshops & events

Style: Cards with icons, title, description
```

**Featured events:**
- Horizontal scrolling cards or grid
- Show 3-4 upcoming/recent events
- Event image, title, date
- Link to events page

**Recent Blogs:**
- Grid of 3 latest blog posts
- Thumbnail, title, excerpt, author
- Link to Blogs page

**Statistics Section:**
```
Members: 150+
events Conducted: 50+
Projects: 30+
Years Active: X
```

**Call-to-Action:**
- Join our Discord/Community
- Follow us on socials
- Newsletter signup (optional)

---

### 2. events Page (`/events`)

**Layout:**
```
[Filters/Categories]
[Search Bar]

[Event Grid - 3 columns desktop, 2 tablet, 1 mobile]
- Event Card 1
- Event Card 2
- Event Card 3
...

[Pagination or Load More]
```

**Event Card Structure:**
```jsx (javascript react code)
<EventCard>
  <Image />
  <Category Badge /> // Upcoming, Workshop, Competition
  <Title />
  <Date & Time />
  <Description Excerpt />
  <CTA Button /> // View Details / Register
</EventCard>
```

**Filters:**
- All events
- Upcoming
- Past
- Workshops
- Competitions
- Hackathons

**Event Detail Page (`/events/[slug]`):**
- Hero image
- Full event description
- Date, time, venue
- Registration link/button
- Organizers/speakers
- Gallery (if past event)
- Related events

---

### 3. Members Page (`/members`)

**Structure:**
```
[Hero with Team Photo/Banner]

[Core Team Section]
- President
- Vice President
- Technical Head
- Event Coordinator
- etc.

[Filter Options]
- All Members
- By Year (2024, 2023, etc.)
- By Role

[Member Grid - 4 columns desktop]
```

**Member Card:**
```jsx
<MemberCard>
  <Photo /> // Circular or square with hover effect
  <Name />
  <Role/Position />
  <Batch/Year />
  <Social Links /> // LinkedIn, GitHub, Twitter
</MemberCard>
```

**Hover Effect:**
- Scale up slightly
- Show additional info overlay
- Smooth transition

---

### 4. Blogs Page (`/blogs`)

**Layout:**
```
[Hero Section]
"CP SQUAD BLOGS_"
"Insights, tutorials, and stories from our community"

[Categories/Tags]
[Search Bar]

[Blog Grid - 3 columns desktop]
- Blog Card 1
- Blog Card 2
...

[Pagination]
```

**Blog Card:**
```jsx
<BlogCard>
  <Thumbnail Image />
  <Category Badge />
  <Title />
  <Excerpt />
  <Author Info />
  <Date />
  <Read Time />
  <Read More Link />
</BlogCard>
```

**Blog Post Page (`/blogs/[slug]`):**
- Hero image
- Title with large typography
- Author info with photo
- Date published
- Reading time
- Full content (Markdown rendered)
- Code syntax highlighting
- Table of contents (for long posts)
- Share buttons
- Related posts
- Comments section (optional)

**Markdown Support:**
- Headings (H1-H6)
- Code blocks with syntax highlighting
- Images
- Lists (ordered/unordered)
- Blockquotes
- Links
- Tables

---

## 🧩 Component Guidelines

### Navbar Component

```jsx
<Navbar>
  <Logo /> // CP Squad logo
  <NavLinks>
    <Link href="/">Home</Link>
    <Link href="/events">events</Link>
    <Link href="/members">Members</Link>
    <Link href="/blogs">Blogs</Link>
  </NavLinks>
  <ThemeToggle /> // Optional
  <MobileMenuButton />
</Navbar>
```

**Behavior:**
- Sticky/fixed position
- Transparent on top, solid on scroll
- Smooth scroll to sections
- Active link highlighting
- Hamburger menu for mobile

---

### Footer Component

```jsx
<Footer>
  <TopSection>
    <About Column>
      <Logo />
      <Description />
    </About>
    <Quick Links>
      <Link to pages />
    </Quick Links>
    <Contact Info>
      <Email />
      <Location />
    </Contact Info>
    <Social Media>
      <Icons with links />
    </Social Media>
  </TopSection>
  
  <BottomSection>
    <Copyright />
    <Credits /> // Built by CP Squad
  </BottomSection>
</Footer>
```

---

### Reusable components

**Button:**
```jsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}
```

**Card:**
```jsx
interface CardProps {
  title?: string;
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}
```

**Badge:**
```jsx
interface BadgeProps {
  text: string;
  color: 'green' | 'blue' | 'purple' | 'red';
}
```

---

## 🔄 Contribution Workflow

### Step-by-Step Process

1. **Choose a Task**
   - Check [Issues](link-to-issues) tab
   - Labels: `design`, `frontend`, `content`, `good-first-issue`
   - Comment to claim
   - Wait for assignment

2. **Design Review (for UI work)**
   - Create mockup/wireframe if designing new page
   - Share in discussion for feedback
   - Get approval before coding

3. **Development**
   - Follow design guidelines strictly
   - Make it responsive (mobile-first)
   - Test on different screen sizes

4. **Content Addition**
   - For events/members: Update data files
   - For blogs: Create Markdown in `/content/blogs/`
   - Optimize images (use Next.js Image)

5. **Testing**
   - Run `npm run build` to check for errors
   - Test all links and navigation
   - Check responsive design
   - Verify animations work smoothly
   - Test on different browsers

6. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: add events page with filtering"
   git push origin feature/your-branch
   ```

7. **Pull Request**
   - Clear description with screenshots
   - Link to issue
   - Mention design references used
   - List what you tested

---

## 📏 Code Standards (Just for example)

### Javascript Usage

**Define Types:**
```Javascript
// types/index.js
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category: 'workshop' | 'competition' | 'hackathon';
  registrationLink?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  batch: string;
  photo: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  thumbnail: string;
}
```

### Component Structure

```jsx
'use client'; // Only if using client-side features

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ComponentProps {
  title: string;
  description?: string;
}

export default function Component({ title, description }: ComponentProps) {
  const [state, setstate] = useState<boolean>(false);
  
  return (
    <motion.section className="py-section">
      <h2 className="text-4xl font-bold">{title}</h2>
      {description && <p className="text-secondary">{description}</p>}
    </motion.section>
  );
}
```

### Naming Conventions

**Files:**
- components: PascalCase (`EventCard.jsx`)
- Pages: lowercase (`page.jsx`)
- Utilities: camelCase (`helpers.js`)

**CSS Classes (Tailwind):**
- Use semantic grouping
- Responsive classes: `md:`, `lg:`, `xl:`
- Dark mode: `dark:` (if implementing)

**Variables & Functions:**
```Javascript
// Constants: UPPER_SNAKE_CASE
const MAX_events_PER_PAGE = 9;

// Variables: camelCase
const eventData = [];

// Functions: camelCase with verb
function fetchevents() {}

// components: PascalCase
function EventCard() {}
```

### Best Practices

1. **Use Next.js Image Component:**
```jsx
import Image from 'next/image';

<Image
  src="/images/event.jpg"
  alt="Event description"
  width={600}
  height={400}
  className="rounded-lg"
  priority // for above-the-fold images
/>
```

2. **Server vs Client components:**
- Default to Server components
- Use `'use client'` only when needed (state, effects, browser APIs)

3. **Data Fetching:**
```jsx
// Server Component (recommended)
async function eventsPage() {
  const events = await fetchevents(); // Server-side
  
  return <eventsList events={events} />;
}
```

4. **Responsive Design:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
</div>
```

5. **Accessibility:**
```jsx
<button
  aria-label="Open menu"
  className="..."
>
  <Icon />
</button>

<img alt="Descriptive text" />
```

---

## ✅ Submission Checklist

**Design & UI**
- [ ] Follows Delta Force design aesthetic
- [ ] Dark theme implemented correctly
- [ ] Colors match the specified palette
- [ ] Typography follows guidelines
- [ ] Animations are smooth and purposeful
- [ ] Hover effects work properly

**Functionality**
- [ ] All navigation links work
- [ ] Mobile menu functions correctly
- [ ] Filters/search work (if applicable)
- [ ] Images load optimally
- [ ] No console errors
- [ ] Forms validate properly (if applicable)

**Responsiveness**
- [ ] Mobile (320px - 768px) ✓
- [ ] Tablet (768px - 1024px) ✓
- [ ] Desktop (1024px+) ✓
- [ ] Large screens (1440px+) ✓
- [ ] Hamburger menu on mobile ✓

**Performance**
- [ ] Images optimized (Next.js Image)
- [ ] No unnecessary client components
- [ ] Build succeeds without errors
- [ ] Lighthouse score > 90 (run test)
- [ ] Fast page load times

**Code Quality**
- [ ] Javascript types defined
- [ ] No unused imports
- [ ] components are reusable
- [ ] Code is well-commented
- [ ] Follows folder structure
- [ ] No hardcoded values (use constants)

**SEO & Accessibility**
- [ ] Meta tags added
- [ ] Alt text for images
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works

**Testing**
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari (if available)
- [ ] Tested on mobile device
- [ ] All links verified

**Git**
- [ ] Meaningful commit messages
- [ ] Branch up to date with main
- [ ] No merge conflicjs
- [ ] `.env` not committed
- [ ] Images compressed before commit

---

## 📚 Resources

### Next.js Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Metadata & SEO](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

### Design & UI
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React Icons](https://lucide.dev/)
- [Coolors - Color Palette](https://coolors.co/)

### Design References
- [Delta Force Website](https://delta.nitt.edu/) - Primary reference


---

## 🎨 Content Guidelines

> **IMPORTANT:** For development purposes, contributors should use **dummy/sample data** for events, members, and blogs. Real data will be added by the CP Squad team later.

### Using Dummy Data

**For events:**
Create entry in `src/lib/data/events.js` with sample data:
```Javascript
export const events: Event[] = [
  {
    id: 'event-1',
    title: 'CodeFest 2024',
    description: 'Annual coding competition featuring algorithmic challenges, problem-solving rounds, and exciting prizes. Open to all skill levels.',
    date: '2024-12-15',
    image: '/images/events/codefest-2024.jpg', // Use placeholder images
    category: 'competition',
    registrationLink: 'https://forms.google.com/sample'
  },
  {
    id: 'event-2',
    title: 'Web Development Workshop',
    description: 'Learn modern web development with React and Next.js. Hands-on session with real projecjs.',
    date: '2024-11-20',
    image: '/images/events/web-workshop.jpg',
    category: 'workshop',
    registrationLink: 'https://forms.google.com/sample'
  },
  {
    id: 'event-3',
    title: 'HackSquad 2024',
    description: '24-hour hackathon to build innovative solutions. Team up and create something amazing!',
    date: '2024-10-30',
    image: '/images/events/hacksquad.jpg',
    category: 'hackathon',
    registrationLink: 'https://forms.google.com/sample'
  },
  // Add 5-8 more dummy events for testing
];
```

**Placeholder Images for events:**
Use free stock photo sites or placeholder services:
- [Unsplash](https://unsplash.com/) - Free high-quality images
- [Pexels](https://pexels.com/) - Free stock photos
- [Placeholder.com](https://placeholder.com/) - Simple placeholders (e.g., `https://via.placeholder.com/600x400`)
- [Lorem Picsum](https://picsum.photos/) - Random images (e.g., `https://picsum.photos/600/400`)

---

**For Members:**
Update `src/lib/data/members.js` with dummy profiles:
```Javascript
export const members: Member[] = [
  {
    id: 'member-1',
    name: 'Alex Johnson',
    role: 'President',
    batch: '2024',
    photo: '/images/team/alex-johnson.jpg', // Use avatar placeholders
    socials: {
      linkedin: 'https://linkedin.com/in/sample',
      github: 'https://github.com/sample',
      twitter: 'https://twitter.com/sample'
    }
  },
  {
    id: 'member-2',
    name: 'Sarah Williams',
    role: 'Technical Lead',
    batch: '2024',
    photo: '/images/team/sarah-williams.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/sample',
      github: 'https://github.com/sample'
    }
  },
  {
    id: 'member-3',
    name: 'Raj Patel',
    role: 'Event Coordinator',
    batch: '2023',
    photo: '/images/team/raj-patel.jpg',
    socials: {
      linkedin: 'https://linkedin.com/in/sample',
      github: 'https://github.com/sample'
    }
  },
  // Add 10-15 more dummy members for testing
];
```

**Placeholder Images for Members:**
Use avatar generators:
- [UI Avatars](https://ui-avatars.com/) - Generate avatar from name: `https://ui-avatars.com/api/?name=Alex+Johnson&size=200`
- [DiceBear](https://dicebear.com/) - Diverse avatar styles
- [Lorem Faces](https://loremfaces.com/) - Random face photos
- [Pravatar](https://pravatar.cc/) - Random avatar (e.g., `https://i.pravatar.cc/300`)

---

**For Blogs:**
Create sample Markdown files in `content/blogs/`:

**Example 1: `content/blogs/getting-started-with-cp.md`**
```markdown
---
title: "Getting Started with Competitive Programming"
author: "Alex Johnson"
date: "2024-10-15"
category: "Tutorial"
thumbnail: "/images/blogs/cp-guide.jpg"
excerpt: "A comprehensive guide to starting your competitive programming journey. Learn the basics, practice strategies, and resources."
---

# Getting Started with Competitive Programming

Competitive Programming (CP) is an exciting way to improve your problem-solving skills and algorithmic thinking. In this guide, we'll cover everything you need to know to begin your CP journey.

## Why Competitive Programming?

Competitive programming helps you:
- Develop strong problem-solving skills
- Master data structures and algorithms
- Prepare for technical interviews
- Join a global community of coders

## Essential Topics to Learn

### 1. Basic Programming Concepjs
Start with understanding variables, loops, conditionals, and functions.

### 2. Data Structures
- Arrays and Strings
- Linked Lisjs
- Stacks and Queues
- Trees and Graphs
- Hash Tables

### 3. Algorithms
- Sorting and Searching
- Recursion and Backtracking
- Dynamic Programming
- Greedy Algorithms
- Graph Algorithms

## Practice Platforms

Here are some great platforms to practice:
1. **Codeforces** - Regular contesjs and large problem archive
2. **LeetCode** - Interview preparation focused
3. **CodeChef** - Monthly long contesjs
4. **AtCoder** - High-quality problems

## Sample Problem

Let's solve a simple problem:

```cpp
// Two Sum Problem
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}
```

**Create 5-8 more sample blog posts covering:**
- Algorithm tutorials
- Project showcases
- Interview experiences
- Technology reviews
- Event recaps
- Learning resources
- Career advice

---

### Image Placeholders

**For Blog Thumbnails:**
- Use tech-related images from Unsplash
- Search terms: "coding", "programming", "technology", "developer"
- Recommended size: 1200x630px (good for social sharing)
- Or use: `https://source.unsplash.com/1200x630/?programming,coding`

**Quick Setup for Images:**
```bash
# Create image folders
mkdir -p public/images/{events,team,blogs}

# Download placeholder images or use placeholder services in your code
# For development, you can use direct URL placeholders
```

---

### Sample Data Best Practices

1. **Realistic Content** - Make dummy data look realistic for better testing
2. **Variety** - Include different categories, dates, formajs
3. **Sufficient Quantity** - Add enough data to test pagination, filters, etc.
4. **Valid Dates** - Use recent dates for events (mix of past, current, upcoming)
5. **Proper Formatting** - Follow the exact schema structure
6. **Commenjs** - Mark clearly as dummy data

**Example Comment in Code:**
```Javascript
// ⚠️ DUMMY DATA - Replace with real data before production
export const events: Event[] = [
  // Sample events for development and testing
  ...
];
```

---

## 🆘 Support

### Getting Help

**Questions?**
- Email: cpsquad@charusat.ac.in
  
*Or contact*
- Dev Shah (+91 93284 24234)
- Ujsav Savani (+91 7859829058)
- Dhairya Shah (+91 9924343003)
- Deep Patel (+91 70696 78031)

**Design Questions?**
- Share your mockups in discussions
- Ask for design feedback
- Reference Delta website for guidance

**Found a Bug?**
- Create issue with:
  - Steps to reproduce
  - Expected behavior
  - Screenshojs
  - Browser/device info
### Response Times
- General questions: 24-48 hours
- Design reviews: 2-3 days
- PR reviews: 3-5 days
- Bug reporjs: 48 hours

---

## 🏆 Recognition

**Contributors will receive:**
- Name on website contributors page
- Social media shoutout
- Early access to club events

**Special Recognition:**
- 🥇 Most Active Contributor
- 🎨 Best Design Implementation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](link-to-license) file for details.

---

## 🎉 Let's Build Something Beautiful!

This website will be the face of CP Squad to the world.
