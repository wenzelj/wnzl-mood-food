import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic } from 'lucide-react';

interface HomeScreenProps {
  onMoodSelect: (mood: string) => void;
  onVoiceInput: () => void;
}

const moods = [
  { emoji: '😄', name: 'Happy', color: 'bg-yellow-400' },
  { emoji: '😔', name: 'Sad', color: 'bg-blue-400' },
  { emoji: '😠', name: 'Angry', color: 'bg-red-400' },
  { emoji: '😰', name: 'Anxious', color: 'bg-purple-400' },
  { emoji: '😴', name: 'Tired', color: 'bg-gray-400' },
  { emoji: '😐', name: 'Bored', color: 'bg-green-400' }
];

const HomeScreen: React.FC<HomeScreenProps> = ({ onMoodSelect, onVoiceInput }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-md mx-auto pt-16">
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              How are you feeling today?
            </h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {moods.map((mood) => (
                <button
                  key={mood.name}
                  onClick={() => onMoodSelect(mood.name)}
                  className={`${mood.color} p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-all duration-200 hover:shadow-xl`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium text-white">{mood.name}</div>
                </button>
              ))}
            </div>

            <Button
              onClick={onVoiceInput}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg mb-4"
              size="lg"
            >
              <Mic className="mr-2 h-5 w-5" />
              🎤 Tap to Speak
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;