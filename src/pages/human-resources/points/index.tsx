import type { AxiosError } from 'axios'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createPoint, getPoints } from '~/api/points-requests'
import { pageTitle, pointsTable, dateFormatter, timeFormatter, responseStatus } from '~/helpers'
import type { Points as PointsType } from '~/@types'

import { Pagination, RequestError, Spinner, Table, TableTreatments, Title } from '~/components'
import { PointTrack } from './components'

export const Points = () => {
	pageTitle('Registro de Ponto')

	const [page, setPage] = useState(1)

	const { data, isPending, isError, isSuccess, refetch } = useQuery({
		queryKey: ['points', page],
		queryFn: () => getPoints(page),
	})

	const { mutate } = useMutation({
		mutationFn: createPoint,
		onSuccess: () => {
			toast.success('Ponto registado.')
			refetch()
		},
		onError: (error: AxiosError) => responseStatus(error),
	})

	if (isPending) return <Spinner />
	if (isError) return <RequestError />

	const renderTableBodyRows = () => (
		<>
			{data?.body?.payload?.data.map((point) => {
				return (
					<Table.TR key={point.id}>
						<Table.TD>
							{point?.created_at ? dateFormatter.format(new Date(point.created_at)) : 'Erros ao mostrar'}
						</Table.TD>
						<Table.TD>{point?.entry ? timeFormatter.format(new Date(point.entry)) : 'Erros ao mostrar'}</Table.TD>
						<Table.TD>{point?.lunch_out ? timeFormatter.format(new Date(point.lunch_out)) : 'A definir'}</Table.TD>
						<Table.TD>
							{point?.lunch_return ? timeFormatter.format(new Date(point.lunch_return)) : 'A definir'}
						</Table.TD>
						<Table.TD>{point?.departure ? timeFormatter.format(new Date(point.departure)) : 'A definir'}</Table.TD>
					</Table.TR>
				)
			})}
		</>
	)

	const TableBody = () => {
		if (isPending) return TableTreatments.renderPending(5)
		if (isError) return TableTreatments.renderError(5)
		if (data?.body?.payload?.data.length === 0) return TableTreatments.renderNoData(5)
		return renderTableBodyRows()
	}

	if (!isPending && !isError && isSuccess)
		return (
			<main className="w-full flex justify-center">
				<div className="w-full max-w-[1000px] flex flex-col items-start gap-4 px-4">
					<div className="flex flex-col items-start">
						<Title title="Histórico de Registros de Ponto" />
						<p>Seus registros de ponto estão organizados de forma decrescente, do mais recente ao mais antigo.</p>
					</div>

					<div className="w-full flex gap-10">
						<div className="w-full flex flex-col">
							<Table.Container>
								<Table.THead>
									<Table.TR>
										{pointsTable.map((head) => (
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
								totalCount={data.body.payload?.pagination.total as number}
								totalCountPage={data.body.payload?.pagination.pages as number}
							/>
						</div>

						{page === 1 && <PointTrack mutate={mutate} points={data?.body?.payload?.data as PointsType[]} />}
					</div>
				</div>
			</main>
		)
}
