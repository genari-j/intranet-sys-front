import { useNavigate } from 'react-router-dom'

import { getNews } from '~/api'
import { usePermissions, useRouting, useSession } from '~/hooks'
import { pageTitle, dateFormatter } from '~/helpers'

import { Button, RequestError, Spinner, Title } from '~/components'
import { useQuery } from '@tanstack/react-query'

export const News = () => {
	const { handleGoToEditNews } = useRouting()
	const { allowedRegisterNews } = usePermissions()
	const navigate = useNavigate()

	const { isSignedIn } = useSession()
	isSignedIn()
		? pageTitle('Seja bem-vindo(a)')
		: pageTitle('Acesse facilmente todas informações e recursos internos da empresa')

	const { data, isPending, isError, isSuccess } = useQuery({
		queryKey: ['news'],
		queryFn: getNews,
	})

	if (isPending) return <Spinner />
	if (isError) return <RequestError />

	if (!isPending && !isError && isSuccess)
		return (
			<main className="w-full flex flex-col items-start gap-2">
				<div className="w-full flex flex-wrap justify-center gap-4 mb-8">
					<div className="w-full max-w-[180px] h-[70px] flex justify-center items-center rounded-lg bg-gray7">VAGO</div>
					<div className="w-full max-w-[180px] h-[70px] flex justify-center items-center rounded-lg bg-gray7">VAGO</div>
					<div className="w-full max-w-[180px] h-[70px] flex justify-center items-center rounded-lg bg-gray7">VAGO</div>
					<div className="w-full max-w-[180px] h-[70px] flex justify-center items-center rounded-lg bg-gray7">VAGO</div>
					<div className="w-full max-w-[180px] h-[70px] flex justify-center items-center rounded-lg bg-gray7">VAGO</div>
					<div className="w-full max-w-[180px] h-[70px] flex justify-center items-center rounded-lg bg-gray7">VAGO</div>
					<div className="w-full max-w-[180px] h-[70px] flex justify-center items-center rounded-lg bg-gray7">VAGO</div>
					<div className="w-full max-w-[180px] h-[70px] flex justify-center items-center rounded-lg bg-gray7">VAGO</div>
					<div className="w-full max-w-[180px] h-[70px] flex justify-center items-center rounded-lg bg-gray7">VAGO</div>
				</div>

				<div className="flex flex-col gap-8">
					<div className="flex flex-col items-start gap-2">
						<div className="w-full flex justify-between items-center">
							<Title title="Sessão destinada as notícias internas" />
							{allowedRegisterNews && (
								<Button description="Nova notícia" onClick={() => navigate('/sistemas/noticias/cadastrar')} />
							)}
						</div>
						<p className="mb-8">
							Acompanhe as notícias da empresa e mantenha-se atualizado sobre tudo o que impacta seu dia a dia. Notícias
							internas ajudam você a entender, participar e crescer junto com a empresa.
						</p>

						<div>
							{data?.body?.payload?.hero.map((highNew) => {
								return (
									<div
										key={highNew.id}
										onClick={() => handleGoToEditNews(highNew.id)}
										className="w-full relative pb-12 rounded-lg shadow-md duration-150 hover:shadow-lg hover:cursor-pointer"
									>
										<img
											src={String(highNew.avatar)}
											alt={String(highNew.title)}
											title={String(highNew.title)}
											className="w-full rounded-lg"
										/>
										<h3 className="font-medium px-4 my-2">{highNew.title}</h3>
										<p className="text-sm px-4">{highNew.description}</p>
										<span className="text-sm font-medium absolute left-4 bottom-4">
											{dateFormatter.format(new Date(highNew.updated_at))}
										</span>
									</div>
								)
							})}
						</div>
					</div>

					<div className="flex flex-col items-start gap-2">
						<Title title="Mediana" />
						<div className="w-full flex gap-4">
							{data?.body?.payload?.medium.map((midNew) => {
								return (
									<div
										key={midNew.id}
										onClick={() => handleGoToEditNews(midNew.id)}
										className="w-full max-w-[300px] relative pb-12 rounded-lg shadow-md duration-150 hover:shadow-lg hover:cursor-pointer"
									>
										<img
											src={String(midNew.avatar)}
											alt={String(midNew.title)}
											title={String(midNew.title)}
											className="w-full rounded-lg"
										/>
										<h3 className="font-medium px-4 my-2">{midNew.title}</h3>
										<p className="text-sm px-4">{midNew.description}</p>
										<span className="text-sm font-medium absolute left-4 bottom-4">
											{dateFormatter.format(new Date(midNew.updated_at))}
										</span>
									</div>
								)
							})}
						</div>
					</div>

					<div className="flex flex-col items-start gap-2">
						<Title title="Simples" />
						<div className="w-full flex gap-4">
							{data?.body?.payload?.simple.map((simpNew) => {
								return (
									<div
										key={simpNew.id}
										onClick={() => handleGoToEditNews(simpNew.id)}
										className="w-full max-w-[300px] relative pb-12 rounded-lg shadow-md duration-150 hover:shadow-lg hover:cursor-pointer"
									>
										<img
											src={simpNew.avatar as string}
											alt={simpNew.title}
											title={simpNew.title}
											className="w-full rounded-lg"
										/>
										<h3 className="font-medium px-4 my-2">{simpNew.title}</h3>
										<p className="text-sm px-4">{simpNew.description}</p>
										<span className="text-sm font-medium absolute left-4 bottom-4">
											{dateFormatter.format(new Date(simpNew.updated_at))}
										</span>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</main>
		)
}
