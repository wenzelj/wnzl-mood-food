import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface SuggestionsScreenProps {
  mood: string;
  onBack: () => void;
  onPantryMatch: () => void;
}

const moodSuggestions: Record<string, any> = {
  'Anxious': {
    description: 'You might feel better with something high in magnesium and B-vitamins.',
    meals: ['Salmon + greens', 'Quinoa salad', 'Banana smoothie'],
    snacks: ['Dark chocolate square', 'Greek yogurt', 'Almonds'],
    why: 'Omega-3s can reduce anxiety and magnesium helps calm the nervous system.'
  },
  'Tired': {
    description: 'Boost your energy with iron-rich foods and complex carbs.',
    meals: ['Oatmeal with banana', 'Spinach and egg wrap', 'Lentil soup'],
    snacks: ['Trail mix', 'Apple with peanut butter', 'Energy balls'],
    why: 'Iron helps oxygen transport and B-vitamins support energy metabolism.'
  },
  'Happy': {
    description: 'Maintain your good mood with balanced, colorful meals.',
    meals: ['Rainbow salad', 'Grilled chicken with vegetables', 'Fruit smoothie bowl'],
    snacks: ['Mixed berries', 'Hummus with veggies', 'Yogurt parfait'],
    why: 'Colorful foods provide antioxidants that support brain health and mood.'
  }
};

const SuggestionsScreen: React.FC<SuggestionsScreenProps> = ({ mood, onBack, onPantryMatch }) => {
  const [whyExpanded, setWhyExpanded] = useState(false);
  const { toggleBookmark } = useAppContext();
  const suggestions = moodSuggestions[mood] || moodSuggestions['Happy'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-md mx-auto pt-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl mb-4">
          <CardHeader>
            <CardTitle className="text-center">
              You said: "{mood}"
            </CardTitle>
            <p className="text-center text-gray-600">{suggestions.description}</p>
          </CardHeader>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              🥘 Best Meals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestions.meals.map((meal: string, index: number) => (
                <li key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <span>• {meal}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleBookmark(meal)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ♡
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              🥄 Quick Snacks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestions.snacks.map((snack: string, index: number) => (
                <li key={index} className="flex items-center p-2 bg-orange-50 rounded-lg">
                  • {snack}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Collapsible open={whyExpanded} onOpenChange={setWhyExpanded}>
          <Card className="bg-white/90 backdrop-blur-sm shadow-2xl mb-4">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50">
                <CardTitle className="flex items-center justify-between">
                  🧠 Why This Works
                  <ChevronDown className={`h-4 w-4 transition-transform ${whyExpanded ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <p className="text-gray-700">{suggestions.why}</p>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Button
          onClick={onPantryMatch}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl"
          size="lg"
        >
          Pantry Match
        </Button>
      </div>
    </div>
  );
};

export default SuggestionsScreen;