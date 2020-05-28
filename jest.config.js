module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,vue}',
    '<rootDir>/server/**/*.{js,vue}',
    '!<rootDir>/src/**/__tests__/**/*',
    '!<rootDir>/server/**/__tests__/**/*',
  ],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '<rootDir>/(**/__tests__/*.js)',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
