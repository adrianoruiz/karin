/**
 * Ferramentas relacionadas aos métodos de pagamento
 */
const axios = require('axios');
const config = require('../../../config');

/**
 * Definição da função de métodos de pagamento para o GPT
 */
const paymentMethodsFunction = {
    name: "getPaymentMethods",
    description: "Consulta os métodos de pagamento disponíveis para o médico na API",
    parameters: {
        type: "object",
        properties: {
            doctor_id: {
                type: "number",
                description: "ID do médico (padrão: 2 para Dra. Karin)"
            }
        },
        required: []
    }
};

/**
 * Métodos de pagamento padrão para usar quando a API não estiver disponível
 */
const defaultPaymentMethods = [
    {
        id: 1,
        name: "Cartão de Crédito",
        slug: "cartao_credito",
        icon: "credit_card",
        description: "Pagamento com cartão de crédito em até 12x"
    },
    {
        id: 2,
        name: "Cartão de Débito",
        slug: "cartao_debito",
        icon: "credit_card",
        description: "Pagamento à vista com cartão de débito"
    },
    {
        id: 3,
        name: "PIX",
        slug: "pix",
        icon: "qr_code",
        description: "Pagamento instantâneo via PIX"
    }
];

/**
 * Consulta os métodos de pagamento disponíveis na API
 * @param {number} doctorId - ID do médico (padrão: 2 para Dra. Karin)
 * @returns {Promise<Array>} - Lista de métodos de pagamento disponíveis
 */
async function getPaymentMethods(doctorId = 2) {
    try {
        console.log(`[DEBUG] Consultando métodos de pagamento para o médico ID: ${doctorId}`);
        
        // Consulta a API de métodos de pagamento
        const response = await axios.get(`${config.apiUrl}patient/payment-methods/${doctorId}`);
        
        if (!response.data || !response.data.payment_methods) {
            console.log(`[DEBUG] Nenhum método de pagamento encontrado ou resposta inválida. Usando valores padrão.`);
            return defaultPaymentMethods;
        }
        
        console.log(`[DEBUG] Métodos de pagamento encontrados:`, JSON.stringify(response.data.payment_methods, null, 2));
        
        // Retorna os métodos de pagamento
        return response.data.payment_methods;
    } catch (error) {
        console.error('Erro ao consultar métodos de pagamento:', error);
        console.log('[DEBUG] Usando métodos de pagamento padrão devido a erro na API');
        // Em caso de erro, retorna os métodos de pagamento padrão
        return defaultPaymentMethods;
    }
}

/**
 * Normaliza um texto para comparação (remove acentos, espaços extras, converte para minúsculas)
 * @param {string} text - Texto a ser normalizado
 * @returns {string} - Texto normalizado
 */
function normalizeText(text) {
    if (!text) return '';
    
    return text.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/\s+/g, "") // Remove espaços extras
        .trim();
}

/**
 * Calcula a distância de Levenshtein entre duas strings
 * Útil para identificar erros de digitação
 * @param {string} a - Primeira string
 * @param {string} b - Segunda string
 * @returns {number} - Distância entre as strings (menor = mais similar)
 */
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Inicializa a matriz
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Preenche a matriz
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substituição
                    matrix[i][j - 1] + 1,     // inserção
                    matrix[i - 1][j] + 1      // remoção
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

/**
 * Mapeamento direto de termos comuns para IDs de métodos de pagamento
 */
const paymentMethodsMapping = {
    // Cartão de Crédito (ID: 1)
    'credito': 1,
    'crédito': 1,
    'cartaocredito': 1,
    'cartãocrédito': 1,
    'cartaodecredito': 1,
    'cartãodecrédito': 1,
    'cartão de crédito': 1,
    'cartao de credito': 1,
    'cc': 1,
    'credit': 1,
    'creditcard': 1,
    'crdito': 1,
    'credto': 1,
    'cartaocredto': 1,
    'cartaocrdito': 1,
    
    // Cartão de Débito (ID: 2)
    'debito': 2,
    'débito': 2,
    'cartaodebito': 2,
    'cartãodébito': 2,
    'cartaodedebito': 2,
    'cartãodedébito': 2,
    'cartão de débito': 2,
    'cartao de debito': 2,
    'cd': 2,
    'debit': 2,
    'debitcard': 2,
    'dbito': 2,
    'debto': 2,
    'cartaodebto': 2,
    'cartaodbito': 2,
    
    // PIX (ID: 3)
    'pix': 3,
    'pix bancário': 3,
    'pixbancario': 3,
    'pix bancario': 3,
    'transferencia': 3,
    'transferência': 3,
    'pis': 3,
    'pxi': 3,
    'pxs': 3,
    'piz': 3,
    'px': 3
};

/**
 * Obtém o ID do método de pagamento pelo nome
 * @param {string} paymentMethodName - Nome do método de pagamento
 * @param {number} doctorId - ID do médico (padrão: 2 para Dra. Karin)
 * @returns {Promise<number|null>} - ID do método de pagamento ou null se não encontrado
 */
