# 🎬 MovieSearchApp

A clean and simple React Native application that allows users to search for movies using the OMDb API, view detailed information, and save favorites. Built with the React Native CLI.

<p align="center">
  <img src="/api/placeholder/300/150" alt="MovieSearchApp Screenshot" />
</p>

## 🚀 Features

- 🔍 Search movies by title with live querying
- 🖼️ Display list of matching movies with title and poster
- 📄 View full movie details (year, genre, plot, rating)
- ⭐ Mark/unmark movies as favorites with persistent storage
- 🔁 Infinite scroll to load more search results
- 📱 Cross-platform (iOS & Android) support
- 📦 Secure API key storage with environment variables

## 📦 Tech Stack

- **React Native CLI** - Core framework
- **[OMDb API](https://www.omdbapi.com/)** - Movie database API
- **React Navigation** - Screen navigation and transitions
- **AsyncStorage** - Local storage for favorites
- **react-native-dotenv** - Environment variable management

## 🛠️ Installation & Setup

### Prerequisites

- Node.js ≥ 16.x
- npm or yarn
- Android Studio / Xcode (for emulator or physical device testing)
- React Native CLI

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/movie-search-app.git
cd movie-search-app
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

### Step 3: Set Up Environment Variables

1. Get a free OMDb API key from [here](https://www.omdbapi.com/apikey.aspx)
2. Create a `.env` file in the root folder of your project:

```
OMDB_API_KEY=your_api_key_here
```

3. Ensure you have the react-native-dotenv plugin configured in your babel.config.js:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
  ],
};
```

## 🚀 Running the App

### Step 1: Start Metro

First, start the Metro JavaScript bundler:

```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Build and Run

#### For Android:

```bash
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### For iOS:

Install CocoaPods dependencies first (required on initial setup or after updating native dependencies):

```bash
# Install CocoaPods if needed
bundle install

# Install pod dependencies
bundle exec pod install
```

Then run the iOS app:

```bash
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

## 🧰 Development

### Project Structure

```
movie-search-app/
├── android/                # Android native code
├── ios/                    # iOS native code
├── src/
│   ├── components/         # Reusable components
│   ├── screens/            # App screens
│   ├── navigation/         # Navigation configuration
│   ├── services/           # API and other services
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Helper functions
├── .env                    # Environment variables (git-ignored)
└── App.js                  # App entry point
```

## 🐛 Troubleshooting

### Common Issues

- **App not running**: Reset Metro bundler cache:
  ```bash
  npx react-native start --reset-cache
  ```

- **Build failures**: Ensure all dependencies are installed:
  ```bash
  npm install
  cd ios && bundle exec pod install && cd ..
  ```

- **API key issues**: Verify your `.env` file is properly set up and the API key is valid

## 📄 License

[MIT](LICENSE)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
