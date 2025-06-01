import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getNotifications } from '~/api/notifications-requests'
import { pageTitle, formatDate } from '~/helpers'

import { Pagination, RequestError, Spinner, Title } from '~/components'
import { Clock, OctagonAlert } from '~/assets'

export const Notifications = () => {
	pageTitle('Notificações')

	const [page, setPage] = useState(1)

	const { data, isPending, isError, isSuccess } = useQuery({
		queryKey: ['notifications', page],
		queryFn: () => getNotifications({ page }),
	})

	if (isPending) return <Spinner />
	if (isError) return <RequestError />

	if (!isPending && !isError && isSuccess)
		return (
			<main className="w-full max-w-[900px] flex flex-col items-center">
				<Title title="Notificações" />

				{data?.body.payload?.data && data?.body.payload?.data.length > 0 && (
					<div className="w-full flex flex-col gap-6">
						<div className="w-full flex flex-col gap-4">
							{data?.body.payload?.data.map((notification) => {
								return (
									<div
										key={notification.id}
										className={`w-full flex justify-between items-center shadow-md p-4 rounded-lg ${notification.read !== false ? 'opacity-70 bg-gray7' : ''} `}
									>
										<div className="flex flex-col">
											<span className="flex items-center gap-1 font-medium">
												<OctagonAlert size={18} /> {notification.title}
											</span>
											<p>{notification.description}</p>
										</div>
										<time
											title={formatDate(notification.created_at).publishedDateFormatted}
											dateTime={formatDate(notification.created_at).isoString}
											className="flex flex-col items-center gap-1"
										>
											<span className="flex items-center gap-1">
												<Clock size={18} /> {formatDate(notification.created_at).publishedRelativeToNow}
											</span>
											{notification.read !== false && (
												<span className="text-[10px] text-green9 font-medium">Notificação lida</span>
											)}
										</time>
									</div>
								)
							})}
						</div>

						<Pagination
							page={page}
							setPage={setPage}
							totalCount={data.body.payload?.pagination.total as number}
							totalCountPage={data.body.payload?.pagination.pages as number}
						/>
					</div>
				)}
			</main>
		)
}
