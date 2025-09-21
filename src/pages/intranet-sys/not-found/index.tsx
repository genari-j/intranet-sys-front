import { Link } from 'react-router-dom'
import { pageTitle } from '~/helpers'
import { Button } from '~/components'

export const NotFound = () => {
	pageTitle('Página não encontrada')

	return (
		<main className="h-[100vh] flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8">
			<div className="max-w-md flex flex-col items-center text-center space-y-6">
				<h1 className="text-6xl font-bold tracking-tighter text-blue8 text-shadow-lg/30 sm:text-8x">404</h1>
				<p className="font-medium text-xl text-muted-foreground md:text-2xl">
					Ops, parece que a página que você está procurando não existe.
				</p>
				<p className="text-muted-foreground">Talvez tenha sido movida ou excluída 💬</p>
				<Link to="/">
					<Button type="button" description="Voltar ao início" />
				</Link>
			</div>
		</main>
	)
}
