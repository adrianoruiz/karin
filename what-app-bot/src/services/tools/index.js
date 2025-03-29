/**
 * Exporta todas as ferramentas em um único módulo
 */
const { availabilityFunction, getAvailableAppointments } = require('./availability');
const { plansFunction, getPlans } = require('./plans');
const { transcribeAudio } = require('./audio');

module.exports = {
    availabilityFunction,
    getAvailableAppointments,
    plansFunction,
    getPlans,
    transcribeAudio
};
