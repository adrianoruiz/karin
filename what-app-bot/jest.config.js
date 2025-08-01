/**
 * Jest configuration for GPT Service refactoring
 */

module.exports = {
    // Test environment
    testEnvironment: 'node',
    
    // Test patterns
    testMatch: [
        '**/tests/**/*.test.js',
        '**/__tests__/**/*.test.js'
    ],
    
    // Coverage configuration
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    
    // Coverage thresholds
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    
    // Setup files
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    
    // Module paths
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    
    // Clear mocks between tests
    clearMocks: true,
    
    // Verbose output
    verbose: true,
    
    // Timeout for tests
    testTimeout: 10000
};