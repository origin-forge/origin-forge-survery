export interface SurveyOption {
  id: string;
  label: string;
  value: string;
  emoji?: string;
  points?: number;
}

export interface SurveyQuestion {
  id: number;
  question: string;
  description?: string;
  type: 'single-choice' | 'multiple-choice' | 'rating' | 'text' | 'email';
  options?: SurveyOption[];
  required: boolean;
  humor?: string;
  gameTitle?: string;
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    gameTitle: "Choose Your Weapon ⚔️",
    question: "What's your primary gaming platform?",
    description: "Where do you spend most of your time conquering digital worlds?",
    humor: "Don't worry, we won't judge if you say mobile... much 😏",
    type: 'single-choice',
    required: true,
    options: [
      { id: 'pc', label: 'PC Master Race', value: 'pc', emoji: '💻', points: 100 },
      { id: 'playstation', label: 'PlayStation Squad', value: 'playstation', emoji: '🎮', points: 90 },
      { id: 'xbox', label: 'Xbox Warriors', value: 'xbox', emoji: '🎯', points: 90 },
      { id: 'nintendo', label: 'Nintendo Family', value: 'nintendo', emoji: '🍄', points: 85 },
      { id: 'mobile', label: 'Mobile Legends', value: 'mobile', emoji: '📱', points: 70 },
      { id: 'multiple', label: 'Platform Nomad', value: 'multiple', emoji: '🌍', points: 110 }
    ]
  },
  {
    id: 2,
    gameTitle: "Time Investment Level 📊",
    question: "How many hours do you game per week?",
    description: "Be honest... we&apos;ve all lost track of time in a good game",
    humor: "Remember: time spent gaming is never time wasted! 🎲",
    type: 'single-choice',
    required: true,
    options: [
      { id: 'casual', label: '1-5 hours (Weekend Warrior)', value: 'casual', emoji: '🏃', points: 20 },
      { id: 'regular', label: '6-15 hours (Daily Player)', value: 'regular', emoji: '🎮', points: 50 },
      { id: 'dedicated', label: '16-30 hours (Serious Gamer)', value: 'dedicated', emoji: '🔥', points: 80 },
      { id: 'hardcore', label: '31-50 hours (Gaming Enthusiast)', value: 'hardcore', emoji: '⚡', points: 100 },
      { id: 'professional', label: '50+ hours (Living the Dream)', value: 'professional', emoji: '👑', points: 150 }
    ]
  },
  {
    id: 3,
    gameTitle: "Genre Buffet 🍽️",
    question: "What genres make your heart race?",
    description: "Pick all that apply - we know you&apos;re not monogamous with game genres!",
    humor: "It&apos;s okay to have multiple gaming personalities 🎭",
    type: 'multiple-choice',
    required: true,
    options: [
      { id: 'fps', label: 'First-Person Shooters', value: 'fps', emoji: '🔫', points: 25 },
      { id: 'rpg', label: 'Role-Playing Games', value: 'rpg', emoji: '🗡️', points: 30 },
      { id: 'strategy', label: 'Strategy Games', value: 'strategy', emoji: '🧠', points: 35 },
      { id: 'moba', label: 'MOBA (League, Dota)', value: 'moba', emoji: '⚔️', points: 30 },
      { id: 'racing', label: 'Racing Games', value: 'racing', emoji: '🏎️', points: 20 },
      { id: 'sports', label: 'Sports Games', value: 'sports', emoji: '⚽', points: 20 },
      { id: 'indie', label: 'Indie Gems', value: 'indie', emoji: '💎', points: 25 },
      { id: 'battle-royale', label: 'Battle Royale', value: 'battle-royale', emoji: '🏆', points: 25 }
    ]
  },
  {
    id: 4,
    gameTitle: "Competitive Spirit Meter 🌡️",
    question: "How important is winning to you?",
    description: "Rate your competitive fire from chill to ULTRA INSTINCT",
    humor: "We promise not to tell anyone if you rage quit sometimes 😅",
    type: 'rating',
    required: true,
    options: [
      { id: '1', label: 'Just Vibing', value: '1', emoji: '😌', points: 10 },
      { id: '2', label: 'Casually Caring', value: '2', emoji: '🙂', points: 20 },
      { id: '3', label: 'Getting Serious', value: '3', emoji: '😤', points: 40 },
      { id: '4', label: 'Highly Competitive', value: '4', emoji: '🔥', points: 70 },
      { id: '5', label: 'MUST. WIN. EVERYTHING.', value: '5', emoji: '👹', points: 100 }
    ]
  },
  {
    id: 5,
    gameTitle: "Gaming Motivation Station 🚂",
    question: "What fuels your gaming soul?",
    description: "Choose the one thing that gets you most excited to boot up a game",
    humor: "No judgment if it&apos;s just escaping reality for a bit! 🌟",
    type: 'single-choice',
    required: true,
    options: [
      { id: 'achievement', label: 'Sweet, Sweet Achievements', value: 'achievement', emoji: '🏅', points: 60 },
      { id: 'social', label: 'Gaming with Friends', value: 'social', emoji: '👥', points: 70 },
      { id: 'competition', label: 'Crushing Opponents', value: 'competition', emoji: '💪', points: 80 },
      { id: 'exploration', label: 'Discovering New Worlds', value: 'exploration', emoji: '🗺️', points: 65 },
      { id: 'creativity', label: 'Building & Creating', value: 'creativity', emoji: '🎨', points: 75 },
      { id: 'relaxation', label: 'Chilling & Unwinding', value: 'relaxation', emoji: '🧘', points: 50 }
    ]
  },
  {
    id: 6,
    gameTitle: "Crystal Ball Gaming 🔮",
    question: "Where do you see gaming in 5 years?",
    description: "Share your wildest predictions, hopes, or fears about the future of gaming",
    humor: "Flying controllers? Mind-reading NPCs? Pizza delivery via portal gun? Tell us! 🍕",
    type: 'text',
    required: false
  },
  {
    id: 7,
    gameTitle: "Stay Connected 📧",
    question: "What's your email address?",
    description: "We'll send you updates about gaming trends and exclusive insights from OriginForge",
    humor: "No spam, just the good stuff! Promise we won't sell your email to aliens 👽",
    type: 'email',
    required: true
  }
];

export type SurveyAnswers = Record<number, string | string[]>;
