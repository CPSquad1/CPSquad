// Google Sheets configuration for events from environment variables
const EVENTS_SHEET_ID = process.env.NEXT_PUBLIC_EVENTS_SHEET_ID;
const EVENTS_GID = process.env.NEXT_PUBLIC_EVENTS_SHEET_GID;
const EVENTS_SHEET_URL = `https://docs.google.com/spreadsheets/d/${EVENTS_SHEET_ID}/export?format=csv&gid=${EVENTS_GID}`;

/**
 * Convert Google Drive share link to direct image URL
 * @param {string} driveUrl - Google Drive share URL or direct URL
 * @returns {string} Direct image URL
 */
export function convertGoogleDriveImageUrl(driveUrl) {
  if (!driveUrl || driveUrl.trim() === '' || driveUrl === '-') return '';
  
  const trimmed = driveUrl.trim();
  
  // Check if it's already a direct link
  if (trimmed.includes('googleusercontent.com') || 
      trimmed.includes('uc?export=view&id=') || 
      trimmed.includes('uc?id=') ||
      trimmed.includes('thumbnail?id=')) {
    return trimmed;
  }
  
  // Extract file ID from various Google Drive URL formats
  let fileId = '';
  
  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=... or /view
  const match1 = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1) {
    fileId = match1[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  if (!fileId) {
    const match2 = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match2) {
      fileId = match2[1];
    }
  }
  
  if (fileId) {
    // Use Google's CDN which is reliable for embedding
    // Note: The file must have "Anyone with the link can view" permissions
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  // If no match but looks like a URL, return it as-is
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  // Otherwise return empty
  return '';
}

/**
 * Normalize column name for flexible matching
 * @param {Object} row - CSV row object
 * @param {Array} possibleNames - Array of possible column names
 * @returns {string} Value from first matching column
 */
function getColumnValue(row, possibleNames) {
  for (const name of possibleNames) {
    if (row[name] !== undefined && row[name] !== null) {
      const value = row[name];
      // Treat '-' as empty
      if (value === '-' || value.trim() === '-') {
        return '';
      }
      return value;
    }
  }
  return '';
}

/**
 * Parse CSV text to array of objects
 * Handles multi-line quoted fields properly
 * @param {string} csv - CSV text content
 * @returns {Array} Array of row objects
 */
function parseCSV(csv) {
  // Remove BOM if present
  const cleanCsv = csv.replace(/^\uFEFF/, '');
  
  // Parse CSV properly handling multi-line quoted fields
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < cleanCsv.length; i++) {
    const char = cleanCsv[i];
    const nextChar = cleanCsv[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote (two quotes in a row)
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // End of row (only if not inside quotes)
      if (char === '\r' && nextChar === '\n') {
        i++; // Skip \n in \r\n
      }
      if (currentField || currentRow.length > 0) {
        currentRow.push(currentField.trim());
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
      }
    } else {
      // Regular character
      currentField += char;
    }
  }
  
  // Add last field and row if any
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }
  
  // Skip first 2 rows (title and description) and use row 3 as headers
  if (rows.length < 4) return [];
  
  const headers = rows[2];
  const data = [];
  
  // Start from row 4 (index 3) for actual data
  for (let i = 3; i < rows.length; i++) {
    const values = rows[i];
    const obj = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    
    data.push(obj);
  }
  
  return data;
}

/**
 * Generate unique ID from academic year, date, and serial number
 * @param {string} academicYear - e.g., "2022-23"
 * @param {string} date - e.g., "20-02-2023"
 * @param {string} srNo - Serial number
 * @param {number} fallbackIndex - Fallback index if other fields are missing
 * @returns {string} Unique ID
 */
function generateUniqueId(academicYear, date, srNo, fallbackIndex) {
  // Clean academic year (2022-23 -> 202223)
  const yearPart = academicYear ? academicYear.replace(/[^0-9]/g, '') : '0000';
  
  // Clean date (20-02-2023 -> 20022023)
  const datePart = date ? date.replace(/[^0-9]/g, '') : '00000000';
  
  // Clean serial number
  const srPart = srNo ? String(srNo).padStart(3, '0') : String(fallbackIndex).padStart(3, '0');
  
  // Combine: yearPart + datePart + srPart
  // e.g., "202223" + "20022023" + "001" = "20222320022023001"
  return `${yearPart}${datePart}${srPart}`;
}

/**
 * Generate slug from title
 * @param {string} title - Event title
 * @returns {string} URL-friendly slug
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Fetch events from Google Sheets
 * @returns {Promise<Array>} Array of event objects
 */
