This is a [Next.js](https://nextjs.org) project for **CP Squad Club** - A competitive programming community website.

## Features

- 🎯 **Dynamic Events Management** - Fetch events from Google Sheets
- 👥 **Contributors Showcase** - Team member profiles by year
- 📸 **Story Visualization** - Beautiful event photo galleries
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- ⚡ **Fast Performance** - Optimized with Next.js 15

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create `.env.local` file:

```env
# Events Google Sheet
NEXT_PUBLIC_EVENTS_SHEET_ID=YOUR_SHEET_ID
NEXT_PUBLIC_EVENTS_SHEET_GID=YOUR_GID

# Contributors Google Sheet  
NEXT_PUBLIC_SHEET_ID=YOUR_SHEET_ID
NEXT_PUBLIC_SHEET_GID=YOUR_GID
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
cpsquad/
├── app/
│   ├── contributors/       # Contributors pages
│   ├── events/            # Events pages
│   └── lib/               # Utility functions & data fetching
├── component/
│   ├── EventCard/         # Event card component
│   ├── EventStoryVisualization/  # Story layout
│   └── ...
└── public/                # Static assets
```

## Google Sheets Integration

This project uses Google Sheets as a CMS:

- **Events**: See [EVENTS_GOOGLE_SHEETS_SETUP.md](./EVENTS_GOOGLE_SHEETS_SETUP.md)
- **Contributors**: See [app/contributors/GOOGLE_SHEETS_SETUP.md](./app/contributors/GOOGLE_SHEETS_SETUP.md)

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - icon library

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Environment Variables:**
- Add your Google Sheets credentials in Vercel dashboard
- Set `NEXT_PUBLIC_EVENTS_SHEET_ID` and `NEXT_PUBLIC_EVENTS_SHEET_GID`
- Set `NEXT_PUBLIC_SHEET_ID` and `NEXT_PUBLIC_SHEET_GID` for contributors

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is maintained by CP Squad Club.
