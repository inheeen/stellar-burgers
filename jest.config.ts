import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  setupFiles: ['<rootDir>/jest.setup.ts'],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],

  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@ui-pages(.*)$': '<rootDir>/src/components/ui/pages$1',
    '^@utils-types$': '<rootDir>/src/utils/types.ts',
    '\\.(css|scss)$': 'jest-css-modules-transform',
    '\\.(png|jpg|jpeg|svg)$': '<rootDir>/src/utils/test-image-stub.ts'
  },

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },

  testPathIgnorePatterns: ['\\\\node_modules\\\\']
};

export default config;
