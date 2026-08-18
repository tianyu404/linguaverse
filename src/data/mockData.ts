import type {
  Language, CourseLevel, Word, GrammarQuestion, ListeningQuestion,
  SpeakingPrompt, LearningSession, Achievement, CommunityPost,
  LeaderboardEntry, Recommendation, User
} from '../types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: '英语', nativeName: 'English', flag: '🇬🇧', learners: 1280000, color: 'from-blue-500 to-indigo-600' },
  { code: 'ja', name: '日语', nativeName: '日本語', flag: '🇯🇵', learners: 680000, color: 'from-rose-500 to-red-600' },
  { code: 'ko', name: '韩语', nativeName: '한국어', flag: '🇰🇷', learners: 520000, color: 'from-violet-500 to-fuchsia-600' },
  { code: 'fr', name: '法语', nativeName: 'Français', flag: '🇫🇷', learners: 380000, color: 'from-sky-500 to-cyan-600' },
  { code: 'es', name: '西班牙语', nativeName: 'Español', flag: '🇪🇸', learners: 420000, color: 'from-amber-500 to-orange-600' },
  { code: 'de', name: '德语', nativeName: 'Deutsch', flag: '🇩🇪', learners: 260000, color: 'from-yellow-500 to-lime-600' },
];

export const ENGLISH_LEVELS: CourseLevel[] = [
  {
    id: 'en-a1', name: 'A1', title: '入门级',
    description: '从零基础开始，掌握日常问候、数字、基础词汇',
    unlocked: true, totalLessons: 24, completedLessons: 18,
    units: [
      {
        id: 'u1', title: '问候与介绍', icon: '👋', completed: 5, total: 6,
        lessons: [
          { id: 'l1', title: '基础问候语', type: 'vocabulary', duration: 10, completed: true, locked: false, xp: 15 },
          { id: 'l2', title: '自我介绍', type: 'speaking', duration: 12, completed: true, locked: false, xp: 20 },
          { id: 'l3', title: '数字1-20', type: 'vocabulary', duration: 8, completed: true, locked: false, xp: 12 },
          { id: 'l4', title: '国家与国籍', type: 'vocabulary', duration: 10, completed: true, locked: false, xp: 15 },
          { id: 'l5', title: '听力入门', type: 'listening', duration: 15, completed: true, locked: false, xp: 25 },
          { id: 'l6', title: '单元测验', type: 'review', duration: 20, completed: false, locked: false, xp: 40 },
        ]
      },
      {
        id: 'u2', title: '日常对话', icon: '💬', completed: 4, total: 6,
        lessons: [
          { id: 'l7', title: '家庭称谓', type: 'vocabulary', duration: 10, completed: true, locked: false, xp: 15 },
          { id: 'l8', title: "What's your name?", type: 'grammar', duration: 15, completed: true, locked: false, xp: 22 },
          { id: 'l9', title: '数字21-100', type: 'vocabulary', duration: 10, completed: true, locked: false, xp: 15 },
          { id: 'l10', title: '点餐对话', type: 'speaking', duration: 18, completed: false, locked: false, xp: 28 },
          { id: 'l11', title: '餐厅场景听力', type: 'listening', duration: 15, completed: false, locked: true, xp: 25 },
          { id: 'l12', title: '单元测验', type: 'review', duration: 25, completed: false, locked: true, xp: 45 },
        ]
      },
      {
        id: 'u3', title: '时间与日期', icon: '🕐', completed: 3, total: 6,
        lessons: [
          { id: 'l13', title: '星期与月份', type: 'vocabulary', duration: 12, completed: true, locked: false, xp: 18 },
          { id: 'l14', title: '询问时间', type: 'grammar', duration: 15, completed: true, locked: false, xp: 22 },
          { id: 'l15', title: '整点表达', type: 'speaking', duration: 10, completed: true, locked: false, xp: 18 },
          { id: 'l16', title: '日程安排', type: 'reading', duration: 15, completed: false, locked: false, xp: 20 },
          { id: 'l17', title: '日期听力', type: 'listening', duration: 18, completed: false, locked: true, xp: 25 },
          { id: 'l18', title: '单元测验', type: 'review', duration: 30, completed: false, locked: true, xp: 50 },
        ]
      },
      {
        id: 'u4', title: '出行旅游', icon: '✈️', completed: 0, total: 6,
        lessons: [
          { id: 'l19', title: '机场词汇', type: 'vocabulary', duration: 12, completed: false, locked: false, xp: 20 },
          { id: 'l20', title: '问路句型', type: 'grammar', duration: 18, completed: false, locked: true, xp: 25 },
          { id: 'l21', title: '酒店入住', type: 'speaking', duration: 20, completed: false, locked: true, xp: 30 },
          { id: 'l22', title: '旅游阅读', type: 'reading', duration: 15, completed: false, locked: true, xp: 20 },
          { id: 'l23', title: '车站广播', type: 'listening', duration: 20, completed: false, locked: true, xp: 30 },
          { id: 'l24', title: 'A级总复习', type: 'review', duration: 40, completed: false, locked: true, xp: 80 },
        ]
      },
    ]
  },
  {
    id: 'en-a2', name: 'A2', title: '初级',
    description: '扩展基础语法，能进行简单的日常交流',
    unlocked: false, totalLessons: 30, completedLessons: 0,
    units: []
  },
  {
    id: 'en-b1', name: 'B1', title: '中级',
    description: '掌握复杂句式，能够应对工作与旅行场景',
    unlocked: false, totalLessons: 36, completedLessons: 0,
    units: []
  },
  {
    id: 'en-b2', name: 'B2', title: '中高级',
    description: '流畅表达观点，理解抽象话题',
    unlocked: false, totalLessons: 36, completedLessons: 0,
    units: []
  },
];

