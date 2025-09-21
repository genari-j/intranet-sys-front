import { Link } from 'react-router-dom'
import { pageTitle } from '~/helpers'
import { Button } from '~/components'

export const RequestError = () => {
	pageTitle('Ops, erro inesperado')

	return (
		<main className="flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
			<div className="max-w-md flex flex-col items-center gap-2 text-center">
				<p className="font-medium text-xl md:text-2xl">Ops, ocorreu algum erro inesperado.</p>
				<p>Por gentileza, tente novamente ou contate um Administrador 💬</p>
				<Link to="/">
					<Button type="button" description="Tentar novamente" />
				</Link>
			</div>
		</main>
	)
}
