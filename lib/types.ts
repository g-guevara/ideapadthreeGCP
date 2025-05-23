export interface Idea {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  professions: string[];
  category: string;
  timeRequired: string;
  isPaid: boolean;
  membersNeeded: number;
  userId: string;
  createdAt: string;
}

export interface Application {
  id: string;
  ideaId: string;
  name: string;
  email: string;
  coverLetter: string;
  cvUrl: string;
  userId: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}