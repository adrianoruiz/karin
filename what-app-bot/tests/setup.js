/**
 * Jest setup file for GPT Service tests
 */

// Global test setup
global.console = {
    ...console,
    // Suppress logs during tests unless explicitly needed
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
};

// Mock environment variables
process.env.NODE_ENV = 'test';
process.env.OPENAI_API_KEY = 'test-openai-key';
process.env.API_URL = 'https://test-api.com/';

// Global mocks for common dependencies
jest.mock('dotenv', () => ({
    config: jest.fn()
}));

// Cleanup after each test
afterEach(() => {
    jest.clearAllTimers();
});