import type { AxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { createNew, getNewsFlags } from '~/api'
import { newsRegister, pageTitle, responseStatus, handleBlur, handleFocus } from '~/helpers'
import { validateCreateNewsSchema } from '~/validators'
import type { CreateNewsBody } from '~/@types'

import { CloudUpload } from '~/assets'
import { Textfield, Textarea, Button, Spinner, Title } from '~/components'

interface SelectedItem {
	id?: string
	name?: string
}

export const NewsCreate = () => {
	pageTitle('Cadastro de Notícias')
	const navigate = useNavigate()

	const form = useForm<CreateNewsBody>({
		resolver: zodResolver(validateCreateNewsSchema),
	})
	const {
		formState: { errors },
	} = form

	const { mutate, isPending } = useMutation({
		mutationFn: createNew,
		onSuccess: () => {
			toast.success('Notícia criada. Você será redirecionado.')
			const changeNavigation = () => navigate('/')
			setTimeout(changeNavigation, 2500)
		},
		onError: (error: AxiosError) => responseStatus(error),
	})

	const onSubmit: SubmitHandler<CreateNewsBody> = async (data) => mutate(data)

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
		form.setValue('flag_name', String(flag.name))

		setSearchedFlag(flag)
		setIsFlagsListVisible(false)
	}

	return (
		<main className="w-full max-w-[900px] flex flex-col items-start">
			<Title title="Cadastro de Notícias" />
			<p className="mb-6">Ao cadastrar novas notícias, se atente ao selecionar em qual sessão ela deve aparecer 💬</p>

			<div className="flex gap-10">
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[580px] flex flex-col gap-2">
					<Textfield
						id="title"
						type="text"
						label="Título:"
						htmlFor="title"
						placeholder="Benefício de Seguro de Vida para Todos"
						register={form.register('title')}
						error={errors.title != null}
						message={errors?.title?.message}
					/>

					<Textarea
						id="description"
						label="Descrição:"
						htmlFor="description"
						placeholder='Pensando no bem-estar de nossos colaboradores, a "CompanyName" implementou...'
						rows={5}
						register={form.register('description')}
						error={errors.description != null}
						message={errors?.description?.message}
					/>

					<div className="w-full flex flex-col relative">
						<Textfield
							type="text"
							label="Sessão:"
							id="flag_name"
							htmlFor="flag_name"
							value={searchedFlag.name || ''}
							autoComplete="off"
							onChange={(e) => setSearchedFlag({ ...searchedFlag, name: e.target.value })}
							onFocus={() => handleFocus(setIsFlagsListVisible)}
							onBlur={() => handleBlur(setIsFlagsListVisible)}
							placeholder="Selecione uma opção"
							register={form.register('flag_name')}
							error={errors.flag_name != null}
							message={errors?.flag_name?.message}
						/>

						{isFlagsListVisible && (
							<div className="w-full h-[100vh] max-h-[130px] absolute top-[5rem] left-0 z-10 flex flex-col gap-1 overflow-hidden hover:overflow-auto no-scrollbar rounded-md bg-gray7">
								{filteredFlagsList && filteredFlagsList.length > 0 ? (
									filteredFlagsList.map((flag) => (
										<span
											key={flag.id}
											onClick={() => handleSelectedFlag(flag)}
											className="text-sm py-2 px-4 cursor-pointer duration-150 hover:bg-gray8"
										>
											{flag.name}
										</span>
									))
								) : (
									<span className="text-sm py-2 px-4 text-gray-500">Sem resultados na busca 💬</span>
								)}
							</div>
						)}
					</div>

					<div className="w-full file-inputs mt-2 rounded duration-150 bg-gray7 hover:bg-gray8">
						<Textfield
							id="avatar"
							type="file"
							label={
								<span className="flex items-center gap-1 font-medium">
									<CloudUpload size={18} /> Inserir uma foto
								</span>
							}
							htmlFor="avatar"
							placeholder="Avatar"
							register={form.register('avatar')}
							error={errors.avatar != null}
							message={errors?.avatar?.message}
						/>
					</div>

					<Button
						className="mt-4"
						type="submit"
						disabled={isPending}
						description={isPending ? <Spinner /> : 'Cadastrar'}
					/>
				</form>

				<div className="flex flex-col gap-4 mt-6">
					<h3 className="font-medium">Explicação Sessões:</h3>

					{newsRegister.map((newExplain) => {
						return (
							<div key={newExplain.id}>
								<h3 className="font-medium italic">{newExplain.title}:</h3>
								<p className="text-sm">{newExplain.description}</p>
							</div>
						)
					})}
				</div>
			</div>
		</main>
	)
}
