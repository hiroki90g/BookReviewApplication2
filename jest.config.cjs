module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/tests/'     // Playwright 用フォルダ (tests/) を無視
  ],
  };
  