import { Idea, Application, User } from './types';

// Initialize localStorage if running in browser
const isClient = typeof window !== 'undefined';

// Helper to get data from localStorage
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (!isClient) return defaultValue;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

// Helper to set data in localStorage
const setInStorage = <T>(key: string, value: T): void => {
  if (!isClient) return;
  localStorage.setItem(key, JSON.stringify(value));
};

// Ideas
export const getIdeas = (): Idea[] => {
  return getFromStorage<Idea[]>('ideas', []);
};

export const getIdeaById = (id: string): Idea | undefined => {
  const ideas = getIdeas();
  return ideas.find(idea => idea.id === id);
};

export const saveIdea = (idea: Idea): void => {
  const ideas = getIdeas();
  const existingIndex = ideas.findIndex(i => i.id === idea.id);
  
  if (existingIndex >= 0) {
    ideas[existingIndex] = idea;
  } else {
    ideas.push(idea);
  }
  
  setInStorage('ideas', ideas);
};

export const deleteIdea = (id: string): void => {
  const ideas = getIdeas();
  setInStorage('ideas', ideas.filter(idea => idea.id !== id));
};

// Applications
export const getApplications = (): Application[] => {
  return getFromStorage<Application[]>('applications', []);
};

export const getApplicationsByIdeaId = (ideaId: string): Application[] => {
  const applications = getApplications();
  return applications.filter(app => app.ideaId === ideaId);
};

export const getApplicationsByUserId = (userId: string): Application[] => {
  const applications = getApplications();
  return applications.filter(app => app.userId === userId);
};

export const saveApplication = (application: Application): void => {
  const applications = getApplications();
  const existingIndex = applications.findIndex(a => a.id === application.id);
  
  if (existingIndex >= 0) {
    applications[existingIndex] = application;
  } else {
    applications.push(application);
  }
  
  setInStorage('applications', applications);
};

// Users
export const getUsers = (): User[] => {
  return getFromStorage<User[]>('users', []);
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  setInStorage('users', users);
};

// Authentication
export const getCurrentUserId = (): string | null => {
  return getFromStorage<string | null>('currentUserId', null);
};

export const setCurrentUserId = (userId: string | null): void => {
  setInStorage('currentUserId', userId);
};

export const getCurrentUser = (): User | undefined => {
  const userId = getCurrentUserId();
  if (!userId) return undefined;
  return getUserById(userId);
};

// Current idea (for navigation without route params)
export const setCurrentIdeaId = (ideaId: string | null): void => {
  setInStorage('currentIdeaId', ideaId);
};

export const getCurrentIdeaId = (): string | null => {
  return getFromStorage<string | null>('currentIdeaId', null);
};

// Initialize demo data if needed
export const initializeDemoData = (): void => {
  const ideas = getIdeas();
  if (ideas.length === 0) {
    // Add some demo ideas
    const demoIdeas: Idea[] = [
      {
        id: '1',
        title: 'Mobile App for Local Farmers',
        shortDescription: 'Connect farmers directly with consumers through a mobile marketplace',
        longDescription: 'This app will eliminate middlemen by providing a platform where local farmers can list their produce and consumers can order directly. Features include inventory management, order processing, and delivery tracking.',
        professions: ['Mobile Developer', 'UI/UX Designer', 'Product Manager'],
        category: 'Mobile App',
        timeRequired: '3-6 months',
        isPaid: true,
        membersNeeded: 4,
        userId: 'demo',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'AI-Powered Resume Builder',
        shortDescription: 'Use AI to create tailored resumes for specific job applications',
        longDescription: 'This web application will analyze job descriptions and user skills to automatically generate optimized resumes. The system will learn from successful applications to improve suggestions over time.',
        professions: ['AI Engineer', 'Frontend Developer', 'UX Researcher'],
        category: 'Web App',
        timeRequired: '2-4 months',
        isPaid: false,
        membersNeeded: 3,
        userId: 'demo',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'VR Educational Platform',
        shortDescription: 'Create immersive learning experiences through virtual reality',
        longDescription: 'This VR platform will provide educational content across various subjects in an immersive environment. Users can interact with 3D models, participate in simulations, and attend virtual lectures.',
        professions: ['VR Developer', '3D Artist', 'Educational Content Creator'],
        category: 'Virtual Reality',
        timeRequired: '6-12 months',
        isPaid: true,
        membersNeeded: 5,
        userId: 'demo',
        createdAt: new Date().toISOString()
      }
    ];
    
    demoIdeas.forEach(idea => saveIdea(idea));
    
    // Add a demo user
    const demoUser: User = {
      id: 'demo',
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123'
    };
    
    saveUser(demoUser);
  }
};