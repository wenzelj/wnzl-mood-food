import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './HomeScreen';
import SuggestionsScreen from './SuggestionsScreen';
import PantryScreen from './PantryScreen';
import ProfileScreen from './ProfileScreen';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAppContext } from '@/contexts/AppContext';

type Screen = 'welcome' | 'home' | 'suggestions' | 'pantry' | 'profile';

const AppLayout: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const { addMoodEntry } = useAppContext();

  const handleGetStarted = () => {
    setCurrentScreen('home');
    toast({
      title: "Welcome to MoodMeals!",
      description: "Let's find the perfect meal for your mood.",
    });
  };

  const handleSignIn = () => {
    toast({
      title: "Sign In",
      description: "Sign in feature coming soon!",
    });
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    addMoodEntry(mood);
    setCurrentScreen('suggestions');
    toast({
      title: `Feeling ${mood}`,
      description: "Here are some meal suggestions for you!",
    });
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice input feature coming soon!",
    });
  };

  const handlePantryMatch = () => {
    setCurrentScreen('pantry');
  };

  const handleProfile = () => {
    setCurrentScreen('profile');
  };

  const handleBack = () => {
    if (currentScreen === 'suggestions') {
      setCurrentScreen('home');
    } else if (currentScreen === 'pantry') {
      setCurrentScreen('suggestions');
    } else if (currentScreen === 'profile') {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('home');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onGetStarted={handleGetStarted}
            onSignIn={handleSignIn}
          />
        );
      case 'home':
        return (
          <>
            <div className="absolute top-4 right-4 z-10">
              <Button
                onClick={handleProfile}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-full p-2"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
            <HomeScreen
              onMoodSelect={handleMoodSelect}
              onVoiceInput={handleVoiceInput}
            />
          </>
        );
      case 'suggestions':
        return (
          <SuggestionsScreen
            mood={selectedMood}
            onBack={handleBack}
            onPantryMatch={handlePantryMatch}
          />
        );
      case 'pantry':
        return (
          <PantryScreen
            onBack={handleBack}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onBack={handleBack}
          />
        );
      default:
        return (
          <WelcomeScreen
            onGetStarted={handleGetStarted}
            onSignIn={handleSignIn}
          />
        );
    }
  };

  return (
    <div className="min-h-screen relative">
      {renderScreen()}
    </div>
  );
};

export default AppLayout;