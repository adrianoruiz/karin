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
        logger.log(`[clinicStore] Segment type para clinicaId ${clinicaId}: ${clinic.segment_types}`);
        return clinic.segment_types;
    } else if (clinic) {
        logger.warn(`[clinicStore] ClinicaId ${clinicaId} encontrado, mas não possui segment_types. Retornando 'default'.`);
        return 'default'; // Ou null, dependendo da lógica desejada
    }
    logger.warn(`[clinicStore] ClinicaId ${clinicaId} não encontrado no store. Retornando 'default'.`);
    return 'default'; // Retorna um tipo padrão se não encontrar
}

module.exports = {
    setClinicsData,
    getAllClinicsData,
    getSegmentTypeForClinicaId,
}; 