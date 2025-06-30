import { User, Folder, Course, Game } from '../types';

export const mockUser: User = {
  id: 'user_123',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face',
  recentTopics: ['Machine Learning', 'Photography', 'Cooking'],
  progress: {
    'course_001': {
      completedGames: [0, 1],
      lastAccessed: '2025-01-20T10:00:00Z',
      xpEarned: 200,
      accuracy: 85
    },
    'course_002': {
      completedGames: [0],
      lastAccessed: '2025-01-19T15:30:00Z',
      xpEarned: 100,
      accuracy: 92
    }
  },
  totalXP: 2450,
  streak: 7,
  level: 12
};

export const mockFolders: Folder[] = [
  {
    id: 'folder_001',
    title: 'Machine Learning',
    description: 'Comprehensive courses covering AI and ML fundamentals, algorithms, and practical applications.',
    createdBy: 'system',
    createdAt: '2025-01-15T10:00:00Z',
    courseIds: ['course_001', 'course_002'],
    color: 'from-blue-500 to-cyan-500',
    icon: 'brain'
  },
  {
    id: 'folder_002',
    title: 'Creative Arts',
    description: 'Explore photography, design principles, and artistic techniques.',
    createdBy: 'system',
    createdAt: '2025-01-14T14:30:00Z',
    courseIds: ['course_003'],
    color: 'from-purple-500 to-pink-500',
    icon: 'palette'
  },
  {
    id: 'folder_003',
    title: 'Business & Finance',
    description: 'Learn essential business skills, financial literacy, and entrepreneurship.',
    createdBy: 'system',
    createdAt: '2025-01-13T09:15:00Z',
    courseIds: ['course_004'],
    color: 'from-green-500 to-teal-500',
    icon: 'trending-up'
  }
];

const sampleGames: Game[] = [
  {
    id: 'game_001',
    order: 1,
    type: 'multiple-choice',
    question: 'What is the primary goal of supervised learning?',
    options: [
      'To find hidden patterns in data',
      'To learn from labeled examples to make predictions',
      'To reduce data dimensionality',
      'To cluster similar data points'
    ],
    correctAnswer: 'To learn from labeled examples to make predictions',
    explanation: 'Supervised learning uses labeled training data to learn a mapping from inputs to outputs, enabling the model to make predictions on new, unseen data.',
    xpReward: 100,
    hints: ['Think about the key difference between supervised and unsupervised learning']
  },
  {
    id: 'game_002',
    order: 2,
    type: 'multiple-choice',
    question: 'Which algorithm is commonly used for classification tasks?',
    options: [
      'K-means clustering',
      'Random Forest',
      'PCA',
      'DBSCAN'
    ],
    correctAnswer: 'Random Forest',
    explanation: 'Random Forest is an ensemble method that combines multiple decision trees and is widely used for both classification and regression tasks.',
    xpReward: 120,
    hints: ['This algorithm uses multiple decision trees']
  }
];

export const mockCourses: Course[] = [
  {
    id: 'course_001',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of ML algorithms, supervised and unsupervised learning, and practical applications in real-world scenarios.',
    createdBy: 'system',
    createdAt: '2025-01-15T10:00:00Z',
    folderId: 'folder_001',
    games: sampleGames,
    difficulty: 'beginner',
    estimatedTime: 45,
    totalXP: 500
  },
  {
    id: 'course_002',
    title: 'Deep Learning Foundations',
    description: 'Dive into neural networks, backpropagation, and deep learning architectures like CNNs and RNNs.',
    createdBy: 'system',
    createdAt: '2025-01-14T16:20:00Z',
    folderId: 'folder_001',
    games: [...sampleGames.map(g => ({ ...g, id: g.id + '_dl', order: g.order + 2 }))],
    difficulty: 'intermediate',
    estimatedTime: 75,
    totalXP: 800
  },
  {
    id: 'course_003',
    title: 'Photography Composition',
    description: 'Master the art of composition, lighting, and visual storytelling through practical photography techniques.',
    createdBy: 'system',
    createdAt: '2025-01-13T11:45:00Z',
    folderId: 'folder_002',
    games: [
      {
        id: 'game_photo_001',
        order: 1,
        type: 'multiple-choice',
        question: 'What is the rule of thirds in photography?',
        options: [
          'Taking three photos of the same subject',
          'Dividing the frame into nine equal sections',
          'Using three different lenses',
          'Shooting at three different apertures'
        ],
        correctAnswer: 'Dividing the frame into nine equal sections',
        explanation: 'The rule of thirds involves dividing your frame into nine equal sections with two horizontal and two vertical lines, placing important elements along these lines or at their intersections.',
        xpReward: 80,
        hints: ['Think about dividing your camera viewfinder']
      }
    ],
    difficulty: 'beginner',
    estimatedTime: 30,
    totalXP: 300
  },
  {
    id: 'course_004',
    title: 'Financial Planning Basics',
    description: 'Learn essential financial concepts including budgeting, investing, and retirement planning.',
    createdBy: 'system',
    createdAt: '2025-01-12T13:30:00Z',
    folderId: 'folder_003',
    games: [
      {
        id: 'game_finance_001',
        order: 1,
        type: 'multiple-choice',
        question: 'What is compound interest?',
        options: [
          'Interest paid only on the principal amount',
          'Interest calculated on principal plus previously earned interest',
          'A type of bank account',
          'The interest rate set by the central bank'
        ],
        correctAnswer: 'Interest calculated on principal plus previously earned interest',
        explanation: 'Compound interest is the addition of interest to the principal sum of a loan or deposit, so that interest is earned on interest from that moment on.',
        xpReward: 90,
        hints: ['Think about interest earning interest']
      }
    ],
    difficulty: 'beginner',
    estimatedTime: 25,
    totalXP: 250
  }
];