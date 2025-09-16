import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getIncidents } from '~/api/incidents-requests'
import { useRouting } from '~/hooks'

import { pageTitle, reduceString, incidentsTbTitle, setLineColor, dateFormatter } from '~/helpers'

import { Title, TableElements, TableData, Pagination, Button, Spinner, RequestError } from '~/components'

export const Incidents = () => {
	pageTitle('Chamados')

	const { handleGoToIncidentDetail, handleGoToIncidentCreate } = useRouting()

	const [page, setPage] = useState(1)
	const incidentsParams = {
		page: page,
	}
	const { data, isPending, isError, isSuccess } = useQuery({
		queryKey: ['points', incidentsParams],
		queryFn: () => getIncidents(incidentsParams),
	})

	if (isPending) return <Spinner />
	if (isError) return <RequestError />

	if (!isPending && !isError && isSuccess)
		return (
			<main className="w-full flex justify-center">
				<div className="w-full max-w-[1000px] flex flex-col items-start gap-4 px-4">
					<div className="w-full flex justify-between items-center">
						<Title title="Chamados" />
						<Button description="+ Novo" onClick={handleGoToIncidentCreate} />
					</div>

					<TableData
						data={data?.body?.payload?.data}
						isLoading={isPending}
						isError={isError}
						columns={incidentsTbTitle}
						rowRenderer={(incident) => (
							<TableElements.TR
								key={incident.id}
								onClick={() => handleGoToIncidentDetail(incident.id)}
								className="cursor-pointer duration-150 hover:bg-gray7"
							>
								<TableElements.TD>{incident.code}</TableElements.TD>
								<TableElements.TD>
									{incident.title ? reduceString(incident.title, 30) : 'Não informado.'}
								</TableElements.TD>
								<TableElements.TD>{incident.status?.name}</TableElements.TD>
								<TableElements.TD className={`text-${setLineColor(incident.priority?.name)}`}>
									{incident.priority?.name}
								</TableElements.TD>
								<TableElements.TD>{incident.assigned?.name ?? 'Não definido'}</TableElements.TD>
								<TableElements.TD>{dateFormatter.format(new Date(incident.created_at))}</TableElements.TD>
							</TableElements.TR>
						)}
					/>

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
