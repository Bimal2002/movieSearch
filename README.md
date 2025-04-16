# 🎬 MovieSearchApp

A clean and simple React Native app that allows users to search for movies using the OMDb API, view detailed information, and save favorites. Built with the React Native CLI.

---

## 🚀 Features

- 🔍 Search movies by title (live query)
- 🖼 Display list of matching movies with title and poster
- 📄 Tap a movie to view full details (year, genre, plot, rating)
- ⭐ Mark/unmark movies as favorites using AsyncStorage
- 🔁 Infinite scroll to load more results as user scrolls
- 📦 .env support for secure API key storage

---

## 📦 Tech Stack

- **React Native CLI**
- **OMDb API** – [https://www.omdbapi.com/](https://www.omdbapi.com/)
- **AsyncStorage** for storing favorite movies locally
- **React Navigation** for screen transitions
- **dotenv** for API key management

---

## 🛠️ Getting Started

### 1. 🔧 Prerequisites

Make sure you have the following installed:

- Node.js ≥ 16.x
- npm or yarn
- Android Studio / Xcode (for emulator or physical device testing)
- React Native CLI

### 2. 📁 Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/movie-search-app.git
cd movie-search-app
     -----   

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

---
🔑 Set Up Environment Variables
Get a free OMDb API key from here: https://www.omdbapi.com/apikey.aspx

Create a .env file in the root folder of your project:
```sh
OMDB_API_KEY=your_api_key_here

--- 
Ensure you have the react-native-dotenv plugin configured in your babel.config.js

```sh
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
  ],
};


---
Run the App
Android (emulator or device)

```sh
npx react-native run-androi



---
 Common Issues
App not running?
Reset Metro bundler cache:

```sh
npx react-native start --reset-cache
#   m o v i e S e a r c h  
 