# Contributors Page

This section contains the contributors/team page for CP Squad. The page displays team members organized by year with a beautiful glass-morphism design inspired by Apple's UI/UX.

## Structure

- **Main Page**: `/contributors` - Displays all years with year cards
- **Year Pages**: `/contributors/2023`, `/contributors/2024`, `/contributors/2025` - Individual year pages with detailed team info

## Components

### YearCard
Located at: `component/YearCard/YearCard.jsx`

A clickable card that displays contributors for a specific year in an orbital layout around the CP Squad logo.

**Props:**
- `year` (string): The year (e.g., "2023")
- `contributors` (array): Array of contributor objects

### ContributorCard
Located at: `component/ContributorCard/ContributorCard.jsx`

Individual contributor node with tooltip and social links.

**Props:**
- `name` (string): Contributor's name
- `role` (string): Role (HOD, VPR, TM, PR, MAM, Member)
- `avatar` (string): Path to avatar image
- `description` (string): Brief description
- `github` (string): GitHub profile URL (optional)
- `linkedin` (string): LinkedIn profile URL (optional)
- `position` (object): Position { top: "50%", left: "50%" }
- `size` (string): "small", "medium", "large", "xlarge"

## Roles and Color Coding

- **HOD** (Head of Department): Green (#00FF41)
- **VPR** (Vice President): Green (#00FF41)
- **TM** (Technical Manager): Purple
- **PR** (Public Relations): Blue
- **MAM** (Member at Large): Cyan
- **Member**: Gray

## Adding Contributors

### 1. Add Contributor Images

Place contributor images in:
- `/public/images/contributors/2023/`
- `/public/images/contributors/2024/`
- `/public/images/contributors/2025/`

Recommended image specifications:
- Format: JPG or PNG
- Size: 400x400px minimum
- Square aspect ratio
- File naming: lowercase (e.g., `alex.jpg`, `sarah.jpg`)

### 2. Update Contributor Data

Edit the respective year page files:
- `app/contributors/2023/page.js`
- `app/contributors/2024/page.js`
- `app/contributors/2025/page.js`

Example contributor object:
```javascript
{
  id: 1,
  name: "John Doe",
  role: "HOD",
  avatar: "/images/contributors/2025/john.jpg",
  description: "Leading with innovation and passion",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe"
}
```

### 3. Update Main Contributors Page

Edit `app/contributors/page.js` to update the `contributorsData` object with the same contributor information.

## Design Features

- **Glass Morphism**: Transparent backgrounds with backdrop blur
- **Orbital Layout**: Contributors positioned in orbital rings around the logo
- **Glow Effects**: Ambient green glow effects on hover
- **Smooth Animations**: Fade-up animations on scroll
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Interactive Tooltips**: Hover to see contributor details
- **Social Links**: Direct links to GitHub and LinkedIn

## Customization

### Colors
The accent color is defined in `globals.css`:
- Primary: `#00FF41` (Matrix green)
- Hover: `#00DD35`

### Logo
The central logo is located at `/public/images/logo.png`. Replace this file to change the logo.

### Year Labels
To add a new year:
1. Create a new folder: `app/contributors/YYYY/`
2. Create `page.js` in that folder (copy from an existing year)
3. Add contributor data
4. Update the main `app/contributors/page.js` to include the new year card

## Navigation

The Contributors page is accessible via:
- Desktop navbar
- Mobile menu
- Direct URL: `/contributors`

## Tips

- Keep contributor descriptions concise (1-2 sentences)
- Use high-quality, professional headshots
- Maintain consistent image sizes
- Order contributors by importance (HOD, VPR, TM, PR, then Members)
- Update social links to maintain network connectivity
- The layout automatically adjusts for different numbers of contributors

## Support

For issues or questions, please contact the development team.
