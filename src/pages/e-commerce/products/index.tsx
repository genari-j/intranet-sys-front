import { pageTitle } from '~/helpers'

import { Title } from '~/components'

export const Products = () => {
	pageTitle('Confira nossa linha de produtos disponíveis voltados ao seu négocio')

	return (
		<main className="w-full flex justify-center">
			<div className="w-full max-w-[1000px] flex flex-col items-start gap-4 px-4">
				<Title title="Produtos" />
			</div>
		</main>
	)
}
