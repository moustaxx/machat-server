module.exports = {
    preset: 'ts-jest',
    testEnvironment: './src/tests/PrismaTestEnvironment.js',
    coveragePathIgnorePatterns : ['/node_modules/', '/src/tests/'],
};
