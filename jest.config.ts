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

    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
  },

  collectCoverageFrom: ["src/**/*.tsx", "!**/node_modules/**"],
};

