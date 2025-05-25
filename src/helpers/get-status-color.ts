export const getStatusColor = (status: string) => {
	switch (status) {
		case 'Aberto':
			return 'black9'
		case 'Em andamento':
			return 'yellow9'
		case 'Finalizado':
			return 'blue9'
		case 'Cancelado':
			return 'red9'
	}
}

export const getPriorityColor = (status: string) => {
	switch (status) {
		case 'Normal':
			return 'green9'
		case 'Mediana':
			return 'yellow9'
		case 'Alta':
			return 'red9'
	}
}
