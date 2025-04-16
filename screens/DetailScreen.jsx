import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { getMovieDetails } from '../services/api';
import {
  addFavoriteMovie,
  removeFavoriteMovie,
  isMovieFavorite,
} from '../utils/storage';

const DetailsScreen = ({ route, navigation }) => {
  const { imdbID } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchMovieDetails();
    checkIfFavorite();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const result = await getMovieDetails(imdbID);
      
      if (result.success) {
        setMovie(result.movie);
      } else {
        setError(result.error || 'Failed to fetch movie details');
      }
    } catch (err) {
      setError('An error occurred while fetching movie details');
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    const favorite = await isMovieFavorite(imdbID);
    setIsFavorite(favorite);
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      const removed = await removeFavoriteMovie(imdbID);
      if (removed) {
        setIsFavorite(false);
        Alert.alert('Success', 'Movie removed from favorites');
      }
    } else {
      const added = await addFavoriteMovie(movie);
      if (added) {
        setIsFavorite(true);
        Alert.alert('Success', 'Movie added to favorites');
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Use a placeholder image if poster is not available or is "N/A"
  const posterUri = movie?.Poster && movie.Poster !== 'N/A' 
    ? { uri: movie.Poster } 
    : { uri: 'https://via.placeholder.com/300x450?text=No+Image' };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.posterContainer}>
          <Image source={posterUri} style={styles.poster} resizeMode="contain" />
        </View>
        
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{movie?.Title}</Text>
          <View style={styles.subHeader}>
            <Text style={styles.year}>{movie?.Year}</Text>
            <Text style={styles.runtime}>{movie?.Runtime}</Text>
            <Text style={styles.rated}>{movie?.Rated}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]} 
            onPress={toggleFavorite}
          >
            <Text style={[styles.favoriteButtonText, isFavorite && styles.favoriteButtonTextActive]}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.genre}>{movie?.Genre}</Text>
          
          <View style={styles.ratingsContainer}>
            {movie?.Ratings?.map((rating, index) => (
              <View key={index} style={styles.ratingItem}>
                <Text style={styles.ratingSource}>{rating.Source}</Text>
                <Text style={styles.ratingValue}>{rating.Value}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plot</Text>
            <Text style={styles.plot}>{movie?.Plot}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cast & Crew</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Director:</Text>
              <Text style={styles.infoValue}>{movie?.Director}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Writer:</Text>
              <Text style={styles.infoValue}>{movie?.Writer}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Actors:</Text>
              <Text style={styles.infoValue}>{movie?.Actors}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Info</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Released:</Text>
              <Text style={styles.infoValue}>{movie?.Released}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Language:</Text>
              <Text style={styles.infoValue}>{movie?.Language}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Country:</Text>
              <Text style={styles.infoValue}>{movie?.Country}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Box Office:</Text>
              <Text style={styles.infoValue}>{movie?.BoxOffice || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back to Search</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  posterContainer: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  year: {
    fontSize: 16,
    color: '#666',
    marginRight: 12,
  },
  runtime: {
    fontSize: 16,
    color: '#666',
    marginRight: 12,
  },
  rated: {
    fontSize: 16,
    color: '#666',
    padding: 2,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
  },
  favoriteButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  favoriteButtonActive: {
    backgroundColor: '#ffcccb',
  },
  favoriteButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
  favoriteButtonTextActive: {
    color: '#d32f2f',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  genre: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  ratingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  ratingItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
    marginBottom: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  ratingSource: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  plot: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2196F3',
    padding: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DetailsScreen;