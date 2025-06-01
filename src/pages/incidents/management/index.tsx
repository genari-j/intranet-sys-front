import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'
import { getIncidentById } from '~/api/incidents-requests'

import { pageTitle } from '~/helpers'

import { Title } from '~/components'

export const IncidentManagement = () => {
	const [isReadOnly, setIsReadeOnly] = useState(true)
	pageTitle(`${isReadOnly ? 'Detalhe' : 'Edição'} de Chamado`)

	return (
		<main className="w-full max-w-[900px] flex flex-col items-start">
			<Title title={`${isReadOnly ? 'Detalhe' : 'Edição'} de Chamado`} />
		</main>
	)
}