export const JAPANESE_LEVELS: CourseLevel[] = [
  {
    id: 'ja-n5', name: 'N5', title: 'JLPT N5',
    description: '掌握五十音图、基础汉字与最基本的日语表达',
    unlocked: true, totalLessons: 28, completedLessons: 8,
    units: [
      {
        id: 'ju1', title: '五十音图', icon: 'あ', completed: 8, total: 10,
        lessons: [
          { id: 'jl1', title: 'あ行·か行', type: 'vocabulary', duration: 15, completed: true, locked: false, xp: 20 },
          { id: 'jl2', title: 'さ行·た行', type: 'vocabulary', duration: 15, completed: true, locked: false, xp: 20 },
          { id: 'jl3', title: 'な行·は行', type: 'vocabulary', duration: 15, completed: true, locked: false, xp: 20 },
          { id: 'jl4', title: 'ま行·や行', type: 'vocabulary', duration: 12, completed: true, locked: false, xp: 18 },
          { id: 'jl5', title: 'ら行·わ行', type: 'vocabulary', duration: 12, completed: false, locked: false, xp: 18 },
        ]
      },
    ]
  },
];

export const SAMPLE_WORDS: Word[] = [
  { id: 'w1', word: 'Serendipity', translation: '意外发现美好事物的能力', pronunciation: '/ˌserənˈdɪpɪti/', example: 'Finding that book was pure serendipity.', exampleTranslation: '找到那本书纯属意外之喜。', partOfSpeech: 'n.' },
  { id: 'w2', word: 'Ephemeral', translation: '短暂的，转瞬即逝的', pronunciation: '/ɪˈfemərəl/', example: 'Cherry blossoms are ephemeral beauty.', exampleTranslation: '樱花是短暂的美。', partOfSpeech: 'adj.' },
  { id: 'w3', word: 'Resilience', translation: '韧性，恢复力', pronunciation: '/rɪˈzɪliəns/', example: 'Her resilience helped her overcome challenges.', exampleTranslation: '她的韧性帮她克服了挑战。', partOfSpeech: 'n.' },
  { id: 'w4', word: 'Eloquent', translation: '雄辩的，有口才的', pronunciation: '/ˈeləkwənt/', example: 'She gave an eloquent speech.', exampleTranslation: '她发表了一场雄辩的演讲。', partOfSpeech: 'adj.' },
  { id: 'w5', word: 'Ubiquitous', translation: '无处不在的', pronunciation: '/juːˈbɪkwɪtəs/', example: 'Smartphones are ubiquitous today.', exampleTranslation: '智能手机如今无处不在。', partOfSpeech: 'adj.' },
  { id: 'w6', word: 'Tranquil', translation: '宁静的，平静的', pronunciation: '/ˈtræŋkwɪl/', example: 'The lake was tranquil at dawn.', exampleTranslation: '黎明时分湖面很宁静。', partOfSpeech: 'adj.' },
  { id: 'w7', word: 'Mellifluous', translation: '声音甜美流畅的', pronunciation: '/meˈlɪfluəs/', example: 'Her mellifluous voice captivated the audience.', exampleTranslation: '她甜美的声音迷住了观众。', partOfSpeech: 'adj.' },
  { id: 'w8', word: 'Pragmatic', translation: '务实的，实用主义的', pronunciation: '/præɡˈmætɪk/', example: 'We need a pragmatic approach.', exampleTranslation: '我们需要务实的方法。', partOfSpeech: 'adj.' },
];

