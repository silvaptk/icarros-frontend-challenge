export function formatPrice(price: number) {
  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })

  return priceFormatter.format(price)
}

export function formatKilometers(kilometers: number) {
  const kilometersFormatter = new Intl.NumberFormat('pt-BR')

  return kilometersFormatter.format(Math.round(kilometers)) + ' Km'
}

export function limitLength(text: string, maxLength = 10) {
  if (text.length <= maxLength) {
    return text
  }

  return text.slice(0, maxLength) + '...'
}
