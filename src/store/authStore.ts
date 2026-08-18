import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LanguageCode } from '../types';
import { MOCK_USER } from '../data/mockData';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setTargetLanguage: (lang: LanguageCode) => void;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(r => setTimeout(r, 800));
        if (email && password.length >= 6) {
          set({ user: MOCK_USER, isLoggedIn: true });
          return true;
        }
        return false;
      },

      register: async (name: string, email: string, password: string) => {
        await new Promise(r => setTimeout(r, 800));
        if (name && email && password.length >= 6) {
          const newUser: User = {
            ...MOCK_USER,
            name,
            email,
            level: 1,
            xp: 0,
            streak: 1,
            joinDate: new Date().toISOString().split('T')[0],
          };
          set({ user: newUser, isLoggedIn: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },

      updateUser: (updates) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      setTargetLanguage: (lang) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, targetLanguage: lang } });
        }
      },

      addXp: (amount) => {
        const { user } = get();
        if (user) {
          const newXp = user.xp + amount;
          const newLevel = Math.floor(newXp / 300) + 1;
          set({ user: { ...user, xp: newXp, level: newLevel } });
        }
      },

      incrementStreak: () => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, streak: user.streak + 1 } });
        }
      },
    }),
    {
      name: 'linguaverse-auth',
    }
  )
);
