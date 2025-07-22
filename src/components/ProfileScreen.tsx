import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Settings, Heart, History } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface ProfileScreenProps {
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const { moodHistory, userPreferences, bookmarkedRecipes } = useAppContext();

  const recentMoods = moodHistory.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600 p-4">
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
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Profile & Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Dietary Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {userPreferences.dietary.length > 0 ? (
                    userPreferences.dietary.map((pref) => (
                      <Badge key={pref} variant="secondary">{pref}</Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No preferences set</p>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <Button
                variant="outline"
                className="w-full"
              >
                Edit Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="mr-2 h-5 w-5" />
              Recent Moods
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentMoods.length > 0 ? (
              <div className="space-y-2">
                {recentMoods.map((entry) => (
                  <div key={entry.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <span className="font-medium">{entry.mood}</span>
                    <span className="text-sm text-gray-500">
                      {entry.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No mood entries yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl mb-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              Bookmarked Recipes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookmarkedRecipes.length > 0 ? (
              <div className="space-y-2">
                {bookmarkedRecipes.slice(0, 5).map((recipe, index) => (
                  <div key={index} className="p-2 bg-red-50 rounded-lg border border-red-200">
                    {recipe}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No bookmarked recipes yet</p>
            )}
          </CardContent>
        </Card>

        <Button
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl"
          size="lg"
        >
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default ProfileScreen;