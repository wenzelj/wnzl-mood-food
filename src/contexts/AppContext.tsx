import React, { createContext, useContext, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface MoodEntry {
  id: string;
  mood: string;
  timestamp: Date;
  meals?: string[];
}

interface UserPreferences {
  dietary: string[];
  allergies: string[];
  healthGoals: string[];
}

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  moodHistory: MoodEntry[];
  addMoodEntry: (mood: string, meals?: string[]) => void;
  userPreferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  bookmarkedRecipes: string[];
  toggleBookmark: (recipe: string) => void;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  moodHistory: [],
  addMoodEntry: () => {},
  userPreferences: {
    dietary: [],
    allergies: [],
    healthGoals: []
  },
  updatePreferences: () => {},
  bookmarkedRecipes: [],
  toggleBookmark: () => {}
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    dietary: [],
    allergies: [],
    healthGoals: []
  });
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<string[]>([]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const addMoodEntry = (mood: string, meals?: string[]) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      timestamp: new Date(),
      meals
    };
    setMoodHistory(prev => [newEntry, ...prev.slice(0, 49)]); // Keep last 50 entries
  };

  const updatePreferences = (preferences: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...preferences }));
    toast({
      title: "Preferences Updated",
      description: "Your dietary preferences have been saved.",
    });
  };

  const toggleBookmark = (recipe: string) => {
    setBookmarkedRecipes(prev => {
      const isBookmarked = prev.includes(recipe);
      if (isBookmarked) {
        toast({ title: "Removed from bookmarks", description: recipe });
        return prev.filter(r => r !== recipe);
      } else {
        toast({ title: "Added to bookmarks", description: recipe });
        return [...prev, recipe];
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        moodHistory,
        addMoodEntry,
        userPreferences,
        updatePreferences,
        bookmarkedRecipes,
        toggleBookmark
      }}
    >
      {children}
    </AppContext.Provider>
  );
};