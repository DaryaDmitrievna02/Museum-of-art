export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/src/__mocks__/fileMock.js",
    "\\.(svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },

  collectCoverageFrom: ["src/**/*.tsx", "!**/node_modules/**"],
};
