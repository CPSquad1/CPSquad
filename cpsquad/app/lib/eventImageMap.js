/**
 * Manual Event Images Setup Helper
 * 
 * Since your Google Drive folder is private, manually extract file IDs:
 * 
 * HOW TO GET FILE IDs FROM GOOGLE DRIVE:
 * =====================================
 * 
 * 1. Open your event folder: https://drive.google.com/drive/folders/1mDy4AB0t1QN1XVICw7AXIxnjyHJKgaOr
 * 
 * 2. Navigate to an event folder (e.g., "Coding Sessions")
 * 
 * 3. Open the brochure or photos subfolder
 * 
 * 4. For each image:
 *    - Right-click > Get link (or Share)
 *    - Copy the link (looks like: https://drive.google.com/file/d/FILE_ID_HERE/view)
 *    - Extract the FILE_ID from between /d/ and /view
 * 
 * 5. Paste the FILE_IDs below in the event objects
 * 
 * EXAMPLE:
 * ========
 * Google Drive Link: https://drive.google.com/file/d/1nSBEbtKp80LrYRoOxLbE8LKdmzJOnZ-v/view
 * File ID: 1nSBEbtKp80LrYRoOxLbE8LKdmzJOnZ-v
 * 
 */

import { getDriveImageUrl, createStoryImages } from './googleDriveHelper.js';

// EVENT IMAGE MAPPING
// Copy this template for each event and fill in the file IDs
export const eventImageMap = {
    // Example - Coding Sessions (already has test data)
    'coding-sessions': {
        brochure: 'https://drive.google.com/file/d/15voWVyZ_oWKveyEgKKDovgo9vAEiJus4/view?usp=sharing', // File ID of brochure image (first image from brochure folder)
        storyImages: [
            '10n7Q-KsYSBFNkrCb0dH0u2NjGwwuO5wj',
            '10mNaE8A1bHVTfznf0N3y-MhWeWl4rvAr',
            '10cxtbEviD8Jhev86YcK6aXK6QhOX38cw',
            '10a_a_IYh8-8Ft6wFeYgv3g3W1_z9G33M',
            '10Wqufs992pc8p2oRki--nGSU0qfci3Kn',
            '10Y9BLFuwzsueVtHnf9zSs8BNaFizGgCQ',
            '1066WWOFoklyBCEInPUw36824jzbYt9Wf',
            '107V5hx8iYiLeNOxqg2koWa-B9mtfhh0D'
        ]
    },

    // Template for "Coder's Arcade 0.0 (2nd Semester)"
    'coders-arcade-0-0-2nd-semester': {
        brochure: '1FmBqQDrZBp_hrD-6MfxnYxieOqBeZOzn', // Paste file ID from brochure folder
        storyImages: [
            '1t_0exH3yrKiAixfyUu0JSq6qzmIzdFhM',
            '1FdHvVI0P08US1pN33pRqECBg_queE5H3',
            '1Hen12_O1WedIDuvAYa6AZvyP0p0VXOLt',
            '1XV9PcG6sQj9XFJTGqjaekXklJRAowSqe',
            '1MTS7DjDEiUTed-TDkFZwK-mTNsFfGkid',
            '1tMbYNFN6dyK9ZpsU7AEvVoq3oFoMZjrl',
            '1QttxpzlQcWQB_93AAvkG9cHyjqc039dh',
            '1Lx7ZsiiQ6H7CNaoh9hvVc9HwguRapAaI',
            '1Vb-CRRgnGlfNU5UfjVdKt8fmlasWXllB',
            '1WxOgD98m8CdHDXtfk68Ksp3GBmoDLO6e',
            '1cnecS3bi_9eJ3BPN8PkpX_3XP4n46Jyu',
            '1UC__D7jA7t0el1ABTeIytWnjzmv6fuv9',
            '1L9WZxIQZ1yAqDTfHiaOEcHyS-cqEnP18',
            '1yEhTEdTvi2YdlYAMIuCwtMFGcxUQyGK4',
            '1LYjoHVbBsrLvepayRAYE84acSSabrDQI',
            '16RyEn2714q-Z8gThV0G26ugAI0To3MAY',
            '1Z1UqmvBxyDpiHlZX_9P8aroYsyC8xi2B',
            '117PaZ66lQoXT3PITtZqTS8O69YoPy_p7',
            '1khVbOCS-_2DHxv1IfIyqSizpPehQMktd',
            '14zeISFcpwlWRv95C2Rd0BxZIBSCYuJPu',
            '1UsWAFc4rC33PFGSub3tinvvqrTPmzLbE',
            '1zxj5ufdkz3aoNp46S6ULO-TQ4IWIW-lV',
            '1O948m8RS76qLFeaFEkpzo6bXlIdeUC9S',
            '1FFQuF0Ofu4lCrLSGDfC4TT36v1BQFmae'
        ]
    },

    // Template for "Coder's Arcade 0.0 (4th Semester)"
    'coders-arcade-0-0-4th-semester': {
        brochure: null,
        storyImages: []
    },

    // Template for "DSA and STL Expert Talk"
    'importance-of-dsa-and-stl': {
        brochure: null,
        storyImages: []
    },

    // Template for "Coder's Arcade 1.0"
    'coders-arcade-1-0': {
        brochure: null,
        storyImages: []
    },

    // Template for "Workshop on Competitive Programming"
    'workshop-on-competitive-programming': {
        brochure: null,
        storyImages: []
    },

    // Template for "Data Structure Hunt '23"
    'data-structure-hunt-23': {
        brochure: null,
        storyImages: []
    },

    // Template for "Team Selection (Technical Team)"
    'team-selection-technical-team': {
        brochure: null,
        storyImages: []
    },

    // Template for "Team Selection (Graphics & Media and Content Team)"
    'team-selection-graphics-media-content': {
        brochure: null,
        storyImages: []
    },

    // Template for "Team Selection (Lead and Co-lead)"
    'team-selection-lead-co-lead': {
        brochure: null,
        storyImages: []
    },
};

