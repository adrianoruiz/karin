const { Logger } = require('../utils/index');
const logger = new Logger(process.env.NODE_ENV !== 'production');

let clinicsData = [];

/**
 * Armazena os dados das clínicas obtidos da API.
 * @param {Array<Object>} clinics - Array de objetos de clínica.
 */
function setClinicsData(clinics) {
    if (Array.isArray(clinics)) {
        clinicsData = clinics;
        logger.log(`[clinicStore] Dados de ${clinics.length} clínicas armazenados.`);
    } else {
        logger.error('[clinicStore] Tentativa de armazenar dados de clínicas com formato inválido.');
        clinicsData = [];
    }
}

/**
 * Retorna todos os dados das clínicas armazenadas.
 * @returns {Array<Object>} Array de objetos de clínica.
 */
function getAllClinicsData() {
    return clinicsData;
}

/**
 * Obtém o segment_type para um clinicaId específico.
 * @param {string|number} clinicaId - O ID da clínica.
 * @returns {string|null} O segment_type da clínica ou 'default' se não encontrado.
 */
function getSegmentTypeForClinicaId(clinicaId) {
    logger.log(`[clinicStore] 🔍 Buscando segment_type para clinicaId: ${clinicaId}`);
    logger.log(`[clinicStore] Total de clínicas armazenadas: ${clinicsData.length}`);
    
    const clinic = clinicsData.find(c => String(c.id) === String(clinicaId));
    if (clinic && clinic.segment_types) {
        logger.log(`[clinicStore] ✅ Segment type para clinicaId ${clinicaId}: "${clinic.segment_types}"`);
        
        // Validar se o segmento é conhecido
        const validSegments = ['clinica-medica', 'clinica-odonto', 'salao-beleza'];
        if (!validSegments.includes(clinic.segment_types)) {
            logger.warn(`[clinicStore] ⚠️  Segmento desconhecido "${clinic.segment_types}" para clínica ${clinicaId}. Usando 'clinica-medica' como padrão.`);
            return 'clinica-medica'; // Usar clínica médica como padrão mais útil
        }
        
        return clinic.segment_types;
    } else if (clinic) {
        logger.log(`[clinicStore] ❌ Clínica ${clinicaId} encontrada mas sem segment_types:`);
        logger.log(`[clinicStore] Dados da clínica:`, JSON.stringify(clinic, null, 2));
        logger.warn(`[clinicStore] ClinicaId ${clinicaId} encontrado, mas não possui segment_types. Usando 'clinica-medica' como padrão.`);
        return 'clinica-medica'; // Usar clínica médica como padrão mais útil que 'default'
    }
    logger.warn(`[clinicStore] ❌ ClinicaId ${clinicaId} não encontrado no store. Usando 'clinica-medica' como padrão.`);
    logger.log(`[clinicStore] IDs disponíveis: [${clinicsData.map(c => c.id).join(', ')}]`);
    return 'clinica-medica'; // Usar clínica médica como padrão mais útil que 'default'
}

/**
 * Verifica se a IA está ativa para um clinicaId específico.
 * Procura por `is_ai_active` no nível raiz do objeto da clínica,
 * ou como fallback `ai_config.is_active`.
 * @param {string|number} clinicaId - O ID da clínica.
 * @returns {boolean} True se a IA estiver ativa, false caso contrário ou se a clínica não for encontrada.
 */
function isAiEnabledForClinica(clinicaId) {
    const clinic = clinicsData.find(c => String(c.id) === String(clinicaId));
    if (clinic) {
        // Prioriza is_ai_active no nível raiz
        if (typeof clinic.is_ai_active === 'boolean') {
            logger.log(`[clinicStore] IA status para clinicaId ${clinicaId} (is_ai_active): ${clinic.is_ai_active}`);
            return clinic.is_ai_active;
        }
        // Fallback para ai_config.is_active
        if (clinic.ai_config && typeof clinic.ai_config.is_active === 'boolean') {
            logger.log(`[clinicStore] IA status para clinicaId ${clinicaId} (ai_config.is_active): ${clinic.ai_config.is_active}`);
            return clinic.ai_config.is_active;
        }
        logger.warn(`[clinicStore] ClinicaId ${clinicaId} encontrado, mas os campos de status da IA (is_ai_active, ai_config.is_active) não foram encontrados ou são inválidos. Assumindo IA como desativada.`);
        return false; // Default to false if no valid status field is found
    }
    logger.warn(`[clinicStore] ClinicaId ${clinicaId} não encontrado no store ao verificar status da IA. Assumindo IA como desativada.`);
    return false; // Default to false if clinic is not found
}

/**
 * Obtém o prompt_fixed para um clinicaId específico.
 * @param {string|number} clinicaId - O ID da clínica.
 * @returns {string|null} O prompt_fixed da clínica ou null se não encontrado.
 */
function getPromptFixedForClinica(clinicaId) {
    const clinic = clinicsData.find(c => String(c.id) === String(clinicaId));
    if (clinic && clinic.ai_config && clinic.ai_config.prompt_fixed) {
        logger.log(`[clinicStore] ✅ Prompt fixed encontrado para clinicaId ${clinicaId}`);
        return clinic.ai_config.prompt_fixed;
    }
    logger.warn(`[clinicStore] ❌ Prompt fixed não encontrado para clinicaId ${clinicaId}`);
    return null;
}

module.exports = {
    setClinicsData,
    getAllClinicsData,
    getSegmentTypeForClinicaId,
    isAiEnabledForClinica,
    getPromptFixedForClinica,
}; 