import { useState } from 'react'

import { getIncidents } from '~/api/incidents-requests'
import { useRouting } from '~/hooks'

import { pageTitle, reduceString, incidentsTbTitle, setLineColor, dateFormatter } from '~/helpers'

import { Title, Table, Pagination, Button, TableTreatments } from '~/components'
import { useQuery } from '@tanstack/react-query'

export const Incidents = () => {
	pageTitle('Chamados')

	const { handleGoToIncidentDetail, handleGoToIncidentCreate } = useRouting()

	const [page, setPage] = useState(1)

	const { data, isPending, isError } = useQuery({
		queryKey: ['points', page],
		queryFn: () => getIncidents({ page }),
	})

	const renderTableBodyRows = () => (
		<>
			{data?.body?.payload?.data.map((incident) => {
				return (
					<Table.TR
						key={incident.id}
						onClick={() => handleGoToIncidentDetail(incident.id)}
						className="cursor-pointer duration-150 hover:bg-gray7"
					>
						<Table.TD>{incident.code}</Table.TD>
						<Table.TD>{reduceString(incident.title, 30)}</Table.TD>
						<Table.TD>{incident.status.name}</Table.TD>
						<Table.TD className={`text-${setLineColor(incident.priority.name)}`}>{incident.priority.name}</Table.TD>
						<Table.TD>{incident?.assigned?.name ? incident.assigned.name : 'A Definir'}</Table.TD>
						<Table.TD>{dateFormatter.format(new Date(incident.created_at))}</Table.TD>
					</Table.TR>
				)
			})}
		</>
	)

	const TableBody = () => {
		if (isPending) return TableTreatments.renderPending(6)
		if (isError) return TableTreatments.renderError(6)
		if (data?.body?.payload?.data.length === 0) return TableTreatments.renderNoData(6)
		return renderTableBodyRows()
	}

	return (
		<main className="w-full flex justify-center">
			<div className="w-full max-w-[1000px] flex flex-col items-start gap-4 px-4">
				<div className="w-full flex justify-between items-center">
					<Title title="Chamados" />

					<Button description="+ Novo" onClick={handleGoToIncidentCreate} />
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

				<Pagination
					page={page}
					setPage={setPage}
					totalCount={Number(data?.body?.payload?.pagination.total)}
					totalCountPage={Number(data?.body?.payload?.pagination.pages)}
				/>
			</div>
		</main>
	)
}
