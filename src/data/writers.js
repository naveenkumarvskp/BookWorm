function xmlEsc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function avatar(idx, name) {
  const colors = [
    '#c0392b','#8e44ad','#2980b9','#16a085','#d35400',
    '#27ae60','#2c3e50','#f39c12','#1a252f','#6c3483',
    '#0e6655','#922b21','#1b4f72','#4a235a','#145a32',
    '#6d4c41','#00695c','#283593','#558b2f','#ad1457',
    '#4527a0','#00838f','#e65100','#37474f','#4e342e',
    '#1565c0','#2e7d32',
  ]
  const bg = colors[idx % colors.length]
  const initials = xmlEsc(name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase())
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
    <rect width="80" height="80" rx="40" fill="${bg}"/>
    <text x="40" y="40" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="white"
      text-anchor="middle" dominant-baseline="central">${initials}</text>
  </svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export const writers = [
  // ── Original 10 ──────────────────────────────────────────────────────────
  {
    id: 'w1',
    name: 'Arjun Patel',
    avatar: avatar(0, 'Arjun Patel'),
    bio: 'Arjun Patel is a productivity coach and neuroscience enthusiast. His writing blends science with practical frameworks to help readers unlock their full potential.',
    bookCount: 3,
    bookIds: ['1', '10'],
    genres: ['Self-help', 'Productivity'],
  },
  {
    id: 'w2',
    name: 'Raj Patel',
    avatar: avatar(1, 'Raj Patel'),
    bio: 'Raj Patel is an educator and lifelong learner who has spent 20 years studying the science of memory and metacognition. He now shares his insights through bestselling books.',
    bookCount: 2,
    bookIds: ['2'],
    genres: ['Self-help', 'Education'],
  },
  {
    id: 'w3',
    name: 'James Wright',
    avatar: avatar(2, 'James Wright'),
    bio: 'James Wright is an executive coach who has advised Fortune 500 companies. His books distil the habits and mindsets shared by the world\'s most successful people.',
    bookCount: 4,
    bookIds: ['3', '12'],
    genres: ['Biography', 'Business'],
  },
  {
    id: 'w4',
    name: 'James Adams',
    avatar: avatar(3, 'James Adams'),
    bio: 'James Adams is a crime fiction author known for his atmospheric mysteries set in forgotten corners of the world. His novels have sold over two million copies worldwide.',
    bookCount: 6,
    bookIds: ['4'],
    genres: ['Mystery', 'Thriller'],
  },
  {
    id: 'w5',
    name: 'Jessica Martin',
    avatar: avatar(4, 'Jessica Martin'),
    bio: 'Jessica Martin writes sweeping contemporary romances set against stunning natural backdrops. Her stories explore the complexity of modern love and human connection.',
    bookCount: 5,
    bookIds: ['5'],
    genres: ['Romance', 'Contemporary Fiction'],
  },
  {
    id: 'w6',
    name: 'Laura Mitchell',
    avatar: avatar(5, 'Laura Mitchell'),
    bio: 'Laura Mitchell is a science fiction author and former aerospace engineer. Her technically grounded novels explore what it means to be human when faced with the cosmos.',
    bookCount: 4,
    bookIds: ['6'],
    genres: ['Science Fiction', 'Hard SF'],
  },
  {
    id: 'w7',
    name: 'Daniel Reed',
    avatar: avatar(6, 'Daniel Reed'),
    bio: 'Daniel Reed is a minimalism advocate and lifestyle writer who left a high-pressure career to live intentionally. He writes practical, heartfelt guides to simpler living.',
    bookCount: 2,
    bookIds: ['7', '13'],
    genres: ['Self-help', 'Minimalism'],
  },
  {
    id: 'w8',
    name: 'Clara Nelson',
    avatar: avatar(7, 'Clara Nelson'),
    bio: 'Clara Nelson is a journalist turned thriller writer. Her novels draw on her investigative background to craft tightly plotted, atmospherically rich mysteries.',
    bookCount: 3,
    bookIds: ['8', '14'],
    genres: ['Mystery', 'Thriller'],
  },
  {
    id: 'w9',
    name: 'Emily Parker',
    avatar: avatar(8, 'Emily Parker'),
    bio: "Emily Parker has written beloved children's and YA books for over a decade. Her stories celebrate courage, friendship and the wonder of childhood imagination.",
    bookCount: 8,
    bookIds: ['9', '22'],
    genres: ["Children's", 'Young Adult'],
  },
  {
    id: 'w10',
    name: 'Sarah Collins',
    avatar: avatar(10, 'Sarah Collins'),
    bio: 'Sarah Collins is an epic fantasy author whose world-building has been compared to Tolkien. Her richly imagined kingdoms and complex magic systems have earned her a devoted global readership.',
    bookCount: 5,
    bookIds: ['11'],
    genres: ['Fantasy', 'Epic Fantasy'],
  },

  // ── New authors (w11–w27) ─────────────────────────────────────────────────

  {
    id: 'w11',
    name: 'Nadia Al-Rashid',
    avatar: avatar(11, 'Nadia Al-Rashid'),
    bio: 'Nadia Al-Rashid is a journalist, human-rights advocate and memoirist. Her debut memoir won the International Non-fiction Prize and has been translated into fourteen languages.',
    bookCount: 2,
    bookIds: ['16'],
    genres: ['Memoir', 'Non-fiction'],
  },
  {
    id: 'w12',
    name: 'Kenji Tanaka',
    avatar: avatar(12, 'Kenji Tanaka'),
    bio: 'Kenji Tanaka is one of Japan\'s most celebrated literary novelists. His work spans memoir, fiction and essays, exploring themes of illness, beauty and impermanence with quiet precision.',
    bookCount: 4,
    bookIds: ['17', '46', '47'],
    genres: ['Memoir', 'Literary Fiction'],
  },
  {
    id: 'w13',
    name: 'Sofia Reyes',
    avatar: avatar(13, 'Sofia Reyes'),
    bio: 'Sofia Reyes is a travel writer and photographer who has visited over 90 countries. Her books combine immersive narrative with practical insight for the adventurous reader.',
    bookCount: 4,
    bookIds: ['18', '19', '34'],
    genres: ['Travel', 'Adventure'],
  },
  {
    id: 'w14',
    name: 'Isabella Conti',
    avatar: avatar(14, 'Isabella Conti'),
    bio: 'Isabella Conti is a Milanese chef and food writer who trained under three Michelin-starred mentors. Her cookbooks are celebrated for blending culinary precision with personal storytelling.',
    bookCount: 3,
    bookIds: ['20', '21'],
    genres: ['Cooking', 'Food & Drink'],
  },
  {
    id: 'w15',
    name: 'Amara Osei',
    avatar: avatar(15, 'Amara Osei'),
    bio: 'Amara Osei is a British-Ghanaian author whose YA novels have won the Carnegie Medal and the Costa Children\'s Book Award. She writes with honesty and compassion about identity and belonging.',
    bookCount: 3,
    bookIds: ['23'],
    genres: ['Young Adult', 'Contemporary Fiction'],
  },
  {
    id: 'w16',
    name: 'Takeshi Mori',
    avatar: avatar(16, 'Takeshi Mori'),
    bio: 'Takeshi Mori is a manga artist and graphic novelist based in Tokyo. His work fuses East Asian artistic traditions with Western comics storytelling to create visually groundbreaking narratives.',
    bookCount: 5,
    bookIds: ['24', '25'],
    genres: ['Comics & Graphic Novels', 'Manga'],
  },
  {
    id: 'w17',
    name: 'Camille Dubois',
    avatar: avatar(17, 'Camille Dubois'),
    bio: 'Camille Dubois is a French-Canadian poet and essayist. Her collections have won the Prix de Poésie de l\'Académie française and are taught in universities across the French-speaking world.',
    bookCount: 4,
    bookIds: ['26', '27', '37', '38'],
    genres: ['Poetry', 'French Literature'],
  },
  {
    id: 'w18',
    name: 'Dr. Aisha Mensah',
    avatar: avatar(18, 'Dr. Aisha Mensah'),
    bio: 'Dr. Aisha Mensah is a theoretical physicist and science communicator at the University of Cape Town. Her popular-science books have introduced millions of readers to the beauty of physics.',
    bookCount: 3,
    bookIds: ['28', '29'],
    genres: ['Science', 'Popular Science'],
  },
  {
    id: 'w19',
    name: 'Father Thomas Avery',
    avatar: avatar(19, 'Father Thomas Avery'),
    bio: 'Father Thomas Avery is a Benedictine monk and spiritual director with over twenty years of contemplative practice. His books offer a gentle, non-dogmatic path to inner stillness.',
    bookCount: 3,
    bookIds: ['30', '31'],
    genres: ['Religion', 'Spirituality'],
  },
  {
    id: 'w20',
    name: 'Carlos Fernández',
    avatar: avatar(20, 'Carlos Fernández'),
    bio: 'Carlos Fernández is a Spanish linguist and bestselling language-method author. His "30 Days" series has sold over ten million copies worldwide in more than thirty languages.',
    bookCount: 4,
    bookIds: ['32', '35'],
    genres: ['Language Learning', 'Self-help'],
  },
  {
    id: 'w21',
    name: 'Yuki Shimizu',
    avatar: avatar(21, 'Yuki Shimizu'),
    bio: 'Yuki Shimizu is a Japanese language teacher and linguist who has spent fifteen years developing natural-acquisition methods for adult learners. She divides her time between Tokyo and London.',
    bookCount: 3,
    bookIds: ['33', '48'],
    genres: ['Language Learning', 'Education'],
  },
  {
    id: 'w22',
    name: 'Jorge Luis Borges',
    avatar: avatar(22, 'Jorge Luis Borges'),
    bio: 'Jorge Luis Borges (1899–1986) was an Argentine short-story writer, essayist and poet. Regarded as the most important Spanish-language author of the twentieth century, his work transformed world literature.',
    bookCount: 6,
    bookIds: ['36'],
    genres: ['Fantasy', 'Literary Fiction'],
  },
  {
    id: 'w23',
    name: 'Paulo Coelho',
    avatar: avatar(23, 'Paulo Coelho'),
    bio: 'Paulo Coelho is a Brazilian lyricist and novelist, best known for The Alchemist. His books have sold over 225 million copies in over 150 countries and are available in 83 languages.',
    bookCount: 8,
    bookIds: ['39'],
    genres: ['Philosophy', 'Fiction'],
  },
  {
    id: 'w24',
    name: 'Thomas Mann',
    avatar: avatar(24, 'Thomas Mann'),
    bio: 'Thomas Mann (1875–1955) was a German novelist and Nobel Prize laureate. His monumental works include Buddenbrooks, The Magic Mountain and Doctor Faustus — pillars of twentieth-century European literature.',
    bookCount: 5,
    bookIds: ['40', '41'],
    genres: ['Historical Fiction', 'German Literature'],
  },
  {
    id: 'w25',
    name: 'Rolf Dobelli',
    avatar: avatar(25, 'Rolf Dobelli'),
    bio: 'Rolf Dobelli is a Swiss entrepreneur and author. His books on rational thinking and cognitive biases have become international bestsellers, translated into forty languages.',
    bookCount: 3,
    bookIds: ['42'],
    genres: ['Self-help', 'Psychology'],
  },
  {
    id: 'w26',
    name: 'मुंशी प्रेमचंद',
    avatar: avatar(26, 'Munshi Premchand'),
    bio: 'मुंशी प्रेमचंद (1880–1936) हिंदी और उर्दू के महानतम लेखक थे। उनके उपन्यास और कहानियाँ भारतीय ग्रामीण जीवन और सामाजिक न्याय की आवाज़ हैं।',
    bookCount: 7,
    bookIds: ['43', '44'],
    genres: ['Drama', 'Hindi Literature'],
  },
  {
    id: 'w27',
    name: 'अमृता प्रीतम',
    avatar: avatar(0, 'Amrita Pritam'),
    bio: 'अमृता प्रीतम (1919–2005) पंजाबी और हिंदी की पहली प्रमुख महिला कवयित्री और उपन्यासकार थीं। उनकी रचनाएँ विभाजन की पीड़ा, प्रेम और स्त्री-स्वतंत्रता का अमर दस्तावेज़ हैं।',
    bookCount: 5,
    bookIds: ['45'],
    genres: ['Memoir', 'Hindi Literature'],
  },
]

export function getWriterById(id) {
  return writers.find(w => w.id === id) || null
}

export function getWriterByName(name) {
  return writers.find(w => w.name.toLowerCase() === name.toLowerCase()) || null
}
