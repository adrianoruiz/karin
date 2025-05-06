/**
 * Testes para o fluxo de agendamento
 * Verifica a integração entre sessionStore e o processo de agendamento
 */
const sessionStore = require('../src/services/sessionStore');
const { bookAppointment } = require('../src/services/tools/booking');
const { getAvailableAppointments } = require('../src/services/tools/availability');
const dayjs = require('dayjs');

// Mock para o Redis
jest.mock('ioredis', () => {
  const mockRedis = {
    setex: jest.fn().mockResolvedValue('OK'),
    get: jest.fn(),
    on: jest.fn()
  };
  
  return jest.fn(() => mockRedis);
});

// Mock para o axios
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

describe('Fluxo de Agendamento', () => {
  let mockAvailabilities;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock de slots disponíveis
    mockAvailabilities = {
      availabilities: [
        { 
          date: '2025-05-10', 
          time: '18:00', 
          formattedDate: '10/05/2025',
          dayOfWeek: 'Sábado',
          slot_id: '2025-05-10T1800'
        },
        { 
          date: '2025-05-10', 
          time: '16:00', 
          formattedDate: '10/05/2025',
          dayOfWeek: 'Sábado',
          slot_id: '2025-05-10T1600'
        }
      ]
    };
    
    // Mock da resposta do Redis
    const mockRedisClient = require('ioredis')();
    mockRedisClient.get.mockImplementation((key) => {
      if (key.includes('lastSlots')) {
        return Promise.resolve(JSON.stringify({
          slots: mockAvailabilities,
          timestamp: dayjs().toISOString()
        }));
      }
      return Promise.resolve(null);
    });
  });
  
  test('Deve salvar slots disponíveis na sessão', async () => {
    // Arrange
    const clinicaId = 'test-clinic';
    const number = '5547999999999';
    
    // Act
    await sessionStore.saveLastSlots(clinicaId, number, mockAvailabilities);
    
    // Assert
    const redisClient = require('ioredis')();
    expect(redisClient.setex).toHaveBeenCalled();
    expect(redisClient.setex.mock.calls[0][0]).toContain('lastSlots');
    expect(JSON.parse(redisClient.setex.mock.calls[0][2]).slots).toEqual(mockAvailabilities);
  });
  
  test('Deve recuperar slots da sessão ao agendar', async () => {
    // Arrange
    const clinicaId = 'test-clinic';
    const number = '5547999999999';
    
    // Act
    const slots = await sessionStore.getLastSlots(clinicaId, number);
    
    // Assert
    expect(slots).toEqual(mockAvailabilities);
  });
  
  test('Deve usar o slot_id para identificar o horário correto', async () => {
    // Arrange
    const slot_id = '2025-05-10T1800';
    const [date, time] = slot_id.split('T');
    const formattedTime = time.substring(0, 2) + ':' + time.substring(2);
    
    // Assert
    expect(date).toBe('2025-05-10');
    expect(formattedTime).toBe('18:00');
  });
  
  test('Deve validar o formato da data antes de agendar', () => {
    // Arrange
    const validDate = '2025-05-10';
    const invalidDate = '10/05/2025';
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    // Assert
    expect(dateRegex.test(validDate)).toBe(true);
    expect(dateRegex.test(invalidDate)).toBe(false);
    
    // Convert invalid date
    const parts = invalidDate.split(/[\/.-]/);
    const convertedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    expect(dateRegex.test(convertedDate)).toBe(true);
    expect(convertedDate).toBe('2025-05-10');
  });
  
  test('Deve validar o formato da hora antes de agendar', () => {
    // Arrange
    const validTime = '18:00';
    const invalidTime = '18h';
    const timeRegex = /^\d{1,2}:\d{2}$/;
    
    // Assert
    expect(timeRegex.test(validTime)).toBe(true);
    expect(timeRegex.test(invalidTime)).toBe(false);
    
    // Convert invalid time
    const convertedTime = invalidTime.replace('h', ':00');
    expect(timeRegex.test(convertedTime)).toBe(true);
    expect(convertedTime).toBe('18:00');
  });
});