export const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  {
    id: 'g1',
    prompt: 'Choose the correct form: "If I _____ rich, I would travel the world."',
    options: ['am', 'was', 'were', 'be'],
    correctIndex: 2,
    explanation: '在第二条件句（与现在事实相反的假设）中，be动词统一用were，不论主语人称。这是虚拟语气的标准用法。',
    topic: 'Conditionals'
  },
  {
    id: 'g2',
    prompt: 'Select the properly structured sentence:',
    options: [
      'She has been working here since three years.',
      'She has been working here for three years.',
      'She is working here for three years.',
      'She works here since three years.'
    ],
    correctIndex: 1,
    explanation: '现在完成进行时与for + 时间段连用表示持续的时间长度。since通常与具体时间点连用。',
    topic: 'Tenses'
  },
  {
    id: 'g3',
    prompt: 'The report _____ by the end of this week.',
    options: ['will finish', 'will be finished', 'finishes', 'is finishing'],
    correctIndex: 1,
    explanation: '报告是"被完成"的，需要使用被动语态。将来时的被动结构：will be + 过去分词。',
    topic: 'Passive Voice'
  },
  {
    id: 'g4',
    prompt: 'I suggested that he _____ harder.',
    options: ['studies', 'studied', 'study', 'should studies'],
    correctIndex: 2,
    explanation: 'suggest / recommend / demand 等动词后的that从句使用虚拟语气：(should) + 动词原形，should可省略。',
    topic: 'Subjunctive'
  },
  {
    id: 'g5',
    prompt: 'Neither the teacher nor the students _____ satisfied with the result.',
    options: ['is', 'are', 'was', 'has been'],
    correctIndex: 1,
    explanation: 'neither...nor...结构遵循就近原则，谓语动词与最近的主语students保持一致，用复数。',
    topic: 'Subject-Verb Agreement'
  },
];

export const LISTENING_QUESTIONS: ListeningQuestion[] = [
  {
    id: 'li1',
    audioUrl: '',
    text: 'Good morning, ladies and gentlemen. This is the final boarding call for flight CA123 to Tokyo, now boarding at Gate 14.',
    translation: '早上好，各位女士先生。这是飞往东京的CA123航班的最后登机广播，现在请在14号登机口登机。',
    question: 'What is the destination of this flight?',
    options: ['Beijing', 'Tokyo', 'Seoul', 'Shanghai'],
    correctIndex: 1
  },
  {
    id: 'li2',
    audioUrl: '',
    text: "Hi, I'd like to return this book. I borrowed it two weeks ago, but I didn't have time to finish reading it.",
    translation: '你好，我想还这本书。我两周前借的，但没时间读完。',
    question: 'Where is this conversation most likely taking place?',
    options: ['In a café', 'In a library', 'In a bookstore', 'In a classroom'],
    correctIndex: 1
  },
  {
    id: 'li3',
    audioUrl: '',
    text: "The weather forecast says it'll be sunny and warm in the morning, but we should expect heavy rain starting around 3 PM, so don't forget your umbrella.",
    translation: '天气预报说上午晴朗温暖，但下午3点左右会有大雨，所以别忘了带伞。',
    question: 'When does the speaker expect the rain to start?',
    options: ['9 AM', '12 PM', '3 PM', '6 PM'],
    correctIndex: 2
  },
];

