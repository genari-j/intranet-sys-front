// import { useParams } from 'react-router-dom'

// import { useQuery } from '@tanstack/react-query'
// import { getIncidentById } from '~/api/incidents-requests'

import { pageTitle } from '~/helpers'

import { Title } from '~/components'

export const IncidentManagement = () => {
	const isReadOnly = true
	pageTitle(`${isReadOnly ? 'Detalhe' : 'Edição'} de Chamado`)

	// const params = useParams()

	// const { data: incidentById } = useQuery({
	// 	queryKey: [`incidents-${params.id}`],
	// 	queryFn: () => getIncidentById(String(params.id)),
	// })

	return (
		<main className="w-full max-w-[900px] flex flex-col items-start">
			<Title title={`${isReadOnly ? 'Detalhe' : 'Edição'} de Chamado`} />
		</main>
	)
}
