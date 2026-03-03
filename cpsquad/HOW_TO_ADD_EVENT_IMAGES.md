# How to Add Event Images

This guide explains how to add event images from your Google Drive folder to the website.

## 📸 Quick Start (3 Steps)

### Step 1: Get File IDs from Google Drive

1. Open your events folder in Google Drive (e.g., `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`)

2. Navigate to an event folder (e.g., "Coding Workshop 2024")

3. Open the **brochure** or **photos** subfolder

4. For each image:
   - Right-click > **Get link** (or Share)
   - Copy the link
   - Extract the FILE_ID

**Example:**
```
Link: https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789/view
File ID: 1aBcDeFgHiJkLmNoPqRsTuVwXyZ123456789
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         Copy this part!
```

### Step 2: Add File IDs to eventImageMap.js

Open `app/lib/eventImageMap.js` and paste your file IDs:

```javascript
'coders-arcade-1-0': {
  brochure: 'YOUR_BROCHURE_FILE_ID',  // First image from brochure folder
  storyImages: [
    'PHOTO_FILE_ID_1',
    'PHOTO_FILE_ID_2',
    'PHOTO_FILE_ID_3',
    // ... up to 8 images from photos folder
  ]
},
```

### Step 3: Test Your Images

```bash
# Test the configuration
node app/lib/eventImageMap.js

# Test in the full events data
node app/lib/testDriveEvents.js

# View in browser
# Open test-events.html in your browser
```

## 📂 Folder Structure Expected

```
Events/
├── Coding Sessions/
│   ├── brochure/
│   │   └── image.jpg       ← Get this file ID for brochure
│   └── photos/
│       ├── photo1.jpg      ← Get these IDs for storyImages
│       ├── photo2.jpg
│       └── photo3.jpg
├── Coder's Arcade 1.0/
│   ├── brochure/
│   │   └── poster.png
│   └── photos/
│       ├── img1.jpg
│       └── img2.jpg
└── ...
```

## ✅ Tips

- **Brochure**: Use the first/best image from the brochure folder (optional)
- **Story Images**: Add 3-8 images from the photos folder for the visualization
- **Order**: The order of file IDs matters - arrange them as you want them to appear
- **Test**: Use `test-events.html` to see which images load successfully

## 🔄 Workflow Example

Let's say you want to add images for "Coder's Arcade 1.0":

1. **Open Google Drive** → Events → Coder's Arcade 1.0 → brochure
2. **Right-click the poster** → Get link
3. **Copy**: `https://drive.google.com/file/d/1ABC123XYZ/view`
4. **Extract ID**: `1ABC123XYZ`
5. **Navigate to** photos folder
6. **Repeat for 3-8 photos**
7. **Edit** `app/lib/eventImageMap.js`:
   ```javascript
   'coders-arcade-1-0': {
     brochure: '1ABC123XYZ',
     storyImages: [
       '1DEF456',
       '1GHI789',
       '1JKL012',
     ]
   },
   ```
8. **Save** and test!

## 🎨 Already Done

- ✅ "Coding Sessions" - Already has test images

## 📋 To Do

Add images for these events (edit `app/lib/eventImageMap.js`):

- [ ] Coder's Arcade 0.0 (2nd Semester)
- [ ] Coder's Arcade 0.0 (4th Semester)
- [ ] DSA and STL Expert Talk
- [ ] Coder's Arcade 1.0
- [ ] Workshop on Competitive Programming
- [ ] Data Structure Hunt '23
- [ ] Team Selection (Technical Team)
- [ ] Team Selection (Graphics & Media)
- [ ] Team Selection (Lead and Co-lead)

## 🔧 Files You'll Edit

- **`app/lib/eventImageMap.js`** - Add your file IDs here
- That's it! The rest is automatic.

## ❓ Why Not Use Google API?

Google Drive API requires:
- Cloud Console project setup
- API key or OAuth
- Public folder access

This manual method is:
- ✅ Simpler - No API setup needed
- ✅ Works with private folders
- ✅ You control exactly which images appear
- ✅ Same workflow as contributors (copy-paste IDs)

---

Need help? Just paste file IDs in `eventImageMap.js` and run the test scripts!
