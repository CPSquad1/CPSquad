# Google Sheets Integration for Contributors

## Overview
The contributors page now fetches data directly from Google Sheets, making it easy to manage team members without editing code.

## Google Sheets Setup

### 1. Sheet URL
**Example Sheet:** `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit?gid=YOUR_GID`

Replace `YOUR_SHEET_ID` and `YOUR_GID` with your actual Google Sheets identifiers.

### 2. Required Columns
Your Google Sheet must have these column headers (order doesn't matter):

| Column Name | Required | Description | Example |
|------------|----------|-------------|---------|
| **Sr. No** | Optional | Serial number | 1, 2, 3... |
| **ID** | Required | Unique identifier | 1, 2, 3... |
| **Name** | Required | Full name | "John Doe" |
| **Role** | Required | Role/Position | HOD, VPR, TM, PR, MAM, Member |
| **Year** | Required | Contribution year | 2023, 2024, 2025 |
| **Photo** | Required | Google Drive image link | See below |
| **Linkdin** | Optional | LinkedIn profile URL | https://linkedin.com/in/username |


### 3. Role-Based Color Coding
Different roles display with different accent colors:
- **HOD** (Head of Department): Green
- **VPR** (Vice President): Green
- **TM** (Technical Manager): Purple
- **PR** (Public Relations): Blue
- **MAM** (Marketing/Management): Cyan
- **Member**: Gray

### 4. Making Sheet Publicly Accessible

**IMPORTANT:** The sheet must be publicly accessible for the website to fetch data.

1. Click "Share" button in Google Sheets
2. Under "Get link", click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Click "Copy link"

## Google Drive Image Setup

### Getting the Photo Link

1. **Upload image to Google Drive**
   - Recommended: Create a folder named "CP Squad Contributors"
   - Upload profile photos (recommended: 500x500px minimum)

2. **Get shareable link**
   - Right-click the image → "Share" → "Get link"
   - Set to "Anyone with the link can view"
   - Copy the link

3. **Use the link in spreadsheet**
   - Paste the full Google Drive link in the "Photo" column
   - Format: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing` or `https://drive.google.com/file/d/FILE_ID/view?usp=drive_link`
   - The system automatically converts it to Google's CDN URL for reliable embedding

### Image Link Formats (All Supported)
```
✅ https://drive.google.com/file/d/ABC123XYZ/view
✅ https://drive.google.com/file/d/ABC123XYZ/view?usp=sharing
✅ https://drive.google.com/file/d/ABC123XYZ/view?usp=drive_link
✅ https://drive.google.com/open?id=ABC123XYZ
✅ https://lh3.googleusercontent.com/d/ABC123XYZ (auto-generated)
```

**Note:** The system converts all Drive URLs to `https://lh3.googleusercontent.com/d/FILE_ID` which uses Google's CDN for reliable, fast image loading.

**Important:** Ensure your Google Drive images have "Anyone with the link can view" permissions enabled.

## Example Data Row

| Sr. No | ID | Name | Role | Year | Photo | Linkdin |
|--------|----|----- |------|------|-------|---------|
| 1 | 1 | Alex Rivera | HOD | 2025 | https://drive.google.com/file/d/MOCK_ID_001/view | https://linkedin.com/in/alexrivera |
| 2 | 2 | Sarah Chen | VPR | 2025 | https://drive.google.com/file/d/MOCK_ID_002/view | https://linkedin.com/in/sarahchen |
| 3 | 3 | Jordan Smith | TM | 2025 | https://drive.google.com/file/d/MOCK_ID_003/view | https://linkedin.com/in/jordansmith |
| 4 | 4 | Maya Patel | PR | 2024 | https://drive.google.com/file/d/MOCK_ID_004/view | https://linkedin.com/in/mayapatel |
| 5 | 5 | Chris Wong | Member | 2024 | https://drive.google.com/file/d/MOCK_ID_005/view | |

## How It Works

### Data Flow
1. User visits `/contributors` or `/contributors/2025`
2. Website fetches CSV data from Google Sheets
3. Data is parsed and filtered by year
4. Google Drive image links are automatically converted to direct URLs
5. Contributors are displayed with random non-overlapping positions

### Caching
- Data is fetched fresh on each page load (`cache: 'no-store'`)
- Changes to Google Sheets are reflected immediately
- No need to rebuild or redeploy the website

### Error Handling
- If Google Sheets is unavailable, empty array is returned
- Missing data shows gracefully (e.g., no image = initials)
- Invalid years are filtered out automatically

## Updating Contributors

### Adding a New Contributor
1. Open Google Sheets
2. Add a new row with all required fields
3. Upload their photo to Google Drive (get link)
4. Paste the Drive link in "Photo" column
5. Save (changes are automatic)
6. Refresh the website to see changes

### Updating Existing Contributor
1. Find their row in Google Sheets
2. Edit any field as needed
3. Changes appear immediately after page refresh

### Removing a Contributor
1. Delete their entire row from Google Sheets
2. They will disappear on next page load

## Troubleshooting

### Images Not Showing
- ✅ Check if Google Drive link has public access
- ✅ Verify link format is correct
- ✅ Check browser console for errors

### No Contributors Appearing
- ✅ Verify sheet is publicly accessible
- ✅ Check column names match exactly (case-sensitive)
- ✅ Ensure "Year" column has valid values (2023, 2024, 2025)
- ✅ Check Sheet ID and GID in `fetchContributors.js`

### Wrong Year Filtering
- ✅ Verify "Year" column values are exact matches (2023, 2024, or 2025)
- ✅ Remove any extra spaces in Year cells

## Configuration

### Environment Variables (Recommended)

The Google Sheets configuration is stored in environment variables for security.

**File:** `.env.local`

```env
NEXT_PUBLIC_SHEET_ID=YOUR_GOOGLE_SHEET_ID_HERE
NEXT_PUBLIC_SHEET_GID=YOUR_SHEET_GID_HERE
```

**Example:**
```env
NEXT_PUBLIC_SHEET_ID=1a2B3c4D5e6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T
NEXT_PUBLIC_SHEET_GID=0
```

**To change to a different Google Sheet:**

1. Copy `.env.example` to `.env.local` (if not already done)
2. Update the values in `.env.local` with your Sheet ID and GID
3. Restart the development server (`npm run dev`)

**Finding Your Sheet ID and GID:**
- Sheet ID: Found in URL between `/d/` and `/edit`
- GID: Found in URL after `#gid=`
- Example URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit#gid=[GID]`

**Note:** `.env.local` is already in `.gitignore` and will not be committed to version control.

## Best Practices

1. **Consistent Naming:** Use exact role names (HOD, VPR, TM, PR, MAM, Member)
2. **Image Quality:** Upload high-quality photos (min 500x500px)
3. **Regular Updates:** Keep data current each year
4. **Backup:** Keep a backup copy of your Google Sheet
5. **Testing:** After adding data, refresh the website to verify

## Sheet Template

Create a new sheet with these headers:

```
Sr. No | ID | Name | Role | Year | Photo | Linkdin
```

Then share it publicly and update the SHEET_ID in the config.

---

**Need Help?** Check the browser console for detailed error messages or contact the development team.
