import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@movie_app_favorites';

export const getFavoriteMovies = async () => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson != null ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorite movies:', error);
    return [];
  }
};

export const addFavoriteMovie = async (movie) => {
  try {
    const favorites = await getFavoriteMovies();
    
    // Check if movie already exists in favorites
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      const updatedFavorites = [...favorites, movie];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding favorite movie:', error);
    return false;
  }
};

export const removeFavoriteMovie = async (imdbID) => {
  try {
    const favorites = await getFavoriteMovies();
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error removing favorite movie:', error);
    return false;
  }
};

export const isMovieFavorite = async (imdbID) => {
  try {
    const favorites = await getFavoriteMovies();
    return favorites.some(movie => movie.imdbID === imdbID);
  } catch (error) {
    console.error('Error checking if movie is favorite:', error);
    return false;
  }
};