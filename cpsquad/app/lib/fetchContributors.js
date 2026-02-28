// Google Sheets configuration from environment variables
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GID = process.env.NEXT_PUBLIC_SHEET_GID;
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

/**
 * Convert Google Drive share link to direct image URL
 * @param {string} driveUrl - Google Drive share URL
 * @returns {string} Direct image URL
 */
export function convertGoogleDriveUrl(driveUrl) {
  if (!driveUrl) return '';
  
  // Check if it's already a direct link
  if (driveUrl.includes('googleusercontent.com') || driveUrl.includes('uc?id=')) {
    return driveUrl;
  }
  
  // Extract file ID from various Google Drive URL formats
  let fileId = '';
  
  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=... or /view
  const match1 = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match1) {
    fileId = match1[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  if (!fileId) {
    const match2 = driveUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match2) {
      fileId = match2[1];
    }
  }
  
  if (fileId) {
    // Use Google's CDN which is more reliable for embedding
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  // If no match, return original URL
  return driveUrl;
}

/**
 * Ensure LinkedIn URL has proper protocol
 * @param {string} url - LinkedIn URL
 * @returns {string} Properly formatted URL
 */
function normalizeLinkedInUrl(url) {
  if (!url) return '';
  
  const trimmed = url.trim();
  
  // Already has protocol
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  // Add https:// prefix
  return `https://${trimmed}`;
}

/**
 * Parse CSV text to array of objects
 * @param {string} csv - CSV text content
 * @returns {Array} Array of contributor objects
 */
function parseCSV(csv) {
  const lines = csv.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];
  
  // Parse CSV line with proper handling of quoted fields
  const parseLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };
  
  const headers = parseLine(lines[0]);
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    const obj = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    
    data.push(obj);
  }
  
  return data;
}

/**
 * Fetch contributors from Google Sheets
 * @param {number|string} year - Optional year to filter by (2023, 2024, 2025)
 * @returns {Promise<Array>} Array of contributor objects
 */
export async function fetchContributors(year = null) {
  try {
    const response = await fetch(SHEET_URL, {
      // Use no-cache to get fresh data
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    const rawData = parseCSV(csvText);
    
    // Transform data to match component structure
    const contributors = rawData.map((row) => {
      const photoUrl = row['Photo'] || '';
      const convertedUrl = convertGoogleDriveUrl(photoUrl);
      const linkedinUrl = row['Linkdin'] || row['LinkedIn'] || '';
      
      return {
        id: parseInt(row['ID']) || parseInt(row['Sr. No']) || 0,
        name: row['Name'] || '',
        role: row['Role'] || 'Member',
        avatar: convertedUrl,
        linkedin: normalizeLinkedInUrl(linkedinUrl),
        year: row['Year'] || '',
      };
    }).filter(c => c.name); // Filter out empty rows
    
    // Filter by year if specified
    if (year) {
      return contributors.filter(c => c.year.toString() === year.toString());
    }
    
    return contributors;
  } catch (error) {
    console.error('Error fetching contributors:', error);
    
    // Return empty array on error (fallback)
    return [];
  }
}

/**
 * Group contributors by year dynamically
 * @returns {Promise<Object>} Object with years as keys and contributor arrays as values
 */
export async function fetchContributorsByYear() {
  try {
    const allContributors = await fetchContributors();
    
    // Dynamically group by year (supports any year format like "2025-26")
    const grouped = {};
    
    allContributors.forEach(contributor => {
      const year = contributor.year.toString().trim();
      if (year) {
        if (!grouped[year]) {
          grouped[year] = [];
        }
        grouped[year].push(contributor);
      }
    });
    
    return grouped;
  } catch (error) {
    console.error('Error grouping contributors:', error);
    return {};
  }
}
