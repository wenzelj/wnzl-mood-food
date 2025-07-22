import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const suggestionsData = {
  Happy: {
    meals: ['Pizza', 'Ice Cream', 'Sushi', 'Pasta', 'Tacos'],
    snacks: ['Fruit Salad', 'Chocolate', 'Popcorn', 'Yogurt'],
    why: 'These foods can help maintain your good mood!',
  },
  Sad: {
    meals: ['Oatmeal with banana', 'Grilled salmon with greens', 'Chicken soup', 'Mac and Cheese', 'Lentil Soup'],
    snacks: ['Dark chocolate + almonds', 'Yogurt with honey', 'Berries', 'Walnuts'],
    why: 'These foods are high in magnesium and B-vitamins, which can help boost your mood.',
  },
  Angry: {
    meals: ['Chamomile tea', 'Green tea', 'Almonds', 'Turkey Sandwich', 'Brown Rice'],
    snacks: ['A handful of nuts', 'A banana', 'Oatmeal', 'Avocado'],
    why: 'These can help you calm down and relax.',
  },
  Anxious: {
    meals: ['Salmon + greens', 'Quinoa salad', 'Banana smoothie', 'Turmeric Latte', 'Beef'],
    snacks: ['Dark chocolate square', 'Greek yogurt', 'Blueberries', 'Cashews'],
    why: 'Omega-3s can reduce anxiety. These foods are rich in them.',
  },
  Tired: {
    meals: ['Eggs', 'Oranges', 'Spinach Salad', 'Chicken Breast', 'Sweet Potatoes'],
    snacks: ['Trail mix', 'Apple with peanut butter', 'Hard-boiled egg', 'Almonds'],
    why: 'These foods provide a natural energy boost.',
  },
  Bored: {
    meals: ['Try a new recipe!', 'Spicy Thai Green Curry', 'Homemade Pizza', 'Sushi making', 'Baking bread'],
    snacks: ['Popcorn', 'Edamame', 'Kale chips', 'Roasted chickpeas'],
    why: 'Trying something new and exciting can help with boredom.',
  },
};

const InfoCard = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.cardTitle}>{title}</Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.cardContent}>{content}</Text>}
    </View>
  );
};

export default function SuggestionsScreen() {
  const { mood } = useLocalSearchParams();
  const router = useRouter();
  const suggestions = suggestionsData[mood] || suggestionsData.Happy;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>You said: "{mood}"</Text>

      <Text style={styles.sectionTitle}>🥘 Best Meals:</Text>
      {suggestions.meals.map((meal, index) => (
        <TouchableOpacity key={index} onPress={() => router.push({ pathname: '/recipe', params: { meal } })}>
          <Text style={styles.suggestionText}>- {meal}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>🥄 Quick Snacks:</Text>
      {suggestions.snacks.map((snack, index) => (
        <TouchableOpacity key={index} onPress={() => router.push({ pathname: '/recipe', params: { meal: snack } })}>
          <Text style={styles.suggestionText}>- {snack}</Text>
        </TouchableOpacity>
      ))}

      <InfoCard title="🧠 Why These?" content={suggestions.why} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    marginTop: 10,
    fontSize: 16,
  },
});
