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
    const clinic = clinicsData.find(c => String(c.id) === String(clinicaId));
    if (clinic && clinic.segment_types) {
        // logger.log(`[clinicStore] Segment type para clinicaId ${clinicaId}: ${clinic.segment_types}`);
        return clinic.segment_types;
    } else if (clinic) {
        logger.warn(`[clinicStore] ClinicaId ${clinicaId} encontrado, mas não possui segment_types. Retornando 'default'.`);
        return 'default'; // Ou null, dependendo da lógica desejada
    }
    logger.warn(`[clinicStore] ClinicaId ${clinicaId} não encontrado no store. Retornando 'default'.`);
    return 'default'; // Retorna um tipo padrão se não encontrar
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

module.exports = {
    setClinicsData,
    getAllClinicsData,
    getSegmentTypeForClinicaId,
    isAiEnabledForClinica,
}; 