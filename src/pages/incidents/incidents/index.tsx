import { useState } from 'react'

import { useRouting } from '~/hooks'

import { pageTitle, reduceString, incidentsTbTitle, getStatusColor, getPriorityColor, dateFormatter } from '~/helpers'

import { Title, Table, Pagination, Button, TableTreatments } from '~/components'

export const Incidents = () => {
	pageTitle('Chamados')

	const [page, setPage] = useState(1)

	const { handleGoToIncidentDetail, handleGoToIncidentCreate } = useRouting()

	const incidentsTest = [
		{
			id: '6135cfe0-5e59-459f-b67c-196c136ed85f',
			code: 1,
			title: 'Catraca danificada então você precisa ir lá e atender, pois estamos precisando arrumar emmm',
			status: {
				name: 'Aberto',
			},
			priority: {
				name: 'Normal',
			},
			category: {
				name: 'Manutenção de Ambientes',
			},
			assigned: {
				name: null,
			},
			created_at: new Date(),
		},
		{
			id: '7135cfe0-5e59-459f-b67c-196c136ed85f',
			code: 2,
			title: 'Catraca danificada então você precisa ir lá e atender, pois estamos precisando arrumar emmm',
			status: {
				name: 'Aberto',
			},
			priority: {
				name: 'Alta',
			},
			category: {
				name: 'Manutenção de Ambientes',
			},
			assigned: {
				name: null,
			},
			created_at: new Date(),
		},
		{
			id: '8135cfe0-5e59-459f-b67c-196c136ed85f',
			code: 3,
			title: 'Catraca danificada então você precisa ir lá e atender, pois estamos precisando arrumar emmm',
			status: {
				name: 'Aberto',
			},
			priority: {
				name: 'Mediana',
			},
			category: {
				name: 'Manutenção de Ambientes',
			},
			assigned: {
				name: null,
			},
			created_at: new Date(),
		},
	]

	const renderTableBodyRows = () => (
		<>
			{incidentsTest.map((incident) => {
				return (
					<Table.TR
						key={incident.id}
						onClick={() => handleGoToIncidentDetail(incident.id)}
						className="cursor-pointer duration-150 hover:bg-gray7"
					>
						<Table.TD>{incident.code}</Table.TD>
						<Table.TD>{reduceString(incident.title, 30)}</Table.TD>
						<Table.TD className={`text-${getStatusColor(incident.status.name)}`}>{incident.status.name}</Table.TD>
						<Table.TD className={`text-${getPriorityColor(incident.priority.name)}`}>{incident.priority.name}</Table.TD>
						<Table.TD>{incident?.assigned?.name ? incident.assigned.name : 'A Definir'}</Table.TD>
						<Table.TD>{dateFormatter.format(new Date(incident.created_at))}</Table.TD>
					</Table.TR>
				)
			})}
		</>
	)

	const TableBody = () => {
		// if (isPending) return TableTreatments.renderPending(6)
		// if (isError) return TableTreatments.renderError(6)
		// if (incidents.data.payload.length === 0) return TableTreatments.renderNoData(6)
		return renderTableBodyRows()
	}

	return (
		<main className="w-full flex justify-center">
			<div className="w-full max-w-[1000px] flex flex-col items-start gap-4 px-4">
				<div className="w-full flex justify-between items-center">
					<Title title="Chamados" />

					<div className="flex gap-2">
						<Button description="+ Novo" onClick={handleGoToIncidentCreate} />
						<Button description="Exportar" />
					</div>
				</div>

				<Table.Container>
					<Table.THead>
						<Table.TR>
							{incidentsTbTitle.map((head) => (
								<Table.TH key={head}>{head}</Table.TH>
							))}
						</Table.TR>
					</Table.THead>

					<Table.TBody>
						<TableBody />
					</Table.TBody>
				</Table.Container>

				<Pagination page={page} setPage={setPage} totalCount={Number(1)} totalCountPage={Number(10)} />
			</div>
		</main>
	)
}
