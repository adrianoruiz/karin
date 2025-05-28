/**
 * Exporta todas as ferramentas em um único módulo
 */
const { availabilityFunction, getAvailableAppointments } = require('./availability');
const { plansFunction, getAvailablePlans, getPlans } = require('./plans');
const { transcribeAudio } = require('./audio');
const { bookingFunction, bookAppointment, checkAvailability } = require('./booking');
const { paymentMethodsFunction, getPaymentMethods, getPaymentMethodIdByName } = require('./payment');
const { updateBookingFunction, updateAppointment } = require('./updateBooking');
const { finishAppointmentFunction, finishAppointment } = require('./finishAppointment');
const { shareManicureContact, shareSobrancelhasContact, shareDepilacaoContact, getUserName } = require('./contacts');

module.exports = {
    availabilityFunction,
    getAvailableAppointments,
    plansFunction,
    getAvailablePlans,
    getPlans,
    transcribeAudio,
    bookingFunction,
    bookAppointment,
    checkAvailability,
    paymentMethodsFunction,
    getPaymentMethods,
    getPaymentMethodIdByName,
    updateBookingFunction,
    updateAppointment,
    finishAppointmentFunction,
    finishAppointment,
    shareManicureContact,
    shareSobrancelhasContact,
    shareDepilacaoContact,
    getUserName
};