async function getPaymentMethodIdByName(paymentMethodName, doctorId = 2) {
    try {
        if (!paymentMethodName) {
            console.log(`[DEBUG] Nome do método de pagamento não fornecido`);
            return null;
        }
        
        // Normaliza o nome do método de pagamento
        const normalizedName = normalizeText(paymentMethodName);
        
        // Verifica primeiro no mapeamento direto (mais rápido)
        if (paymentMethodsMapping[normalizedName]) {
            console.log(`[DEBUG] Método de pagamento encontrado via mapeamento direto: ${normalizedName} (ID: ${paymentMethodsMapping[normalizedName]})`);
            return paymentMethodsMapping[normalizedName];
        }
        
        // Verifica se alguma chave do mapeamento está contida no nome normalizado
        for (const [key, id] of Object.entries(paymentMethodsMapping)) {
            if (normalizedName.includes(key) || key.includes(normalizedName)) {
                console.log(`[DEBUG] Método de pagamento encontrado via correspondência parcial: ${normalizedName} contém ou está contido em ${key} (ID: ${id})`);
                return id;
            }
        }
        
        // Verifica erros de digitação usando distância de Levenshtein
        const maxDistance = 2; // Distância máxima aceitável para considerar similar
        let bestMatch = null;
        let bestDistance = Infinity;
        
        for (const [key, id] of Object.entries(paymentMethodsMapping)) {
            const distance = levenshteinDistance(normalizedName, key);
            
            if (distance <= maxDistance && distance < bestDistance) {
                bestDistance = distance;
                bestMatch = { key, id };
            }
        }
        
        if (bestMatch) {
            console.log(`[DEBUG] Método de pagamento encontrado via correção de digitação: ${normalizedName} é similar a ${bestMatch.key} (distância: ${bestDistance}, ID: ${bestMatch.id})`);
            return bestMatch.id;
        }
        
        // Se não encontrou no mapeamento direto, busca nos métodos de pagamento da API
        const paymentMethods = await getPaymentMethods(doctorId);
        
        // Busca correspondências exatas ou parciais nos métodos da API
        for (const method of paymentMethods) {
            const methodName = normalizeText(method.name);
            const methodSlug = normalizeText(method.slug);
            
            if (methodName === normalizedName || methodSlug === normalizedName) {
                console.log(`[DEBUG] Método de pagamento encontrado via correspondência exata: ${method.name} (ID: ${method.id})`);
                return method.id;
            }
            
            if (methodName.includes(normalizedName) || normalizedName.includes(methodName) ||
                methodSlug.includes(normalizedName) || normalizedName.includes(methodSlug)) {
                console.log(`[DEBUG] Método de pagamento encontrado via correspondência parcial: ${method.name} (ID: ${method.id})`);
                return method.id;
            }
            
            // Verifica erros de digitação para os métodos da API
            const nameDistance = levenshteinDistance(normalizedName, methodName);
            const slugDistance = levenshteinDistance(normalizedName, methodSlug);
            
            if (nameDistance <= maxDistance || slugDistance <= maxDistance) {
                console.log(`[DEBUG] Método de pagamento encontrado via correção de digitação na API: ${normalizedName} é similar a ${method.name} (distância: ${Math.min(nameDistance, slugDistance)}, ID: ${method.id})`);
                return method.id;
            }
        }
        
        console.log(`[DEBUG] Método de pagamento não encontrado para: ${paymentMethodName}`);
        return null;
    } catch (error) {
        console.error('Erro ao buscar ID do método de pagamento:', error);
        
        // Em caso de erro, tenta fazer um mapeamento direto
        const normalizedName = normalizeText(paymentMethodName);
        
        if (paymentMethodsMapping[normalizedName]) {
            console.log(`[DEBUG] Método de pagamento encontrado via mapeamento direto após erro: ${normalizedName} (ID: ${paymentMethodsMapping[normalizedName]})`);
            return paymentMethodsMapping[normalizedName];
        }
        
        // Verifica se alguma chave do mapeamento está contida no nome normalizado
        for (const [key, id] of Object.entries(paymentMethodsMapping)) {
            if (normalizedName.includes(key) || key.includes(normalizedName)) {
                console.log(`[DEBUG] Método de pagamento encontrado via correspondência parcial após erro: ${normalizedName} contém ou está contido em ${key} (ID: ${id})`);
                return id;
            }
        }
        
        // Verifica erros de digitação usando distância de Levenshtein
        const maxDistance = 2; // Distância máxima aceitável para considerar similar
        let bestMatch = null;
        let bestDistance = Infinity;
        
        for (const [key, id] of Object.entries(paymentMethodsMapping)) {
            const distance = levenshteinDistance(normalizedName, key);
            
            if (distance <= maxDistance && distance < bestDistance) {
                bestDistance = distance;
                bestMatch = { key, id };
            }
        }
        
        if (bestMatch) {
            console.log(`[DEBUG] Método de pagamento encontrado via correção de digitação após erro: ${normalizedName} é similar a ${bestMatch.key} (distância: ${bestDistance}, ID: ${bestMatch.id})`);
            return bestMatch.id;
        }
        
        return null;
    }
}

module.exports = {
    paymentMethodsFunction,
    getPaymentMethods,
    getPaymentMethodIdByName
};
