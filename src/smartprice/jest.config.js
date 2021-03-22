module.exports = {
  clearMocks: true,
  setupFiles: [
    "./__mocks__/clientMock.js"
  ],
  setupFilesAfterEnv: ['regenerator-runtime/runtime'],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  moduleNameMapper: {
    '\\.(css|less)$': './__mocks__/styleMock.js',
  },
};