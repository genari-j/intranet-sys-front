import { TableElements, TableWrapper } from '~/components'

interface DataTableProps<T> {
	data?: T[]
	isLoading: boolean
	isError: boolean
	columns: string[]
	rowRenderer: (item: T) => React.ReactNode
}

export function TableData<T>({ data, isLoading, isError, columns, rowRenderer }: DataTableProps<T>) {
	return (
		<TableElements.Container>
			<TableElements.THead>
				<TableElements.TR>
					{columns.map((col) => (
						<TableElements.TH key={col}>{col}</TableElements.TH>
					))}
				</TableElements.TR>
			</TableElements.THead>

			<TableElements.TBody>
				<TableWrapper isLoading={isLoading} isError={isError} hasData={!!data?.length} columns={columns.length}>
					{data?.map(rowRenderer)}
				</TableWrapper>
			</TableElements.TBody>
		</TableElements.Container>
	)
}
