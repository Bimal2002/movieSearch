import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { getFavoriteMovies } from '../utils/storage';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showingFavorites, setShowingFavorites] = useState(false);

  // Load favorites when component mounts
  useEffect(() => {
    loadFavorites();
    
    // Also refresh favorites when the screen receives focus (for updates from details screen)
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    const favs = await getFavoriteMovies();
    setFavorites(favs);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    
    setLoading(true);
    setMovies([]);
    setCurrentPage(1);
    setShowingFavorites(false);
    setError('');

    try {
      const result = await searchMovies(searchQuery);
      
      if (result.success) {
        setMovies(result.movies);
        setTotalResults(result.totalResults);
      } else {
        setError(result.error || 'No movies found');
      }
    } catch (err) {
      setError('Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreMovies = async () => {
    if (loading || movies.length >= totalResults) return;

    const nextPage = currentPage + 1;
    setLoading(true);

    try {
      const result = await searchMovies(searchQuery, nextPage);
      
      if (result.success) {
        setMovies([...movies, ...result.movies]);
        setCurrentPage(nextPage);
      }
    } catch (err) {
      setError('Failed to load more movies');
    } finally {
      setLoading(false);
    }
  };

  const showFavorites = () => {
    setShowingFavorites(true);
    setMovies([]);
    setSearchQuery('');
    setMovies(favorites);
  };

  const navigateToDetails = (movie) => {
    navigation.navigate('Details', { imdbID: movie.imdbID });
  };

  const renderFooter = () => {
    if (!loading || showingFavorites) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0000ff" />
        <Text style={styles.loadingText}>Loading more movies...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Movie Search</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, !showingFavorites && styles.activeTab]} 
          onPress={() => setShowingFavorites(false)}
        >
          <Text style={[styles.tabText, !showingFavorites && styles.activeTabText]}>
            Search Results
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, showingFavorites && styles.activeTab]} 
          onPress={showFavorites}
        >
          <Text style={[styles.tabText, showingFavorites && styles.activeTabText]}>
            Favorites ({favorites.length})
          </Text>
        </TouchableOpacity>
      </View>

      {loading && movies.length === 0 ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : movies.length === 0 && !showingFavorites ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.placeholderText}>
            Search for movies to see results
          </Text>
        </View>
      ) : movies.length === 0 && showingFavorites ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.placeholderText}>
            You haven't added any favorites yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <MovieCard movie={item} onPress={navigateToDetails} />
          )}
          keyExtractor={(item) => item.imdbID}
          contentContainerStyle={styles.listContainer}
          onEndReached={!showingFavorites ? loadMoreMovies : null}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingVertical: 8,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;