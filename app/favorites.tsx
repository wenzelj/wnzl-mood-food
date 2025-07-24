import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recipes } from './data';

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  const findRecipeById = (id) => {
    for (const meal in recipes) {
      const recipe = recipes[meal].find(r => r.idMeal === id);
      if (recipe) {
        return recipe;
      }
    }
    return null;
  };

  useEffect(() => {
    const getFavorites = async () => {
      const favoriteIds = JSON.parse(await AsyncStorage.getItem('favorites') || '[]');
      const favoriteRecipes = favoriteIds.map(id => findRecipeById(id)).filter(Boolean);
      setFavorites(favoriteRecipes);
    };
    getFavorites();
  }, []);

  const handleRecipeSelect = (recipe) => {
    router.push({ pathname: '/recipe', params: { recipeId: recipe.idMeal } });
  };

  const renderRecipe = ({ item }) => (
    <TouchableOpacity style={styles.recipeContainer} onPress={() => handleRecipeSelect(item)}>
      <Text style={styles.recipeText}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Recipes</Text>
      <FlatList
        data={favorites}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.idMeal}
        ListEmptyComponent={<Text>You have no favorite recipes yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipeContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recipeText: {
    fontSize: 18,
  },
});
