// src/constants/patient.js

// List of unwanted words/prefixes in patient names
const UNWANTED_PATIENT_NAME_WORDS = [
    'P.', 'C.', 'Cliente', 'Paciente', 'TDAH', 'Autista','Insonia','Anorexia','Bipolar',
    'Epilepsia','Depressão','Drepresivo', 'TOC', 'Bulemia', 'Esquizofrenia', 'Tic', 'Tics','Viciado',
    'Viciada', 'Piscopata', 'Contato', 'Chata', 'Burra', 'Burro', 'Contato', 'Contatinho'
    // Add more words as needed
];

module.exports = {
    UNWANTED_PATIENT_NAME_WORDS
}; 