import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { recipes } from './data';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 2) {
      const allRecipes = Object.values(recipes).flat();
      const filteredRecipes = allRecipes.filter(recipe => {
        const searchText = text.toLowerCase();
        if (recipe.strMeal.toLowerCase().includes(searchText)) {
          return true;
        }
        for (let i = 1; i <= 20; i++) {
          const ingredient = recipe[`strIngredient${i}`];
          if (ingredient && ingredient.toLowerCase().includes(searchText)) {
            return true;
          }
        }
        return false;
      });
      setResults(filteredRecipes);
    } else {
      setResults([]);
    }
  };

  const handleSelectRecipe = (recipeId) => {
    router.push({ pathname: '/recipe', params: { recipeId } });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectRecipe(item.idMeal)}>
      <Text style={styles.itemText}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a recipe..."
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.idMeal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 18,
  },
});
