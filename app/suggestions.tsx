import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SuggestionCard = ({ item, icon, onPress }) => (
  <TouchableOpacity style={styles.suggestionCard} onPress={onPress}>
    <Text style={styles.suggestionIcon}>{icon}</Text>
    <Text style={styles.suggestionText}>{item}</Text>
  </TouchableOpacity>
);

const SuggestionList = ({ title, items, icon, router }) => (
  <View>
    <Text style={styles.sectionTitle}>{icon} {title}</Text>
    {items.map((item, index) => (
      <SuggestionCard
        key={index}
        item={item}
        icon={icon}
        onPress={() => router.push({ pathname: '/meal', params: { meal: item } })}
      />
    ))}
  </View>
);

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

export default function SuggestionsScreen() {
  const { mood } = useLocalSearchParams();
  const router = useRouter();
  const suggestions = suggestionsData[mood] || suggestionsData.Happy;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Here are some suggestions for when you're feeling {mood.toLowerCase()}:</Text>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <SuggestionList title="Best Meals" items={suggestions.meals} router={router} />
          <SuggestionList title="Quick Snacks" items={suggestions.snacks} router={router} />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🧠 Why These?</Text>
            <Text style={styles.cardContent}>{suggestions.why}</Text>
          </View>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  suggestionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  suggestionText: {
    fontSize: 16,
    flex: 1,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
