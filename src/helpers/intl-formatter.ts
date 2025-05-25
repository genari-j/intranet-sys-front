import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export const formatDate = (date: Date) => {
	const publishedDateFormatted = format(date, "dd 'de' LLLL 'de' yyyy 'às' HH:mm'h'", { locale: ptBR })
	const publishedRelativeToNow = formatDistanceToNow(date, { locale: ptBR, addSuffix: true })
	const isoString = date.toISOString()

	return {
		publishedDateFormatted,
		publishedRelativeToNow,
		isoString,
	}
}

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
})

export const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
})

export const formatDateTime = (date: Date) => ({
	date: dateFormatter.format(date),
	time: timeFormatter.format(date),
})

export const isSameDay = (dateA: Date, dateB: Date) => {
	const d1 = new Date(dateA)
	const d2 = new Date(dateB)

	return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
}

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
})
