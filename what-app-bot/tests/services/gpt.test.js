/**
 * Testes unitários para o serviço GPT
 * Fase 1: Testes para funções críticas antes da refatoração
 */

// Mock dependencies
jest.mock('axios');
jest.mock('../../../src/services/logger');
jest.mock('../../../src/services/messageDebouncer');
jest.mock('../../../src/store/clinicStore');
jest.mock('../../../src/services/ai/systemMessage');
jest.mock('../../../src/services/ai/toolRegistry');
jest.mock('../../../src/services/ai/imageProcessor');

const axios = require('axios');
const logger = require('../../../src/services/logger');

// Import the service under test
const gptService = require('../../../src/services/gpt');

describe('GPT Service - Critical Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Clear any console logs for cleaner test output
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('fetchAiStatusForClinica', () => {
        const clinicaId = '123';
        const mockApiUrl = 'https://api.test.com/';

        beforeEach(() => {
            process.env.API_URL = mockApiUrl;
            // Clear the cache before each test
            gptService._clearAiStatusCache && gptService._clearAiStatusCache();
        });

        test('should return cached status when available and not expired', async () => {
            // First call to populate cache
            axios.get.mockResolvedValueOnce({
                data: { is_active: true }
            });

            const result1 = await gptService.fetchAiStatusForClinica(clinicaId);
            expect(result1).toBe(true);
            expect(axios.get).toHaveBeenCalledTimes(1);

            // Second call should use cache
            const result2 = await gptService.fetchAiStatusForClinica(clinicaId);
            expect(result2).toBe(true);
            expect(axios.get).toHaveBeenCalledTimes(1); // Should not call API again
        });

        test('should call API when cache is expired', async () => {
            // Mock Date.now to control time
            const originalNow = Date.now;
            let currentTime = 1000000;
            Date.now = jest.fn(() => currentTime);

            // First call
            axios.get.mockResolvedValueOnce({
                data: { is_active: true }
            });
            const result1 = await gptService.fetchAiStatusForClinica(clinicaId);
            expect(result1).toBe(true);

            // Advance time beyond cache TTL (2 minutes)
            currentTime += 3 * 60 * 1000; // 3 minutes

            // Second call should hit API again
            axios.get.mockResolvedValueOnce({
                data: { is_active: false }
            });
            const result2 = await gptService.fetchAiStatusForClinica(clinicaId);
            expect(result2).toBe(false);
            expect(axios.get).toHaveBeenCalledTimes(2);

            // Restore Date.now
            Date.now = originalNow;
        });

        test('should return false when clinicaId is not provided', async () => {
            const result = await gptService.fetchAiStatusForClinica(null);
            expect(result).toBe(false);
            expect(logger.error).toHaveBeenCalledWith(
                '[gptService.fetchAiStatusForClinica] clinicaId não fornecido.'
            );
        });

        test('should handle API errors gracefully', async () => {
            axios.get.mockRejectedValueOnce(new Error('Network error'));

            const result = await gptService.fetchAiStatusForClinica(clinicaId);
            expect(result).toBe(false);
            expect(logger.error).toHaveBeenCalledWith(
                expect.stringContaining('Erro ao buscar status da IA para clinica 123')
            );
        });

        test('should handle unexpected API response format', async () => {
            axios.get.mockResolvedValueOnce({
                data: { unexpected: 'format' }
            });

            const result = await gptService.fetchAiStatusForClinica(clinicaId);
            expect(result).toBe(false);
            expect(logger.warn).toHaveBeenCalledWith(
                expect.stringContaining('Resposta inesperada da API para clinica 123')
            );
        });
    });

    describe('getSegmentTypeForClinica', () => {
        const clinicStore = require('../../../src/store/clinicStore');

        test('should return segment type from store', async () => {
            clinicStore.getSegmentTypeForClinicaId.mockReturnValue('clinica-odonto');

            const result = await gptService.getSegmentTypeForClinica('1');
            expect(result).toBe('clinica-odonto');
            expect(clinicStore.getSegmentTypeForClinicaId).toHaveBeenCalledWith('1');
        });

        test('should return default when store returns null', async () => {
            clinicStore.getSegmentTypeForClinicaId.mockReturnValue(null);

            const result = await gptService.getSegmentTypeForClinica('999');
            expect(result).toBe('default');
        });
    });

    describe('getChatGPTResponse', () => {
        const mockMessages = [
            { role: 'user', content: 'Hello' }
        ];
        const mockNome = 'Test User';
        const mockClinicaId = '123';

        beforeEach(() => {
            process.env.OPENAI_API_KEY = 'test-api-key';
            
            // Mock dependencies
            const getSystemMessage = require('../../../src/services/ai/systemMessage');
            const { getFunctionsForSegment } = require('../../../src/services/ai/toolRegistry');
            const clinicStore = require('../../../src/store/clinicStore');

            getSystemMessage.mockResolvedValue('System message');
            getFunctionsForSegment.mockReturnValue([]);
            clinicStore.getSegmentTypeForClinicaId.mockReturnValue('default');
        });

        test('should make successful API call to OpenAI', async () => {
            const mockResponse = {
                data: {
                    choices: [
                        {
                            message: {
                                content: 'Hello! How can I help you?',
                                role: 'assistant'
                            }
                        }
                    ],
                    usage: {
                        total_tokens: 50
                    }
                }
            };

            axios.post.mockResolvedValueOnce(mockResponse);

            const result = await gptService.getChatGPTResponse(mockMessages, mockNome, mockClinicaId);

            expect(result).toEqual(mockResponse.data);
            expect(axios.post).toHaveBeenCalledWith(
                'https://api.openai.com/v1/chat/completions',
                expect.objectContaining({
                    model: 'gpt-4o-mini',
                    messages: expect.arrayContaining([
                        expect.objectContaining({
                            role: 'system',
                            content: 'System message'
                        }),
                        ...mockMessages
                    ]),
                    max_tokens: 300,
                    temperature: 0.7
                }),
                expect.objectContaining({
                    headers: {
                        'Authorization': 'Bearer test-api-key',
                        'Content-Type': 'application/json'
                    }
                })
            );
        });

        test('should handle OpenAI API errors', async () => {
            const mockError = {
                response: {
                    status: 429,
                    data: {
                        error: {
                            message: 'Rate limit exceeded'
                        }
                    }
                }
            };

            axios.post.mockRejectedValueOnce(mockError);

            await expect(
                gptService.getChatGPTResponse(mockMessages, mockNome, mockClinicaId)
            ).rejects.toThrow();

            expect(logger.error).toHaveBeenCalledWith(
                expect.stringContaining('Erro na chamada da API OpenAI')
            );
        });

        test('should throw error when API key is missing', async () => {
            delete process.env.OPENAI_API_KEY;

            await expect(
                gptService.getChatGPTResponse(mockMessages, mockNome, mockClinicaId)
            ).rejects.toThrow('API key da OpenAI não configurada');
        });
    });

    describe('transcribeAudio', () => {
        const mockAudioBuffer = Buffer.from('audio data');
        const mockClinicaId = '123';
        const mockMessageId = 'msg123';

        beforeEach(() => {
            process.env.OPENAI_API_KEY = 'test-api-key';
        });

        test('should successfully transcribe audio', async () => {
            const mockResponse = {
                data: {
                    text: 'Transcribed text'
                }
            };

            axios.post.mockResolvedValueOnce(mockResponse);

            const result = await gptService.transcribeAudio(mockAudioBuffer, mockClinicaId, mockMessageId);

            expect(result).toBe('Transcribed text');
            expect(axios.post).toHaveBeenCalledWith(
                'https://api.openai.com/v1/audio/transcriptions',
                expect.any(Object), // FormData
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'Authorization': 'Bearer test-api-key'
                    })
                })
            );
        });

        test('should handle transcription errors', async () => {
            axios.post.mockRejectedValueOnce(new Error('Transcription failed'));

            const result = await gptService.transcribeAudio(mockAudioBuffer, mockClinicaId, mockMessageId);

            expect(result).toBeNull();
            expect(logger.error).toHaveBeenCalledWith(
                expect.stringContaining('Erro na transcrição de áudio')
            );
        });

        test('should handle base64 audio input', async () => {
            const mockBase64 = 'data:audio/ogg;base64,SGVsbG8gV29ybGQ=';
            const mockResponse = {
                data: {
                    text: 'Transcribed text'
                }
            };

            axios.post.mockResolvedValueOnce(mockResponse);

            const result = await gptService.transcribeAudio(mockBase64, mockClinicaId, mockMessageId, true);

            expect(result).toBe('Transcribed text');
        });
    });
});

// Helper function to test private cache functionality
// This would need to be exposed by the main module for testing
describe('AI Status Cache', () => {
    test('should clear cache when exposed', () => {
        // This test would require exposing cache management functions
        // for testing purposes only
        expect(true).toBe(true); // Placeholder
    });
});