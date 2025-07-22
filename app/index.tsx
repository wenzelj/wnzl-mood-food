import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const moods = [
  { name: 'Happy', emoji: require('../assets/images/emoji1.png') },
  { name: 'Sad', emoji: require('../assets/images/emoji2.png') },
  { name: 'Angry', emoji: require('../assets/images/emoji3.png') },
  { name: 'Anxious', emoji: require('../assets/images/emoji4.png') },
  { name: 'Tired', emoji: require('../assets/images/emoji5.png') },
  { name: 'Bored', emoji: require('../assets/images/emoji6.png') },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleMoodSelect = (mood) => {
    router.push({ pathname: '/suggestions', params: { mood: mood.name } });
  };

  const renderMood = ({ item }) => (
    <TouchableOpacity style={styles.moodContainer} onPress={() => handleMoodSelect(item)}>
      <Image source={item.emoji} style={styles.moodEmoji} />
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
  moodText: {
    marginTop: 10,
    fontSize: 18,
  },
});
