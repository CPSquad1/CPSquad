/**
 * Helper utilities for working with Google Drive images
 */

/**
 * Convert Google Drive share URL or file ID to direct image URL
 * @param {string} driveUrl - Google Drive share URL or file ID
 * @returns {string} Direct image URL
 */
export function getDriveImageUrl(driveUrl) {
  if (!driveUrl) return '';
  
  // Check if it's already a direct link
  if (driveUrl.includes('googleusercontent.com') || 
      driveUrl.includes('uc?export=view&id=') || 
      driveUrl.includes('uc?id=') ||
      driveUrl.includes('thumbnail?id=')) {
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
  
  // If no match found, assume it's already just a file ID
  if (!fileId) {
    fileId = driveUrl;
  }
  
  // Use Google's CDN which is reliable for embedding (same as contributors)
  const url = `https://lh3.googleusercontent.com/d/${fileId}`;
  console.log(`[getDriveImageUrl] ${driveUrl} → ${url}`);
  return url;
}

/**
 * Get alternative Google Drive URL formats (for fallback)
 * @param {string} fileId - Google Drive file ID
 * @returns {Object} Object with different URL format options
 */
export function getAlternativeUrls(fileId) {
  if (!fileId) return {};
  
  return {
    usercontent: `https://drive.usercontent.google.com/download?id=${fileId}&export=view&authuser=0`,
    lh3: `https://lh3.googleusercontent.com/d/${fileId}`,
    thumbnail: `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`,
    direct: `https://drive.google.com/uc?export=view&id=${fileId}`
  };
}

/**
 * Convert Google Drive folder/file URL to file ID
 * @param {string} url - Google Drive URL
 * @returns {string} File ID
 */
export function extractDriveFileId(url) {
  if (!url) return '';
  
  // Already just an ID
  if (!url.includes('/') && !url.includes('http')) {
    return url;
  }
  
  // Extract from various URL formats
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];
  
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];
  
  const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch) return dMatch[1];
  
  return url;
}

/**
 * Helper to create event story images array from Google Drive file IDs
 * @param {string[]} fileIds - Array of Google Drive file IDs
 * @param {string} eventName - Event name for alt text
 * @returns {Array} Array of image objects
 */
export function createStoryImages(fileIds, eventName) {
  return fileIds.map((fileId, index) => ({
    id: `${eventName}-story-${index + 1}`,
    src: getDriveImageUrl(fileId),
    alt: `${eventName} - Moment ${index + 1}`
  }));
}

/**
 * Batch convert multiple Drive URLs/IDs to image URLs
 * @param {string[]} driveUrls - Array of Drive URLs or file IDs
 * @returns {string[]} Array of direct image URLs
 */
export function convertDriveUrls(driveUrls) {
  return driveUrls.map(url => {
    const fileId = extractDriveFileId(url);
    return getDriveImageUrl(fileId);
  });
}

