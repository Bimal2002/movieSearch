// // Replace with your actual OMDb API key
// const API_KEY = '593039d1';
// const BASE_URL = 'https://www.omdbapi.com/';

// export const searchMovies = async (query, page = 1) => {
//   try {
//     const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`);
//     const data = await response.json();
    
//     if (data.Response === 'True') {
//       return {
//         movies: data.Search,
//         totalResults: parseInt(data.totalResults, 10),
//         success: true
//       };
//     } else {
//       return {
//         movies: [],
//         totalResults: 0,
//         success: false,
//         error: data.Error
//       };
//     }
//   } catch (error) {
//     console.error('Error searching movies:', error);
//     return {
//       movies: [],
//       totalResults: 0,
//       success: false,
//       error: 'Failed to fetch movies'
//     };
//   }
// };

// export const getMovieDetails = async (imdbId) => {
//   try {
//     const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbId}&plot=full`);
//     const data = await response.json();
    
//     if (data.Response === 'True') {
//       return {
//         movie: data,
//         success: true
//       };
//     } else {
//       return {
//         movie: null,
//         success: false,
//         error: data.Error
//       };
//     }
//   } catch (error) {
//     console.error('Error fetching movie details:', error);
//     return {
//       movie: null,
//       success: false,
//       error: 'Failed to fetch movie details'
//     };
//   }
// };



import { OMDB_API_KEY } from '@env';

const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      return {
        movies: data.Search,
        totalResults: parseInt(data.totalResults, 10),
        success: true,
      };
    } else {
      return {
        movies: [],
        totalResults: 0,
        success: false,
        error: data.Error,
      };
    }
  } catch (error) {
    console.error('Error searching movies:', error);
    return {
      movies: [],
      totalResults: 0,
      success: false,
      error: 'Failed to fetch movies',
    };
  }
};

export const getMovieDetails = async (imdbId) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      return {
        movie: data,
        success: true,
      };
    } else {
      return {
        movie: null,
        success: false,
        error: data.Error,
      };
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return {
      movie: null,
      success: false,
      error: 'Failed to fetch movie details',
    };
  }
};
