// Client-side events data
// This data is derived from the Excel file: CP SQUAD STATS.xlsx
// Images are stored in Google Drive: https://drive.google.com/drive/folders/1mDy4AB0t1QN1XVICw7AXIxnjyHJKgaOr

import { getDriveImageUrl } from '../googleDriveHelper.js';
import { getEventImages } from '../eventImageMap.js';

// Helper to merge event data with images from eventImageMap
const createEvent = (eventData) => {
  const images = getEventImages(eventData.slug);
  
  // Debug logging
  console.log(`[eventsDataClient] Creating event: ${eventData.slug}`);
  console.log(`[eventsDataClient] BrochureUrl: ${images.brochureUrl || 'NONE'}`);
  console.log(`[eventsDataClient] StoryImages count: ${images.storyImages.length}`);
  
  return {
    ...eventData,
    image: images.brochureUrl || null,
    storyImages: images.storyImages
  };
};

export const eventsData = [
  createEvent({
    id: 1,
    title: "Coding Sessions",
    date: "20-02-2023",
    duration: "2 Hours",
    eventType: "Session",
    expertName: "-",
    affiliation: "-",
    participants: 140,
    budget: 0,
    brochure: "",
    linkOfData: "",
    slug: "coding-sessions",
    excerpt: "Introductory coding sessions organized by CP Squad"
  }),

  createEvent({
    id: 2,
    title: "Coder's Arcade 0.0 (2nd Semester)",
    date: "28-02-2023",
    duration: "2 Hours",
    eventType: "Coding Contest",
    expertName: "-",
    affiliation: "-",
    participants: 200,
    budget: 0,
    brochure: "",
    linkOfData: "https://drive.google.com/file/d/15voWVyZ_oWKveyEgKKDovgo9vAEJus4/view?",
    slug: "coders-arcade-0-0-2nd-semester",
    excerpt: "Competitive coding contest for 2nd semester students"
  }),

  createEvent({
    id: 3,
    title: "Coder's Arcade 0.0 (4th Semester)",
    date: "21-03-2023",
    duration: "2 Hours",
    eventType: "Coding Contest",
    expertName: "-",
    affiliation: "-",
    participants: 200,
    budget: 0,
    brochure: "",
    linkOfData: "",
    slug: "coders-arcade-0-0-4th-semester",
    excerpt: "Competitive coding contest for 4th semester students"
  }),

  createEvent({
    id: 4,
    title: "The Importance of Data Structures and Algorithms (DSA) along with the Standard Template Library (STL)",
    date: "28-07-2023",
    duration: "2 Hours",
    eventType: "Expert Talk",
    expertName: "Abhishek Raj",
    affiliation: "Ex SAMSUNG Software Engineer",
    participants: 142,
    budget: 0,
    brochure: "",
    linkOfData: "",
    slug: "importance-of-dsa-and-stl",
    excerpt: "Expert Talk by Abhishek Raj from Ex SAMSUNG Software Engineer"
  }),

  createEvent({
    id: 5,
    title: "Coder's Arcade 1.0",
    date: "19-08-2023",
    duration: "3 Hours",
    eventType: "Coding Contest",
    expertName: "-",
    affiliation: "-",
    participants: 297,
    budget: 6295,
    brochure: "",
    linkOfData: "",
    slug: "coders-arcade-1-0",
    excerpt: "Major competitive programming contest organized by CP Squad"
  }),

  createEvent({
    id: 6,
    title: "Workshop on Competitive Programming",
    date: "15-09-2023",
    duration: "2 Hours",
    eventType: "Workshop",
    expertName: "Priyanshu Gagiya",
    affiliation: "DA-IICT",
    participants: 44,
    budget: 1500,
    brochure: "",
    linkOfData: "",
    slug: "workshop-on-competitive-programming",
    excerpt: "Workshop by Priyanshu Gagiya from DA-IICT"
  }),

  createEvent({
    id: 7,
    title: "Data Structure Hunt '23",
    date: "09-10-2023",
    duration: "Full Day",
    eventType: "Quiz + Treasure Hunt",
    expertName: "-",
    affiliation: "-",
    participants: 185,
    budget: 3152,
    brochure: "",
    linkOfData: "",
    slug: "data-structure-hunt-23",
    excerpt: "Quiz + Treasure Hunt event organized by CP Squad"
  }),

  // createEvent({
  //   id: 8,
  //   title: "Team Selection (Technical Team)",
  //   date: "07-03-2024",
  //   duration: "2 Hours",
  //   eventType: "CP SQUAD CLUB",
  //   expertName: "-",
  //   affiliation: "-",
  //   participants: 27,
  //   budget: 0,
  //   brochure: "",
  //   linkOfData: "",
  //   slug: "team-selection-technical-team",
  //   excerpt: "Technical team selection for CP Squad"
  // }),

  // createEvent({
  //   id: 9,
  //   title: "Team Selection (Graphics & Media and Content Team)",
  //   date: "08-03-2024",
  //   duration: "1 Hour",
  //   eventType: "Team Selection",
  //   expertName: "-",
  //   affiliation: "-",
  //   participants: 11,
  //   budget: 0,
  //   brochure: "",
  //   linkOfData: "",
  //   slug: "team-selection-graphics-media-content",
  //   excerpt: "Graphics, Media & Content team selection for CP Squad"
  // }),

  // createEvent({
  //   id: 10,
  //   title: "Team Selection (Lead and Co-lead)",
  //   date: "11-03-2024",
  //   duration: "4 Hours",
  //   eventType: "(Interviews)",
  //   expertName: "-",
  //   affiliation: "-",
  //   participants: 15,
  //   budget: 0,
  //   brochure: "",
  //   linkOfData: "",
  //   slug: "team-selection-lead-co-lead",
  //   excerpt: "Leadership team selection through interviews for CP Squad"
  // })
];

// Debug: Log all events on module load
console.log(`[eventsDataClient] Loaded ${eventsData.length} events`);
eventsData.forEach(event => {
  console.log(`  - ${event.slug}: image=${event.image ? 'YES' : 'NO'}, storyImages=${event.storyImages?.length || 0}`);
});