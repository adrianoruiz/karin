const LIST_ITEM_REGEX = /^(name|cpf|phone|birthdate|pagamento):\s*(.*?)$/im;
const FIELD_VALUE_REGEX = /^(name|cpf|phone|birthdate):\s*(.*?)$/i;
const PAYMENT_FIELD_REGEX = /pagamento/i;
const PAYMENT_VALUE_REGEX = /:\s*(.*?)$/;
const PIX_REGEX = /pix/i;
const CREDIT_REGEX = /(credito|crédito)/i;
const DEBIT_REGEX = /(debito|débito)/i;
const DATE_FORMAT_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;

module.exports = {
  LIST_ITEM_REGEX,
  FIELD_VALUE_REGEX,
  PAYMENT_FIELD_REGEX,
  PAYMENT_VALUE_REGEX,
  PIX_REGEX,
  CREDIT_REGEX,
  DEBIT_REGEX,
  DATE_FORMAT_REGEX
};
