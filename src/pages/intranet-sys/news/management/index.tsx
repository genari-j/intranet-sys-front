import { useState } from 'react'

import { getNewsFlags, getNewById, updateNew } from '~/api/news-requests'
import { usePermissions } from '~/hooks'
import { newsRegister, pageTitle, handleBlur, handleFocus, responseStatus } from '~/helpers'

import { CloudUpload } from '~/assets'
import { Textfield, Textarea, Button, Spinner, Title, RequestError } from '~/components'
import { ExplainNews, FlagsDropdown } from './components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UpdateNewsBody } from '~/@types'
import type { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { validateUpdateNewsSchema } from '~/validators'

interface SelectedItem {
	id?: string
	name?: string
}

export const NewsManagement = () => {
	const [isReadOnly, setIsReadeOnly] = useState(true)
	pageTitle(`${isReadOnly ? 'Detalhe' : 'Edição'} de Notícias`)

	const params = useParams()
	const navigate = useNavigate()

	const { allowedManagementNews } = usePermissions()

	const form = useForm<UpdateNewsBody>({
		resolver: zodResolver(validateUpdateNewsSchema),
	})
	const {
		formState: { errors },
	} = form

	const { mutate, isPending } = useMutation({
		mutationFn: updateNew,
		onSuccess: () => {
			toast.success('Notícia atualizada. Você será redirecionado.')
			const changeNavigation = () => navigate('/')
			setTimeout(changeNavigation, 2500)
		},
		onError: (error: AxiosError) => responseStatus(error),
	})

	const onSubmit: SubmitHandler<UpdateNewsBody> = async (data) => mutate({ id: String(params.id), data })

	const {
		data: newsById,
		isError,
		isSuccess,
	} = useQuery({
		queryKey: [`news-flags-${params.id}`],
		queryFn: () => getNewById(String(params.id)),
	})

	const { data: newsFlags } = useQuery({
		queryKey: ['news-flags'],
		queryFn: getNewsFlags,
	})

	const [searchedFlag, setSearchedFlag] = useState<SelectedItem>({})
	const [isFlagsListVisible, setIsFlagsListVisible] = useState<boolean>(false)

	const filteredFlagsList = newsFlags?.body?.payload?.filter((item) =>
		item.name.toLowerCase().includes(searchedFlag.name?.toLowerCase() || ''),
	)

	const handleSelectedFlag = (flag: SelectedItem) => {
		setSearchedFlag(flag)
		form.setValue('flag_name', String(flag.name))
		setIsFlagsListVisible(false)
	}

	if (isPending) return <Spinner />
	if (isError) return <RequestError />

	if (!isPending && !isError && isSuccess)
		return (
			<main className="w-full max-w-[900px] flex flex-col items-start">
				<Title title={`${isReadOnly ? 'Detalhe' : 'Edição'} de Notícias`} />
				{!isReadOnly && <p>Ao editar notícias, se atente ao selecionar em qual sessão ela deve aparecer 💬</p>}

				<div className="flex gap-10 mt-6">
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[580px] flex flex-col gap-2">
						<Textfield
							id="title"
							type="text"
							label="Título:"
							htmlFor={`${isReadOnly ? '' : 'title'}`}
							placeholder="Benefício de Seguro de Vida para Todos"
							readOnly={isReadOnly}
							defaultValue={newsById?.body?.payload?.title}
							register={form.register('title')}
							error={errors.title != null}
							message={errors?.title?.message}
							className={`${isReadOnly ? 'pointer-events-none' : ''}`}
						/>

						{isReadOnly ? (
							<div className="flex flex-col">
								<span className="font-medium mb-[2px]">Descrição:</span>
								<p className="w-full max-h-[272px] overflow-hidden overflow-y-auto p-4 rounded bg-gray7">
									{newsById?.body?.payload?.description}
								</p>
							</div>
						) : (
							<Textarea
								id="description"
								label="Descrição:"
								htmlFor="description"
								placeholder='Pensando no bem-estar de nossos colaboradores, a "CompanyName" implementou...'
								readOnly={isReadOnly}
								defaultValue={newsById?.body?.payload?.description}
								rows={5}
								register={form.register('description')}
								error={errors.description != null}
								message={errors?.description?.message}
							/>
						)}

						<div className="w-full flex flex-col relative">
							<Textfield
								type="text"
								label="Sessão:"
								id="flag_name"
								htmlFor={`${isReadOnly ? '' : 'flag_name'}`}
								autoComplete="off"
								placeholder="Selecione uma opção"
								onChange={(e) => setSearchedFlag({ ...searchedFlag, name: e.target.value })}
								onFocus={() => handleFocus(setIsFlagsListVisible)}
								onBlur={() => handleBlur(setIsFlagsListVisible)}
								readOnly={isReadOnly}
								defaultValue={newsById?.body?.payload?.flag.name}
								register={form.register('flag_name')}
								error={errors.flag_name != null}
								message={errors?.flag_name?.message}
								className={`${isReadOnly ? 'pointer-events-none' : ''}`}
							/>

							{isFlagsListVisible && !isReadOnly && (
								<FlagsDropdown filteredFlagsList={filteredFlagsList} handleSelectedFlag={handleSelectedFlag} />
							)}
						</div>

						{!isReadOnly && (
							<div
								className={`w-full file-inputs mt-2 rounded duration-150 bg-gray7 hover:bg-gray8 ${isReadOnly ? 'pointer-events-none' : ''}`}
							>
								<Textfield
									id="avatar"
									type="file"
									label={
										<span className="flex items-center gap-1 font-medium">
											<CloudUpload size={18} /> Atualizar imagem
										</span>
									}
									htmlFor="avatar"
									placeholder="Avatar"
									register={form.register('avatar')}
									error={errors.avatar != null}
									message={errors?.avatar?.message}
									className={`${isReadOnly} pointer-events-none`}
								/>
							</div>
						)}

						{allowedManagementNews && isReadOnly && (
							<Button className="mt-4" description="Editar" onClick={() => setIsReadeOnly(!isReadOnly)} />
						)}

						{!isReadOnly && (
							<div className="flex gap-2 mt-4">
								<Button
									className="w-full"
									type="submit"
									disabled={isPending}
									description={isPending ? <Spinner /> : 'Salvar Alterações'}
								/>

								<Button
									className="w-full text-black9 border-2 border-gray8 bg-gray7 hover:border-2 hover:border-black9"
									description="Cancelar"
									onClick={() => setIsReadeOnly(!isReadOnly)}
								/>
							</div>
						)}
					</form>

					<ExplainNews
						avatar={newsById?.body?.payload?.avatar as string}
						title={newsById?.body?.payload?.title}
						newsRegister={newsRegister}
					/>
				</div>
			</main>
		)
}
