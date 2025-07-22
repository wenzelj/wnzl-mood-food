import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const moods = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Sad', emoji: '😢' },
  { name: 'Angry', emoji: '😠' },
  { name: 'Anxious', emoji: '😟' },
  { name: 'Tired', emoji: '😴' },
  { name: 'Bored', emoji: '😑' },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleMoodSelect = (mood) => {
    router.push({ pathname: '/suggestions', params: { mood: mood.name } });
  };

  const renderMood = ({ item }) => (
    <TouchableOpacity style={styles.moodContainer} onPress={() => handleMoodSelect(item)}>
      <Text style={styles.moodEmojiText}>{item.emoji}</Text>
      <Text style={styles.moodText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <FlatList
        data={moods}
        renderItem={renderMood}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.moodList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  moodList: {
    alignItems: 'center',
  },
  moodContainer: {
    alignItems: 'center',
    margin: 15,
  },
  moodEmoji: {
    width: 100,
    height: 100,
  },
  moodEmojiText: {
    fontSize: 80,
  },
  moodText: {
    marginTop: 10,
    fontSize: 18,
  },
});
