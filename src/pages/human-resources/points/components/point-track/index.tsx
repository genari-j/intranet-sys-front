import type { BasePoints, CreateOrUpdatePointBody, Points } from '~/@types'
import { months, isSameDay, stepLabels, stepIcons } from '~/helpers'

import { Button } from '~/components'

import { CheckCheck, X } from '~/assets'
import { validateCreateOrUpdatePointSchema } from '~/validators'
import type { UseMutateFunction } from '@tanstack/react-query'

type PointTrackProps = {
	mutate: UseMutateFunction<any, unknown, CreateOrUpdatePointBody, unknown>
	points: Points[]
}

const getCurrentStep = (lastPoint: BasePoints, today: Date) => {
	if (!lastPoint || !isSameDay(lastPoint.created_at, today)) return 'entry'
	if (lastPoint.lunch_out === null) return 'lunch_out'
	if (lastPoint.lunch_return === null) return 'lunch_return'
	if (lastPoint.departure === null) return 'departure'
	return 'done'
}

export const PointTrack = ({ mutate, points }: PointTrackProps) => {
	const registerPoint = (data: CreateOrUpdatePointBody) => {
		const valdateData = validateCreateOrUpdatePointSchema.safeParse(data)

		if (!valdateData.success) return console.error('Erros de validação:', valdateData.error.errors)

		mutate(data)
	}

	const currentStep = getCurrentStep(points[0], new Date())

	return (
		<div className="max-h-[433px] min-w-[238px] flex flex-col gap-2 p-4 rounded-lg shadow-md bg-gradient-to-bl from-gray7 to-white9">
			<span className="font-medium">
				Hoje, {new Date().getDate()} de {months[new Date().getMonth()]}
			</span>
			<Button onClick={() => registerPoint({ date: new Date() })} description={`${stepLabels[currentStep]}`} />

			<div className="flex flex-col gap-2 mt-8">
				<span className="font-medium">Registros de hoje:</span>

				<div className="flex flex-col gap-2">
					{stepIcons
						.filter((step) => step !== 'done')
						.map((step, index) => {
							const isDone = index < stepIcons.indexOf(currentStep as (typeof stepIcons)[number])
							const Icon = isDone ? CheckCheck : X
							const iconColor = isDone ? 'text-green9' : 'text-red9'

							return (
								<span key={step} className="flex items-center gap-2 font-medium">
									{stepLabels[step].split(' ')[1]?.replace(/^./, (c) => c.toUpperCase())}{' '}
									<Icon size={18} className={iconColor} />
								</span>
							)
						})}
				</div>
			</div>
		</div>
	)
}
