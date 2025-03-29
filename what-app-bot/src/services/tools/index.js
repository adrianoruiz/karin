/**
 * Exporta todas as ferramentas em um único módulo
 */
const { availabilityFunction, getAvailableAppointments } = require('./availability');
const { plansFunction, getPlans } = require('./plans');
const { transcribeAudio } = require('./audio');
const { bookingFunction, bookAppointment, checkAvailability } = require('./booking');
const { paymentMethodsFunction, getPaymentMethods, getPaymentMethodIdByName } = require('./payment');

module.exports = {
    availabilityFunction,
    getAvailableAppointments,
    plansFunction,
    getPlans,
    transcribeAudio,
    bookingFunction,
    bookAppointment,
    checkAvailability,
    paymentMethodsFunction,
    getPaymentMethods,
    getPaymentMethodIdByName
};