/**
 * Helper function to get images for an event
 * @param {string} slug - Event slug
 * @returns {Object} Object with brochureUrl and storyImages array
 */
export function getEventImages(slug) {
    const eventMap = eventImageMap[slug];

    console.log(`[getEventImages] Looking up: ${slug}`);
    console.log(`[getEventImages] EventMap found:`, eventMap);

    if (!eventMap) {
        console.log(`[getEventImages] No mapping found for ${slug}`);
        return {
            brochureUrl: null,
            storyImages: []
        };
    }

    const brochureUrl = eventMap.brochure ? getDriveImageUrl(eventMap.brochure) : null;
    const storyImages = eventMap.storyImages.length > 0
        ? createStoryImages(eventMap.storyImages.slice(0, 8), slug)
        : [];

    console.log(`[getEventImages] Brochure file ID: ${eventMap.brochure || 'NONE'}`);
    console.log(`[getEventImages] Brochure URL: ${brochureUrl || 'NULL'}`);
    console.log(`[getEventImages] Story images count: ${storyImages.length}`);

    return {
        brochureUrl,
        storyImages
    };
}

/**
 * Quick test to verify your file IDs work
 */
export function testEventImages() {
    console.log('🔍 Testing Event Image Configuration...\n');

    Object.keys(eventImageMap).forEach(slug => {
        const config = eventImageMap[slug];
        const hasImages = config.storyImages.length > 0 || config.brochure;

        console.log(`📅 ${slug}: ${hasImages ? '✅' : '⚠️  No images'}`);
        if (config.brochure) {
            console.log(`   📄 Brochure: ${getDriveImageUrl(config.brochure)}`);
        }
        if (config.storyImages.length > 0) {
            console.log(`   📸 Story Images: ${config.storyImages.length}`);
        }
        console.log('');
    });
}

// Run test if this file is executed directly
if (import.meta.url.endsWith('eventImageMap.js')) {
    testEventImages();
}
