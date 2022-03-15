module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "./tests/.*\\.(test|spec)?\\.(js|ts)$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>/tests"],
};
