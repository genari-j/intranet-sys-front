import { pageTitle } from '~/helpers'

import { Title } from '~/components'

export const Purchases = () => {
	pageTitle('Compras')

	return (
		<main className="w-full flex justify-center">
			<div className="w-full max-w-[1000px] flex flex-col items-start gap-4 px-4">
				<Title title="Compras" />
			</div>
		</main>
	)
}
