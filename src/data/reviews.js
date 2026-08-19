// Seed reviews keyed by bookId
// Users can add more reviews; those are stored in localStorage via the store

export const seedReviews = {
  '7': [
    {
      id: 'r7-1',
      bookId: '7',
      reviewer: 'John Smith',
      rating: 5,
      comment: 'The accordion component delivers large amounts of content in a small space through progressive disclosure. The user gets key details about the underlying content and can choose to expand that content within the constraints of the accordion.',
      date: '20 Jul 2024',
    },
    {
      id: 'r7-2',
      bookId: '7',
      reviewer: 'Anita Roy',
      rating: 4,
      comment: 'Genuinely life-changing read. I cleared out 60% of my possessions after finishing the first three chapters. Daniel writes with warmth and practicality — never preachy.',
      date: '12 Aug 2024',
    },
    {
      id: 'r7-3',
      bookId: '7',
      reviewer: 'Chris Meadows',
      rating: 4,
      comment: 'A refreshing take on minimalism that doesn\'t feel ascetic or extreme. The sections on digital decluttering were especially relevant to my life.',
      date: '3 Sep 2024',
    },
  ],
  '1': [
    {
      id: 'r1-1',
      bookId: '1',
      reviewer: 'Pradeep Kumar',
      rating: 5,
      comment: 'Arjun\'s neuroscience-backed approach to focus is unlike anything I\'ve read. The daily habit frameworks alone are worth ten times the price of the book.',
      date: '5 Jun 2024',
    },
    {
      id: 'r1-2',
      bookId: '1',
      reviewer: 'Sandra Lee',
      rating: 4,
      comment: 'Clear, practical and evidence-based. I saw improvements in my work concentration within the first week of applying the techniques.',
      date: '18 Jul 2024',
    },
  ],
  '6': [
    {
      id: 'r6-1',
      bookId: '6',
      reviewer: 'Marcus Webb',
      rating: 5,
      comment: 'The hard science feels authentic without becoming inaccessible. Laura Mitchell clearly knows her astrophysics — this is the best hard SF novel I\'ve read in a decade.',
      date: '22 Mar 2024',
    },
    {
      id: 'r6-2',
      bookId: '6',
      reviewer: 'Yuki Tanaka',
      rating: 5,
      comment: 'Heart-pounding from page one. The first-contact sequence is the most inventive I\'ve ever encountered. Cannot wait for the sequel.',
      date: '10 May 2024',
    },
  ],
  '4': [
    {
      id: 'r4-1',
      bookId: '4',
      reviewer: 'Helen Cross',
      rating: 5,
      comment: 'The atmosphere is so thick you can cut it. James Adams\' prose is sharp and cinematic — I read this in a single sleepless night.',
      date: '14 Apr 2024',
    },
    {
      id: 'r4-2',
      bookId: '4',
      reviewer: 'David Okon',
      rating: 4,
      comment: 'Genuinely twisty plot. I thought I had guessed the killer three times and was wrong every time.',
      date: '9 May 2024',
    },
  ],
}

export function getSeedReviews(bookId) {
  return seedReviews[bookId] || []
}
