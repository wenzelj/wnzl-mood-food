import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted, onSignIn }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🌟</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to MoodMeals
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            "Eat with how you feel."
          </p>
          <div className="space-y-4">
            <Button 
              onClick={onGetStarted}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              size="lg"
            >
              Get Started
            </Button>
            <Button 
              onClick={onSignIn}
              variant="outline"
              className="w-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-xl"
              size="lg"
            >
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;