export async function fetchEvents() {
  try {
    // console.log('[fetchEvents] Fetching from:', EVENTS_SHEET_URL);
    
    const response = await fetch(EVENTS_SHEET_URL, {
      // Use no-cache to get fresh data
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch events data: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    const rawData = parseCSV(csvText);
    
    // console.log('[fetchEvents] Raw data rows:', rawData.length);
    
    // Debug: Log first row to see column names
    // if (rawData.length > 0) {
    //   console.log('[fetchEvents] Available columns:', Object.keys(rawData[0]));
    //   console.log('[fetchEvents] Total columns:', Object.keys(rawData[0]).length);
    //   
    //   // Show columns that might be brochure-related with exact names (including spaces)
    //   const cols = Object.keys(rawData[0]);
    //   const brochureCols = cols.filter(c => 
    //     c.toLowerCase().includes('brochure') || 
    //     c.toLowerCase().includes('photo')
    //   );
    //   console.log('[fetchEvents] Brochure/Photo related columns (exact names):');
    //   brochureCols.forEach(col => {
    //     console.log(`  - "${col}" (length: ${col.length})`);
    //   });
    //   
    //   // Show first row's brochure value
    //   console.log('[fetchEvents] First row Brochure value:', rawData[0]['Brochure'] || rawData[0]['brochure'] || '(not found)');
    // }
    
    // Transform data to match component structure
    const events = rawData
      .map((row, index) => {
        // Debug first row
        // if (index === 0) {
        //   console.log('[fetchEvents] First event row data:', row);
        // }
        
        // Get title first - needed for image alt text
        const title = getColumnValue(row, ['Event Title', 'title', 'Event title', 'event title']);
        
        // Collect all photo URLs from PHOTO 1, PHOTO 2, ... PHOTO 8 columns
        const storyImages = [];
        for (let i = 1; i <= 8; i++) {
          const photoKey = `PHOTO ${i}`;
          const photoUrl = row[photoKey];
          if (photoUrl && photoUrl.trim() !== '' && photoUrl !== '-') {
            const convertedUrl = convertGoogleDriveImageUrl(photoUrl);
            if (convertedUrl) {
              storyImages.push({
                id: i,
                src: convertedUrl,
                alt: `${title || 'Event'} - Image ${i}`
              });
            }
          }
        }
        
        // Get brochure/main image - only from Brochure column
        // Try multiple variations including with trailing/leading spaces
        let brochureUrl = getColumnValue(row, ['Brochure', 'brochure', 'Brochure ', ' Brochure']);
        
        // If still not found, check all columns for exact match
        if (!brochureUrl) {
          const allKeys = Object.keys(row);
          const brochureKey = allKeys.find(k => k.trim().toLowerCase() === 'brochure');
          if (brochureKey) {
            brochureUrl = row[brochureKey];
            // Treat '-' as empty
            if (brochureUrl === '-' || (brochureUrl && brochureUrl.trim() === '-')) {
              brochureUrl = '';
            }
          }
        }
        
        const mainImage = convertGoogleDriveImageUrl(brochureUrl);
        
        // Use CP Squad logo as fallback if no brochure image
        const finalImage = mainImage || '/images/logo.png';
        
        // Get academic year, date, and serial number for unique ID
        const academicYear = getColumnValue(row, ['Academic Year', 'academic year', 'AcademicYear']);
        const dateStr = getColumnValue(row, ['Date', 'date']);
        const srNo = getColumnValue(row, ['Sr. No.', 'Sr. No', 'Sr No', 'Sr.No', 'ID', 'id']);
        
        // Generate unique ID using academic year + date + sr.no
        const uniqueId = generateUniqueId(academicYear, dateStr, srNo, index + 1);
        
        // Debug brochure image on ALL rows to find the issue
        // if (index < 10) {
        //   console.log(`[fetchEvents] Row ${index + 1} "${title}":`)
        //   console.log(`  - Academic Year: "${academicYear}", Date: "${dateStr}", Sr.No: "${srNo}"`);
        //   console.log(`  - Generated Unique ID: ${uniqueId}`);
        //   console.log(`  - Brochure raw value: "${brochureUrl}" (length: ${brochureUrl ? brochureUrl.length : 0})`);
        //   console.log(`  - Brochure from row['Brochure']: "${row['Brochure']}" (type: ${typeof row['Brochure']})`);
        //   console.log(`  - Brochure converted:`, mainImage || '(empty)');
        //   console.log(`  - Final image:`, finalImage);
        //   
        //   // Show all column keys for first row
        //   if (index === 0) {
        //     console.log(`  - All columns in this row:`, Object.keys(row));
        //   }
        // }
        
        // Get slug from title
        const slug = generateSlug(title);
        
        const eventData = {
          id: uniqueId,
          title: title,
          date: dateStr,
          duration: getColumnValue(row, ['Duration', 'duration']),
          eventType: getColumnValue(row, ['Event Type', 'event type', 'EventType']) || 'Event',
          expertName: getColumnValue(row, ['Expert Name', 'expert name', 'ExpertName']) || '-',
          affiliation: getColumnValue(row, ['Affiliation', 'affiliation']) || '-',
          participants: parseInt(getColumnValue(row, ['No. of Students', 'Participants', 'participants', 'no. of students']) || '0') || 0,
          eventLevel: getColumnValue(row, ['Event Level', 'event level', 'EventLevel']),
          slug: slug,
          excerpt: getColumnValue(row, ['Event Description', 'event description', 'Description', 'description']),
          image: finalImage, // Use brochure or CP Squad logo as fallback
          brochure: mainImage || brochureUrl, // Store original brochure URL
          storyImages: storyImages,
          linkOfData: getColumnValue(row, ['Link of Data', 'link of data', 'LinkOfData']),
          budget: parseFloat(getColumnValue(row, ['Budget (Rs.) from CHARUSAT', 'Budget', 'budget']) || '0') || 0,
          sponsorship: getColumnValue(row, ['Sponsorship', 'sponsorship']),
          academicYear: academicYear
        };
        
        // Debug first processed event
        // if (index === 0) {
        //   console.log('[fetchEvents] First processed event:', eventData);
        //   console.log('[fetchEvents] Story images count:', storyImages.length);
        //   console.log('[fetchEvents] Story images:', storyImages);
        // }
        
        return eventData;
      })
      .filter(event => {
        const isValid = event.title && event.title.trim() !== '';
        // if (!isValid && event.id <= 3) {
        //   console.log('[fetchEvents] Filtered out event:', event);
        // }
        return isValid;
      }); // Filter out empty rows
    
    // console.log('[fetchEvents] Processed events:', events.length);
    // console.log('[fetchEvents] Event IDs:', events.map(e => `${e.id} (${e.title})`).join(', '));
    // console.log('[fetchEvents] Events with images:', events.filter(e => !e.image.includes('/images/logo.png')).length);
    
    // Check for duplicate slugs
    // const slugs = events.map(e => e.slug);
    // const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
    // if (duplicateSlugs.length > 0) {
    //   console.warn('[fetchEvents] ⚠️ WARNING: Duplicate slugs found:', duplicateSlugs);
    // } else {
    //   console.log('[fetchEvents] ✅ All slugs are unique');
    // }
    
    return events;
  } catch (error) {
    console.error('[fetchEvents] Error fetching events:', error);
    
    // Return empty array on error (fallback)
    return [];
  }
}

/**
 * Fetch a single event by slug
 * @param {string} slug - Event slug
 * @returns {Promise<Object|null>} Event object or null if not found
 */
export async function fetchEventBySlug(slug) {
  try {
    // console.log(`[fetchEventBySlug] Looking for event with slug: "${slug}"`);
    const events = await fetchEvents();
    // console.log(`[fetchEventBySlug] Total events available: ${events.length}`);
    // console.log(`[fetchEventBySlug] Available slugs:`, events.map(e => e.slug));
    
    const event = events.find(event => event.slug === slug);
    
    // if (event) {
    //   console.log(`[fetchEventBySlug] ✅ Found event: "${event.title}"`);
    //   console.log(`[fetchEventBySlug] Event has ${event.storyImages?.length || 0} story images`);
    // } else {
    //   console.warn(`[fetchEventBySlug] ❌ Event not found with slug: "${slug}"`);
    // }
    
    return event || null;
  } catch (error) {
    console.error('[fetchEventBySlug] Error:', error);
    return null;
  }
}

/**
 * Group events by year
 * @returns {Promise<Object>} Object with years as keys and event arrays as values
 */
export async function fetchEventsByYear() {
  try {
    const allEvents = await fetchEvents();
    
    // Group by academic year
    const grouped = {};
    
    allEvents.forEach(event => {
      const year = event.academicYear || 'Other';
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(event);
    });
    
    return grouped;
  } catch (error) {
    console.error('[fetchEventsByYear] Error:', error);
    return {};
  }
}
