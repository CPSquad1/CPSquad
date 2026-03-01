/**
 * Test script to check event images from eventsDataClient
 * and verify they can be loaded
 */

import { eventsData } from './data/eventsDataClient.js';

console.log('🔍 Testing Event Images from eventsDataClient...\n');
console.log(`Found ${eventsData.length} events\n`);

// Test each event
eventsData.forEach((event, index) => {
  console.log(`\n📅 Event ${index + 1}: ${event.title}`);
  console.log(`   Slug: ${event.slug}`);
  console.log(`   Type: ${event.eventType}`);
  
  // Check thumbnail/image
  if (event.image) {
    console.log(`   🖼️  Thumbnail: ${event.image}`);
    testImageUrl(event.image);
  } else {
    console.log(`   ⚠️  No thumbnail image`);
  }
  
  // Check story images
  if (event.storyImages && event.storyImages.length > 0) {
    console.log(`   📸 Story Images: ${event.storyImages.length} images`);
    event.storyImages.slice(0, 3).forEach((img, i) => {
      console.log(`      ${i + 1}. ${img.src}`);
      testImageUrl(img.src);
    });
    if (event.storyImages.length > 3) {
      console.log(`      ... and ${event.storyImages.length - 3} more`);
    }
  } else {
    console.log(`   ⚠️  No story images`);
  }
});

/**
 * Test if image URL format is correct
 */
function testImageUrl(url) {
  if (!url) {
    console.log(`      ❌ Empty URL`);
    return;
  }
  
  // Check if it's a Google Drive URL
  if (url.includes('lh3.googleusercontent.com')) {
    console.log(`      ✅ Google CDN format (lh3)`);
  } else if (url.includes('drive.google.com')) {
    console.log(`      ✅ Google Drive format`);
  } else if (url.startsWith('/')) {
    console.log(`      ⚠️  Local path: ${url}`);
  } else {
    console.log(`      ⚠️  Unknown format`);
  }
}

console.log('\n\n💡 Summary:');
console.log('- Events with thumbnails:', eventsData.filter(e => e.image).length);
console.log('- Events with story images:', eventsData.filter(e => e.storyImages && e.storyImages.length > 0).length);
console.log('\n✅ Run this script with: node app/lib/testDriveEvents.js\n');
