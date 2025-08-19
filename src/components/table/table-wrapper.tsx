import { renderPending, renderError, renderNoData } from '~/components'

interface TableWrapperProps {
	isLoading?: boolean
	isError?: boolean
	hasData?: boolean
	columns: number
	children: React.ReactNode
}

export const TableWrapper = ({ isLoading, isError, hasData, columns, children }: TableWrapperProps) => {
	if (isLoading) return renderPending(columns)
	if (isError) return renderError(columns)
	if (!hasData) return renderNoData(columns)

	return <>{children}</>
}
