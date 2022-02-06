module.exports = {
    testEnvironment: 'node',
    testRegex: './src/.*\\.(test|spec)?\\.(js|js)$',
    moduleFileExtensions: ['js', 'json', 'node'],
    roots: ['<rootDir>/src']
};

// Sync object
// /** @type {import('@jest/types').Config.InitialOptions} */
// const config = {
//     verbose: true,
//   };
  
//   module.exports = config;
  
//   // Or async function
//   module.exports = async () => {
//     return {
//       verbose: true,
//     };
//   };