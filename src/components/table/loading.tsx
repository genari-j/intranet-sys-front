import { Spinner, TableMessageRow } from '~/components'

export const renderPending = (cols: number) => (
	<TableMessageRow message={<Spinner className="mx-auto" />} columns={cols} />
)