export const SPEAKING_PROMPTS: SpeakingPrompt[] = [
  {
    id: 's1',
    prompt: 'Introduce yourself in English',
    targetSentence: 'Hello, my name is Alex and I am delighted to meet you.',
    translation: '你好，我叫Alex，很高兴认识你。',
    phonetic: '/həˈloʊ, maɪ neɪm ɪz ˈælɪks ænd aɪ æm dɪˈlaɪtɪd tuː miːt juː/',
    difficulty: 'easy'
  },
  {
    id: 's2',
    prompt: 'Talk about your favorite season',
    targetSentence: 'I love autumn because the weather is pleasant and the leaves turn beautiful colors.',
    translation: '我喜欢秋天，因为天气宜人，树叶变成美丽的颜色。',
    phonetic: '/aɪ lʌv ˈɔːtəm bɪˈkɔːz ðə ˈweðər ɪz ˈpleznt ænd ðə liːvz tɜːrn ˈbjuːtəfl ˈkʌlərz/',
    difficulty: 'medium'
  },
  {
    id: 's3',
    prompt: 'Describe your ideal weekend',
    targetSentence: 'On an ideal weekend, I enjoy reading books in a cozy café while sipping a cup of freshly brewed coffee.',
    translation: '在理想的周末，我喜欢在舒适的咖啡馆里看书，喝着一杯现磨咖啡。',
    phonetic: '/ɒn ən aɪˈdiːəl ˈwiːkend, aɪ ɪnˈdʒɔɪ ˈriːdɪŋ bʊks ɪn ə ˈkəʊzi kæˈfeɪ waɪl ˈsɪpɪŋ ə kʌp əv ˈfreʃli bruːd ˈkɒfi/',
    difficulty: 'hard'
  },
];

