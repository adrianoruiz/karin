/**
 * Formata um valor numérico para moeda brasileira
 * @param value Valor a ser formatado
 * @param symbol Símbolo da moeda (default: R$)
 * @returns String formatada (ex: R$ 1.234,56)
 */
export const formatMoney = (value: number, symbol: string = 'R$'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
    .format(value)
    .replace('R$', symbol)
}

/**
 * Formata quantidades, retornando "0" para valores vazios
 * @param value Valor a ser formatado
 * @returns String formatada
 */
export const formatQuantities = (value: any): string => {
  if (
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  ) {
    return '0'
  }
  return value.toString()
}

/**
 * Formata um número usando o formato especificado
 * @param price Valor a ser formatado
 * @param format Formato desejado
 * @returns String formatada
 */
export const formatPrice = (price: number, format: string): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

export const formatDateWithHour = (date: string | undefined) => {
  if (!date) return ''

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  return formatter.format(new Date(date)).replace(',', ' às')
}
export const formatDatePTBR = (date: string | undefined) => {
  if (!date) return ''
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
  return formatter.format(new Date(date))
}
export const formatHourDifference = (
  firstDate: any,
  secondDate: any,
  options = { isNotification: false, durationReturn: false, hourFormat: false }
) => {
  const { isNotification, durationReturn, hourFormat } = options
  const difference = calculateDifference(firstDate, secondDate)

  if (durationReturn) {
    return difference
  }

  return formatDuration(difference, { isNotification, hourFormat })
}

const calculateDifference = (firstDate: any, secondDate: any) => {
  const diff = new Date(firstDate).getTime() - new Date(secondDate).getTime()
  return {
    seconds: Math.floor(diff / 1000),
    minutes: Math.floor(diff / (1000 * 60)),
    hours: Math.floor(diff / (1000 * 60 * 60)),
    days: Math.floor(diff / (1000 * 60 * 60 * 24))
  }
}

const formatDuration = (
  duration: any,
  options = { isNotification: false, hourFormat: false }
) => {
  const { isNotification, hourFormat } = options

  if (hourFormat) {
    const hours = Math.floor(duration.minutes / 60)
      .toString()
      .padStart(2, '0')
    const minutes = (duration.minutes % 60).toString().padStart(2, '0')
    return `${hours}h ${minutes}`
  }

  if (isNotification) {
    if (Math.abs(duration.minutes) < 60) {
      return `${Math.abs(duration.minutes)} minutos`
    } else if (Math.abs(duration.hours) < 24) {
      return `${Math.abs(duration.hours)} horas`
    } else {
      return `${Math.abs(duration.days)} dias`
    }
  } else {
    if (Math.abs(duration.seconds) < 60) {
      return `A ${Math.abs(duration.seconds)} segundos`
    } else if (Math.abs(duration.minutes) < 60) {
      return `A ${Math.abs(duration.minutes)} ${
        Math.abs(duration.minutes) === 1 ? 'minuto' : 'minutos'
      }`
    } else if (Math.abs(duration.hours) < 24) {
      return `A ${Math.abs(duration.hours)} ${
        Math.abs(duration.hours) === 1 ? 'hora' : 'horas'
      }`
    } else {
      return `A ${Math.abs(duration.days)} ${
        Math.abs(duration.days) === 1 ? 'dia' : 'dias'
      }`
    }
  }
}
