import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recipes } from './data';

export default function RecipeScreen() {
  const { recipeId } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = JSON.parse(await AsyncStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(recipeId));
    };
    checkFavorite();
  }, [recipeId]);

  const toggleFavorite = async () => {
    const favorites = JSON.parse(await AsyncStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter((id) => id !== recipeId);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      const newFavorites = [...favorites, recipeId];
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(true);
    }
  };

  const findRecipeById = (id) => {
    for (const meal in recipes) {
      const recipe = recipes[meal].find(r => r.idMeal === id);
      if (recipe) {
        return recipe;
      }
    }
    return null;
  };

  const recipe = findRecipeById(recipeId);

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text>No recipe found for ID {recipeId}.</Text>
      </View>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(`${recipe[`strMeasure${i}`]} ${recipe[`strIngredient${i}`]}`);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{recipe.strMeal}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Text style={styles.favoriteButton}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>- {ingredient}</Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  favoriteButton: {
    fontSize: 30,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
  },
});