export const LEARNING_HISTORY: LearningSession[] = [
  { date: '2026-08-11', minutes: 35, xpEarned: 85, wordsLearned: 12, accuracy: 88 },
  { date: '2026-08-12', minutes: 28, xpEarned: 62, wordsLearned: 8, accuracy: 92 },
  { date: '2026-08-13', minutes: 45, xpEarned: 120, wordsLearned: 15, accuracy: 85 },
  { date: '2026-08-14', minutes: 22, xpEarned: 48, wordsLearned: 6, accuracy: 90 },
  { date: '2026-08-15', minutes: 52, xpEarned: 145, wordsLearned: 18, accuracy: 87 },
  { date: '2026-08-16', minutes: 38, xpEarned: 92, wordsLearned: 10, accuracy: 94 },
  { date: '2026-08-17', minutes: 32, xpEarned: 78, wordsLearned: 9, accuracy: 89 },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: '初心者', description: '完成第一节课程', icon: '🌱', tier: 'bronze', xpReward: 50, unlocked: true, unlockedAt: '2026-07-20', progress: 100, goal: 1 },
  { id: 'a2', title: '七日连续', description: '连续学习7天', icon: '🔥', tier: 'bronze', xpReward: 100, unlocked: true, unlockedAt: '2026-07-28', progress: 100, goal: 7 },
  { id: 'a3', title: '百词斩', description: '学习100个新单词', icon: '📚', tier: 'silver', xpReward: 200, unlocked: true, unlockedAt: '2026-08-05', progress: 100, goal: 100 },
  { id: 'a4', title: '口语新星', description: '完成20次口语练习', icon: '🎤', tier: 'silver', xpReward: 200, unlocked: false, progress: 65, goal: 20 },
  { id: 'a5', title: '语法达人', description: '连续答对30道语法题', icon: '🎯', tier: 'gold', xpReward: 500, unlocked: false, progress: 40, goal: 30 },
  { id: 'a6', title: '月度冠军', description: '累计学习2000分钟', icon: '🏆', tier: 'gold', xpReward: 500, unlocked: false, progress: 72, goal: 2000 },
  { id: 'a7', title: '多语言者', description: '同时学习3种语言', icon: '🌍', tier: 'platinum', xpReward: 1000, unlocked: false, progress: 33, goal: 3 },
  { id: 'a8', title: '传奇之路', description: '累计获得10000XP', icon: '💎', tier: 'platinum', xpReward: 2000, unlocked: false, progress: 58, goal: 10000 },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: { name: '小美', avatar: '🌸', level: 28 },
    content: '终于通过了JLPT N2！备考的8个月里每天都在LinguaVerse学习语法，感谢这个平台！分享一下我的心得：每天固定1小时学习，周末做一套模拟题，坚持就是胜利💪',
    language: 'ja', tags: ['考试心得', '日语', 'JLPT'], likes: 342, comments: 56, createdAt: '2小时前', liked: false
  },
  {
    id: 'p2',
    author: { name: 'Alex', avatar: '🧑‍💼', level: 45 },
    content: "I've been learning Korean for 3 months now, and just had my first real conversation with a native speaker! I used the speaking practice module every day, it really helped me get over my fear of speaking. Anyone else learning Korean here?",
    language: 'ko', tags: ['韩语', '口语经验', '坚持打卡'], likes: 218, comments: 34, createdAt: '5小时前', liked: true
  },
  {
    id: 'p3',
    author: { name: '语者', avatar: '📖', level: 62 },
    content: '分享一个背单词的心得：不要孤立地记单词，而是把单词放入具体语境和例句中。比如学"serendipity"，想象自己偶然发现一家好书店的场景，这样记忆会深刻很多。',
    language: 'en', tags: ['学习方法', '词汇', '英语'], likes: 567, comments: 89, createdAt: '昨天', liked: false
  },
  {
    id: 'p4',
    author: { name: 'Pierre', avatar: '🥐', level: 33 },
    content: "法语的联诵真的好难啊 😭 有没有大佬分享一下练习联诵的技巧？我练习了快一个月还是很不自然。",
    language: 'fr', tags: ['法语', '发音', '求助'], likes: 89, comments: 45, createdAt: '昨天', liked: false
  },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: '日语小能手', avatar: '🏯', xp: 18520, streak: 156, level: 78 },
  { rank: 2, name: 'Polyglot王', avatar: '👑', xp: 16890, streak: 203, level: 72 },
  { rank: 3, name: 'Emma学习狂', avatar: '🦄', xp: 15420, streak: 89, level: 68 },
  { rank: 4, name: '夜读人', avatar: '🌙', xp: 14200, streak: 67, level: 62 },
  { rank: 5, name: 'Hinata', avatar: '🌸', xp: 13880, streak: 124, level: 60 },
  { rank: 6, name: '我的名字叫小明', avatar: '🍀', xp: 12750, streak: 45, level: 55, isUser: true },
  { rank: 7, name: '法语爱好者', avatar: '🥖', xp: 11900, streak: 78, level: 52 },
  { rank: 8, name: 'Carlos', avatar: '🌮', xp: 10650, streak: 34, level: 48 },
];

export const RECOMMENDATIONS: Recommendation[] = [
  { id: 'r1', type: 'lesson', title: '现在完成时精讲', description: '掌握have/has + 过去分词的核心用法', reason: '根据上次语法练习错误推荐', duration: 18, xp: 28, icon: '📘', color: 'ocean' },
  { id: 'r2', type: 'review', title: '单词复习：日常高频词', description: '间隔重复记忆，巩固20个重要单词', reason: '15个单词到期复习 · 艾宾浩斯曲线', duration: 12, xp: 18, icon: '🔁', color: 'sunset' },
  { id: 'r3', type: 'speaking', title: '餐厅点餐会话', description: '模拟真实点餐场景，练出地道口语', reason: '口语练习待达标，本周目标还需2次', duration: 20, xp: 35, icon: '🗣️', color: 'jade' },
  { id: 'r4', type: 'challenge', title: '每日挑战：5分钟速记', description: '今日挑战已更新，完成可获双倍XP', reason: '每日挑战已刷新 · 连续挑战12天', duration: 5, xp: 50, icon: '⚡', color: 'lavender' },
];

export const MOCK_USER: User = {
  id: 'u001',
  name: '我的名字叫小明',
  email: 'xiaoming@example.com',
  avatar: '🍀',
  level: 55,
  xp: 12750,
  streak: 45,
  joinDate: '2026-05-20',
  targetLanguage: 'en',
  nativeLanguage: 'zh',
  dailyGoal: 30,
};
