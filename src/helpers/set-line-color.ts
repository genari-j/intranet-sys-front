export const setLineColor = (color: string): string => {
	const colorMap: Record<string, string> = {
		Aberto: 'black9',
		'Em andamento': 'yellow9',
		Finalizado: 'blue9',
		Cancelado: 'red9',
		Normal: 'green9',
		Mediana: 'yellow9',
		Alta: 'red9',
	}

	return colorMap[color] || 'black9'
}
