# Google Drive Image Setup - Important Notes

## Why Images May Not Load

Google Drive images require proper sharing settings to load on external websites. If you're seeing initials instead of photos, follow these steps:

## Step-by-Step Fix

### 1. **Check File Sharing Permissions**

For EACH image file in Google Drive:

1. Right-click the image → Click "Share"
2. Under "General access" click "Restricted" 
3. Change to **"Anyone with the link"**
4. Ensure it says **"Viewer"** (not Editor)
5. Click "Done"

**Critical:** Without this setting, Drive blocks external websites from displaying images.

### 2. **Verify the Link Format**

After setting permissions, get the link:
- Right-click image → "Get link"
- Copy the link (should look like: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`)
- Paste this link in your Google Sheet's "Photo" column

### 3. **Alternative: Use Direct Image Hosting**

If Google Drive continues to cause issues, consider:

**Option A: Imgur** (Free, no account needed)
1. Go to https://imgur.com/upload
2. Upload image
3. Right-click uploaded image → "Copy image address"
4. Paste URL in Google Sheet (ends in `.jpg` or `.png`)

**Option B: Google Photos**
1. Upload to Google Photos
2. Open image → Click share icon
3. Copy link
4. Paste in Google Sheet

**Option C: Direct Image URLs**
- Any publicly accessible image URL will work
- Must end in `.jpg`, `.png`, `.gif`, or `.webp`

## Current URL Conversion

Your Google Drive links are automatically converted:
- **From:** `https://drive.google.com/file/d/FILE_ID/view`
- **To:** `https://lh3.googleusercontent.com/d/FILE_ID`

This uses Google's CDN for faster loading.

## Testing Your Setup

1. Add a contributor to the Google Sheet
2. Paste their Google Drive photo link
3. Make sure link has "Anyone with link" permissions
4. Refresh the contributors page
5. Image should appear within the circle

If you still see only initials, the file permissions aren't public.

## Troubleshooting

**Images show as initials:**
- ✅ Check: File has "Anyone with link can view"
- ✅ Check: Link is from Google Drive (contains `/file/d/` or `?id=`)
- ✅ Check: Image file exists and isn't deleted
- ✅ Try: Opening the link in an incognito browser window

**Some images work, others don't:**
- Check individual file permissions
- Ensure all images have public sharing enabled

**No images load at all:**
- Verify Google Sheet is publicly accessible
- Check browser console for errors
- Try alternative hosting (Imgur)

## Recommended Approach

For best reliability:
1. **Upload all contributor photos to a single Google Drive folder**
2. **Set the entire folder to "Anyone with link can view"**
3. **Get individual file links for the spreadsheet**
4. **Test one image first before adding all**

This ensures consistent permissions across all images.
