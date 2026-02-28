# Events Page Setup Guide

## ✅ What Has Been Created

1. **EventCard Component** (`component/EventCard/EventCard.jsx`)
   - Similar design to BlogCard
   - Displays event information in card format
   - Links to individual event detail pages

2. **Events Page** (`app/events/page.js`)
   - Main events listing page
   - Filter by event type/category
   - Animated hero section similar to the reference
   - Grid layout for event cards

3. **Event Detail Page** (`app/events/[slug]/page.js`)
   - Dynamic route for individual events
   - Displays full event information including:
     - Date, Duration, Participants
     - Expert Speaker (if applicable)
     - Budget, Resources, Links
   - Professional layout with icons

4. **Event Data** (`app/lib/data/eventsDataClient.js`)
   - All events from Excel sheet converted to data structure
   - Ready to use with the pages

## 📸 Adding Event Images

You need to add images to display on the event cards. Place your event images in the following location:

```
cpsquad/public/images/
```

### Required Images:

Based on your events, create/add these images:

1. `coding-sessions.jpg` - For coding session events
2. `coders-arcade.jpg` - For Coder's Arcade contests
3. `expert-talk.jpg` - For expert talk events
4. `workshop.jpg` - For workshop events
5. `treasure-hunt.jpg` - For Data Structure Hunt
6. `team-selection.jpg` - For team selection events
7. `default-event.jpg` - Fallback image for any event

### Image Specifications:

- **Recommended size**: 1200x800 px
- **Format**: JPG, PNG, or WebP
- **Aspect ratio**: 3:2 (similar to blog cards)
- Make them visually appealing with tech/coding themes

## 🔄 How to Update Event Data

### Option 1: Manually Update eventsDataClient.js

Edit `app/lib/data/eventsDataClient.js` and update the image paths:

```javascript
{
  id: 1,
  title: "Coding Sessions",
  image: "/images/coding-sessions.jpg", // Update this path
  // ... other fields
}
```

### Option 2: Use Excel File (Advanced)

The file `app/lib/data/eventdata.js` can read directly from your Excel file. To use it:

1. Move your Excel file to the project root
2. Update the file path in `eventdata.js`:
   ```javascript
   const filePath = path.join(process.cwd(), 'CP SQUAD STATS.xlsx');
   ```
3. Convert the events page to server-side rendering
4. Import from `eventdata.js` instead of `eventsDataClient.js`

## 🎨 Customization

### Colors:
- Primary green: `#00FF41`
- Background: `#0a0a0a`
- Card background: `#1e1e1e`

### Fonts (already configured in layout.js):
- Headers: Geist Sans
- Body: System fonts
- Mono: Geist Mono

## 🚀 Testing

1. Navigate to `/events` to see all events
2. Click on any event card to view details
3. Use the filter dropdown to filter by event type
4. Check responsive design on different screen sizes

## 📝 Navigation

The Events link is already added to your navigation bar (NavLinks.jsx), so users can access it from:
- Desktop: Top navigation bar
- Mobile: Mobile menu

## 🔧 Future Enhancements

Consider adding:
- Image upload functionality
- Admin panel to manage events
- Registration forms for upcoming events
- Calendar view of events
- Search functionality
- Photo galleries for past events
