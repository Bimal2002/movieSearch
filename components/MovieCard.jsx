import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MovieCard = ({ movie, onPress }) => {
  // Use a placeholder image if poster is not available or is "N/A"
  const posterUri = movie.Poster && movie.Poster !== 'N/A' 
    ? { uri: movie.Poster } 
    : require('./122.jpg');

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(movie)}>
      <Image 
        source={posterUri} 
        style={styles.poster} 
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
        <Text style={styles.type}>{movie.Type}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  poster: {
    width: 80,
    height: 120,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  type: {
    fontSize: 12,
    color: '#888',
    textTransform: 'capitalize',
  },
});

export default MovieCard;