import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

// Function to read and parse Excel file
export function getEventsData() {
  try {
    const filePath = path.join(process.cwd(), '..', 'CP SQUAD  STATS.xlsx');
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('Excel file not found at:', filePath);
      return [];
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    
    // Transform data to match our event structure
    const events = rawData.map((row, index) => {
      // Create a slug from the event title
      const slug = row['Event Title']
        ? row['Event Title']
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        : `event-${index + 1}`;
      
      return {
        id: row['Sr. No.'] || index + 1,
        title: row['Event Title'] || 'Untitled Event',
        date: row['Date'] ? formatDate(row['Date']) : 'TBA',
        duration: row['Duration'] || 'N/A',
        eventType: row['Event Type'] || 'General',
        expertName: row['Expert Name'] || '-',
        affiliation: row['Affiliation'] || '-',
        participants: row['No. of Students'] || 0,
        budget: row['Budget (Rs.)'] || 0,
        brochure: row['Brochure'] || '',
        linkOfData: row['Link of Data'] || '',
        slug: slug,
        // Default image - will be replaced with user-provided images
        image: '/images/default-event.jpg',
        excerpt: generateExcerpt(row)
      };
    });
    
    return events;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return [];
  }
}

// Helper function to format date
function formatDate(dateValue) {
  try {
    if (typeof dateValue === 'number') {
      // Excel date serial number
      const date = XLSX.SSF.parse_date_code(dateValue);
      return `${date.d.toString().padStart(2, '0')}-${date.m.toString().padStart(2, '0')}-${date.y}`;
    } else if (dateValue instanceof Date) {
      return dateValue.toLocaleDateString('en-GB');
    } else {
      return dateValue;
    }
  } catch (error) {
    return dateValue;
  }
}

// Helper function to generate excerpt from event data
function generateExcerpt(row) {
  const eventType = row['Event Type'] || '';
  const expertName = row['Expert Name'];
  const affiliation = row['Affiliation'];
  
  if (expertName && expertName !== '-' && affiliation && affiliation !== '-') {
    return `${eventType} by ${expertName} from ${affiliation}`;
  } else if (expertName && expertName !== '-') {
    return `${eventType} by ${expertName}`;
  } else {
    return `${eventType} organized by CP Squad`;
  }
}

// Get a single event by slug
export function getEventBySlug(slug) {
  const events = getEventsData();
  return events.find(event => event.slug === slug);
}

// Get all event slugs for static generation
export function getAllEventSlugs() {
  const events = getEventsData();
  return events.map(event => event.slug);
}
