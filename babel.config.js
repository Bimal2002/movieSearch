module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
  ],
};


// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     ['module:react-native-dotenv', {
//       moduleName: '@env',
//       path: '.env',
//     }],
//   ],
// };
