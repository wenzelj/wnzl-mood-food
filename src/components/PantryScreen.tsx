import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface PantryScreenProps {
  onBack: () => void;
}

const commonIngredients = [
  'Eggs', 'Milk', 'Bread', 'Rice', 'Pasta', 'Chicken', 'Salmon',
  'Spinach', 'Tomatoes', 'Onions', 'Garlic', 'Olive Oil', 'Butter'
];

const PantryScreen: React.FC<PantryScreenProps> = ({ onBack }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');

  const addIngredient = (ingredient: string) => {
    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const filteredMeals = [
    'Scrambled eggs with spinach',
    'Pasta with garlic and olive oil',
    'Simple fried rice'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 p-4">
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
            <CardTitle>🥄 What's in your pantry?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Add ingredient..."
                onKeyPress={(e) => e.key === 'Enter' && addIngredient(newIngredient)}
              />
              <Button
                onClick={() => addIngredient(newIngredient)}
                size="sm"
                className="bg-green-500 hover:bg-green-600"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {commonIngredients.map((ingredient) => (
                  <Button
                    key={ingredient}
                    variant="outline"
                    size="sm"
                    onClick={() => addIngredient(ingredient)}
                    className="text-xs"
                  >
                    {ingredient}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Your ingredients:</p>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {ingredient}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeIngredient(ingredient)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl mb-4">
          <CardHeader>
            <CardTitle>🍽️ Meals you can make:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {filteredMeals.map((meal, index) => (
                <li key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  • {meal}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Button
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl"
          size="lg"
        >
          Show Recipes
        </Button>
      </div>
    </div>
  );
};

export default PantryScreen;