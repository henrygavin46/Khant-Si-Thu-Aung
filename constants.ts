
import { Question } from './types';

export const LIKERT_SCALE = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
  'Don\'t Know/N/A'
];

export const SURVEY_QUESTIONS: Question[] = [
  // Demographic Information
  {
    id: 'q1',
    section: 'Demographic Information',
    text: 'Current academic level:',
    type: 'single',
    options: [
      'Undergraduate student (Year 1)',
      'Undergraduate student (Year 2)',
      'Undergraduate student (Year 3)',
      'Undergraduate student (Year 4)'
    ],
    hasOther: true
  },
  {
    id: 'q2',
    section: 'Demographic Information',
    text: 'Country/System:',
    type: 'single',
    options: ['Myanmar', 'Thailand'],
    hasOther: true
  },
  {
    id: 'q3',
    section: 'Demographic Information',
    text: 'Primary research discipline (Optional):',
    type: 'text',
    optional: true,
    placeholder: 'e.g. Computer Science, Social Science...'
  },
  {
    id: 'q4',
    section: 'Demographic Information',
    text: 'What is your first language?',
    type: 'text',
    placeholder: 'e.g. Burmese, Thai, etc.'
  },

  // Section 1
  {
    id: 'q5',
    section: 'Section 1: Frequency and Purpose of AI Use',
    text: 'How often do you use generative AI tools (ChatGPT, Gemini, Claude, etc.) for any kind of academic work?',
    type: 'single',
    options: [
      'Never',
      'Rarely (a few times per semester)',
      'Sometimes (monthly)',
      'Often (weekly)',
      'Very often (daily or almost daily)'
    ]
  },
  {
    id: 'q6',
    section: 'Section 1: Frequency and Purpose of AI Use',
    text: 'For which purposes do you use AI? (Select all that apply)',
    type: 'multiple',
    options: [
      'Brainstorming ideas',
      'Generating outlines',
      'Drafting full paragraphs or sections',
      'Paraphrasing or rewording my own writing',
      'Improving grammar and language',
      'Translating from my native language',
      'Checking for plagiarism or AI detection',
      'Data analysis or coding assistance',
      'Literature review assistance',
      'I do not use AI'
    ],
    hasOther: true
  },
  {
    id: 'q7',
    section: 'Section 1: Frequency and Purpose of AI Use',
    text: 'What is your PRIMARY reason for using (or considering using) AI for academic work? (Select one)',
    type: 'single',
    options: [
      'Saves time',
      'Improves language quality',
      'Helps overcome language barriers',
      'Lack of other support (mentors, editors)',
      'Everyone else is using it',
      'I don\'t use or consider using AI'
    ],
    hasOther: true
  },
  {
    id: 'q8',
    section: 'Section 1: Frequency and Purpose of AI Use',
    text: 'If you generate text with AI, you usually:',
    type: 'single',
    options: [
      'Use it as it is',
      'Edit a few words',
      'Re-write most of it in my own writing style',
      'Completely re-write it',
      'Don\'t generate text with AI'
    ]
  },

  // Section 2
  {
    id: 'q9',
    section: 'Section 2: AI Modification Practices & Detection Awareness',
    text: 'Have you ever used any of the following to modify AI-generated text? (Select all that apply)',
    type: 'multiple',
    options: [
      'Manual editing and rewriting',
      'Paraphrasing tools (QuillBot, Wordtune, etc.)',
      'Translation back-and-forth (English → native language → English)',
      'Asking AI to "make it sound more human"',
      'Adding personal examples or experiences',
      'None - I don\'t modify AI text',
      'I don\'t use AI to generate text'
    ]
  },
  {
    id: 'q10',
    section: 'Section 2: AI Modification Practices & Detection Awareness',
    text: 'Are you aware that AI detection tools exist (like Turnitin AI detector, GPTZero)?',
    type: 'single',
    options: ['Yes, very aware', 'Somewhat aware', 'Not aware']
  },
  {
    id: 'q11',
    section: 'Section 2: AI Modification Practices & Detection Awareness',
    text: 'How confident are you that AI detection tools can accurately identify AI-generated text that has been modified?',
    type: 'single',
    options: [
      'Very confident they can detect it',
      'Somewhat confident',
      'Not very confident',
      'Not confident at all - they can be easily fooled',
      'I don\'t know'
    ]
  },
  {
    id: 'q12',
    section: 'Section 2: AI Modification Practices & Detection Awareness',
    text: 'If you knew that detection tools often fail, would this affect your likelihood of using AI?',
    type: 'single',
    options: [
      'Much more likely to use AI',
      'Somewhat more likely to use AI',
      'No change',
      'Somewhat less likely to use AI',
      'Much less likely to use AI'
    ]
  },

  // Section 3 - Scale
  {
    id: 'q13',
    section: 'Section 3: Perceptions and Attitudes',
    text: 'AI detection tools unfairly flag authentic writing by non-native English speakers as AI-generated.',
    type: 'scale'
  },
  {
    id: 'q14',
    section: 'Section 3: Perceptions and Attitudes',
    text: 'When I use AI to help with my writing and then modify it, I consider it to be my own work.',
    type: 'scale'
  },
  {
    id: 'q15',
    section: 'Section 3: Perceptions and Attitudes',
    text: 'AI tools help level the playing field between non-native and native English speakers in academic writing.',
    type: 'scale'
  },
  {
    id: 'q16',
    section: 'Section 3: Perceptions and Attitudes',
    text: 'I use AI because I don\'t have access to adequate writing support.',
    type: 'scale'
  },
  {
    id: 'q17',
    section: 'Section 3: Perceptions and Attitudes',
    text: 'I am aware of my university\'s AI policy regarding academic work.',
    type: 'scale'
  },
  {
    id: 'q18',
    section: 'Section 3: Perceptions and Attitudes',
    text: 'Current institutional policies about AI use are fair and reasonable.',
    type: 'scale'
  },
  {
    id: 'q19',
    section: 'Section 3: Perceptions and Attitudes',
    text: 'I trust my institution to fairly evaluate whether my work is authentic.',
    type: 'scale'
  },
  {
    id: 'q20',
    section: 'Section 3: Perceptions and Attitudes',
    text: 'Institutions should focus on better teaching and assessment design rather than trying to detect AI use.',
    type: 'scale'
  },
  {
    id: 'q21',
    section: 'Section 3: Perceptions and Attitudes',
    text: 'I feel anxious about being accused of using AI inappropriately.',
    type: 'scale'
  },
  {
    id: 'q22',
    section: 'Section 3: Perceptions and Attitudes',
    text: 'I am confused about what counts as acceptable AI use in my academic work.',
    type: 'scale'
  },

  // Section 4
  {
    id: 'q23',
    section: 'Section 4: Experience and Resources',
    text: 'Have you or someone you know had authentic (human-written) work incorrectly flagged as AI-generated?',
    type: 'single',
    options: [
      'Yes, this happened to me personally',
      'Yes, I know someone this happened to',
      'No',
      'I\'m not sure'
    ]
  },
  {
    id: 'q24',
    section: 'Section 4: Experience and Resources',
    text: 'Do you have access to the following academic writing support? (Select all that apply)',
    type: 'multiple',
    options: [
      'Regular mentorship/supervision',
      'University writing center',
      'Professional language editing services',
      'Peer writing groups',
      'Academic writing workshops',
      'None of the above'
    ]
  },

  // Section 5
  {
    id: 'q25',
    section: 'Section 5: Policy Preferences',
    text: 'Which approach would you prefer for managing AI use in academic work? (Select one)',
    type: 'single',
    options: [
      'Strict ban on all AI use with detection enforcement',
      'Allowed with mandatory disclosure of AI use',
      'Allowed for specific purposes (e.g., language editing only)',
      'Completely allowed with focus on learning outcomes instead'
    ],
    hasOther: true
  },
  {
    id: 'q26',
    section: 'Section 5: Policy Preferences',
    text: 'Would you be willing to openly declare AI use if there was no penalty for appropriate use?',
    type: 'single',
    options: [
      'Definitely yes',
      'Probably yes',
      'Unsure',
      'Probably no',
      'Definitely no'
    ]
  },

  // Optional
  {
    id: 'q27',
    section: 'Optional: Your Perspectives',
    text: 'What is your biggest concern about AI use in academic work? (Optional)',
    type: 'text',
    optional: true
  },
  {
    id: 'q28',
    section: 'Optional: Your Perspectives',
    text: 'What would make you feel that AI policies are fair and supportive of your needs as a student? (Optional)',
    type: 'text',
    optional: true
  }
];
