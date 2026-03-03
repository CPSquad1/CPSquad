# Events Google Sheets Integration Guide

## Overview
The events page now fetches data directly from Google Sheets, making it easy to manage events without editing code.

## Google Sheets Setup

### 1. Sheet URL
**Example Sheet:** `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit?gid=YOUR_GID`

Replace `YOUR_SHEET_ID` and `YOUR_GID` with your actual Google Sheets identifiers. 

### 2. Required Columns
Your Google Sheet must have these column headers (order doesn't matter):

| Column Name | Required | Description | Example |
|------------|----------|-------------|---------|
| **Sr. No** | Optional | Serial number | 1, 2, 3... |
| **Event Title** | Required | Event name | "Coding Sessions" |
| **Date** | Required | Event date | "20-02-2023" |
| **Duration** | Optional | Event duration | "2 Hours", "3 Days" |
| **Event Type** | Required | Category | "Workshop", "Contest", "Session" |
| **Event Description** | Required | Brief description | "Introductory coding sessions..." |
| **Event Level** | Optional | Difficulty level | "Beginner", "Advanced", "University" |
| **Expert Name** | Optional | Speaker/facilitator | "Dr. John Doe" or "-" |
| **Affiliation** | Optional | Organization | "Google", "DA-IICT" or "-" |
| **Participants** | Optional | Number of attendees | 50, 100, 200 |
| **Academic Year** | Optional | Year of event | "2023-24", "2024-25" |
| **Link of Data** | Optional | Additional resources | URL |
| **Brochure** | Optional* | Main event image | Google Drive link |
| **PHOTO 1** | Optional* | Story image 1 | Google Drive link |
| **PHOTO 2** | Optional* | Story image 2 | Google Drive link |
| **PHOTO 3** | Optional* | Story image 3 | Google Drive link |
| **PHOTO 4** | Optional* | Story image 4 | Google Drive link |
| **PHOTO 5** | Optional* | Story image 5 | Google Drive link |
| **PHOTO 6** | Optional* | Story image 6 | Google Drive link |
| **PHOTO 7** | Optional* | Story image 7 | Google Drive link |
| **PHOTO 8** | Optional* | Story image 8 | Google Drive link |

\* At least one image (Brochure or PHOTO 1-8) is recommended for best display

### 3. Making Sheet Publicly Accessible

**IMPORTANT:** The sheet must be publicly accessible for the website to fetch data.

1. Click "Share" button in Google Sheets
2. Under "Get link", click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Click "Copy link"

## Google Drive Image Setup

### Image Columns Explained

- **Brochure**: Main event card image (shown in events listing)
- **PHOTO 1-8**: Story visualization images (shown on event detail page)

### Getting Image Links

1. **Upload images to Google Drive**
   - Recommended: Create a folder named "CP Squad Events"
   - Upload event photos/brochures

2. **Get shareable link**
   - Right-click the image → "Share" → "Get link"
   - Set to "Anyone with the link can view"
   - Copy the link

3. **Use the link in spreadsheet**
   - Paste the full Google Drive link in the respective column
   - The system automatically converts it to Google's CDN URL for reliable embedding

### Supported Image Link Formats
```
✅ https://drive.google.com/file/d/ABC123XYZ/view
✅ https://drive.google.com/file/d/ABC123XYZ/view?usp=sharing
✅ https://drive.google.com/file/d/ABC123XYZ/view?usp=drive_link
✅ https://drive.google.com/open?id=ABC123XYZ
✅ https://lh3.googleusercontent.com/d/ABC123XYZ (auto-generated)
✅ Any direct image URL (http://example.com/image.jpg)
```

**Note:** The system converts all Drive URLs to `https://lh3.googleusercontent.com/d/FILE_ID` which uses Google's CDN for reliable, fast image loading.

**Important:** Ensure your Google Drive images have "Anyone with the link can view" permissions enabled.

## Example Data Row

| Sr. No | Event Title | Date | Duration | Event Type | Event Description | Expert Name | Affiliation | Brochure | PHOTO 1 | PHOTO 2 | PHOTO 3 |
|--------|-------------|------|----------|------------|-------------------|-------------|-------------|----------|---------|---------|---------|
| 1 | Coding Workshop 2024 | 15-03-2024 | 3 Hours | Workshop | Learn fundamentals of competitive programming | Dr. Jane Smith | MIT | https://drive.google.com/file/d/MOCK_ID_001/view | https://drive.google.com/file/d/MOCK_ID_002/view | https://drive.google.com/file/d/MOCK_ID_003/view | https://drive.google.com/file/d/MOCK_ID_004/view |
| 2 | Hackathon 2024 | 20-04-2024 | 2 Days | Contest | 48-hour coding challenge | - | - | https://drive.google.com/file/d/MOCK_ID_005/view | https://drive.google.com/file/d/MOCK_ID_006/view | https://drive.google.com/file/d/MOCK_ID_007/view | https://drive.google.com/file/d/MOCK_ID_008/view |
| 3 | Tech Talk Series | 10-05-2024 | 2 Hours | Session | Industry insights and trends | John Doe | Google | https://drive.google.com/file/d/MOCK_ID_009/view | https://drive.google.com/file/d/MOCK_ID_010/view | https://drive.google.com/file/d/MOCK_ID_011/view | - |

## How It Works

### Data Flow
1. User visits `/events` or `/events/[event-slug]`
2. Website fetches CSV data from Google Sheets
3. Data is parsed and transformed to event objects
4. Google Drive image links are automatically converted to direct URLs
5. Events are displayed in grid layout or story visualization

### Story Visualization
- If an event has PHOTO 1-8 images, the **EventStoryVisualization** component is used
- Images are displayed in an artistic flowing layout
- If no story images, falls back to legacy detail page layout

### Caching
- Data is fetched fresh on each page load (`cache: 'no-store'`)
- Changes to Google Sheets are reflected immediately
- No need to rebuild or redeploy the website

### Error Handling
- If Google Sheets is unavailable, empty array is returned
- Missing images show placeholder or first available image
- Invalid events are filtered out automatically

## Updating Events

### Adding a New Event
1. Open Google Sheets
2. Add a new row with all required fields
3. Upload event images to Google Drive (get links)
4. Paste the Drive links in PHOTO columns
5. Save (changes are automatic)
6. Refresh the website to see changes

### Updating Existing Event
1. Find the event row in Google Sheets
2. Edit any field as needed
3. Changes appear immediately after page refresh

### Removing an Event
1. Delete the entire row from Google Sheets
2. It will disappear on next page load

## Troubleshooting

### Images Not Showing
- ✅ Check if Google Drive link has public access ("Anyone with link can view")
- ✅ Verify link format is correct
- ✅ Check browser console for errors
- ✅ Ensure image files exist and aren't deleted

### Event Not Appearing
- ✅ Verify sheet is publicly accessible
- ✅ Check column names match exactly (case-sensitive)
- ✅ Ensure "Event Title" is not empty
- ✅ Check Sheet ID and GID in `.env.local`

### Story Images Not Loading
- ✅ Verify PHOTO 1-8 columns have valid image links
- ✅ Check that at least one PHOTO column has data
- ✅ Ensure images have public sharing enabled

### Slug Generation
- Event slugs are auto-generated from titles (lowercase, hyphens)
- Example: "Coding Sessions" → "coding-sessions"
- Ensure titles are unique to avoid slug conflicts

## Configuration

### Environment Variables

The Google Sheets configuration is stored in environment variables.

**File:** `.env.local`

```env
# Events Google Sheet
NEXT_PUBLIC_EVENTS_SHEET_ID=YOUR_GOOGLE_SHEET_ID_HERE
NEXT_PUBLIC_EVENTS_SHEET_GID=YOUR_SHEET_GID_HERE
```

**Example:**
```env
# Events Google Sheet
NEXT_PUBLIC_EVENTS_SHEET_ID=1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T
NEXT_PUBLIC_EVENTS_SHEET_GID=0
```

**To change to a different Google Sheet:**

1. Update the values in `.env.local` with your Sheet ID and GID
2. Restart the development server (`npm run dev`)

**Finding Your Sheet ID and GID:**
- Sheet ID: Found in URL between `/d/` and `/edit`
- GID: Found in URL after `#gid=`

## Best Practices

1. **Consistent Image Sizes**: Use similar aspect ratios for story images (recommended: 1200x800px)
2. **Brochure Image**: Always provide a main image for event cards
3. **Story Images**: Provide 3-8 images for best story visualization experience
4. **Clear Titles**: Use descriptive, unique event titles
5. **Complete Data**: Fill all available fields for rich event information
6. **Organize by Year**: Use Academic Year column to group events
7. **Public Access**: Always ensure Drive images have public viewing permissions

## Migration Notes

If you previously used hardcoded event data:
- Old `eventsDataClient.js` is no longer used
- All event data now comes from Google Sheets
- Image mapping is handled automatically via PHOTO columns
- No code changes needed to add/update events

## Support

For issues or questions:
1. Check this guide first
2. Verify Google Sheets permissions
3. Check browser console for error messages
4. Ensure `.env.local` has correct Sheet ID and GID
