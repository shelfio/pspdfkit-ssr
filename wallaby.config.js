module.exports = () => {
  return {
    testFramework: 'jest',
    files: ['package.json', 'src/**/*.ts', '!src/**/*.test.ts'],
    tests: ['src/**/*.test.ts'],
    env: {
      type: 'node',
      runner: 'node'
    },
    setup(wallaby) {
      wallaby.testFramework.configure(require('./package.json').jest);
    }
  };
};
