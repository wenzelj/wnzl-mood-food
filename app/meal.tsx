import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { recipes } from './data';
import { Ionicons } from '@expo/vector-icons';

const RecipeCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
    <Text style={styles.recipeText}>{item.strMeal}</Text>
  </TouchableOpacity>
);

export default function MealScreen() {
  const { meal } = useLocalSearchParams();
  const router = useRouter();
  const recipeList = recipes[meal] || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Recipes for {meal}</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {recipeList.map((recipe, index) => (
            <RecipeCard
              key={index}
              item={recipe}
              onPress={() => router.push({ pathname: '/recipe', params: { recipeId: recipe.idMeal } })}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeText: {
    fontSize: 16,
  },
});
