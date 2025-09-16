import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { createIncident } from '~/api/incidents-requests'
import { getDepartments } from '~/api/departments-requests'
import { handleBlur, handleFocus, pageTitle, responseStatus } from '~/helpers'

import type { CreateIncidentsBody, GetDepartmentResponse } from '~/@types'
import { validateCreateIncidentsSchema } from '~/validators'

import { Title, Textfield, Textarea, FileUpload, Spinner, Button, RequestError } from '~/components'

type IncidentCategory = {
	id: string
	name: string
	description: string
}

export const IncidentsCreate = () => {
	pageTitle('Cadastro de Chamados')

	const navigate = useNavigate()

	const form = useForm<CreateIncidentsBody>({
		resolver: zodResolver(validateCreateIncidentsSchema),
	})
	const {
		formState: { errors },
	} = form

	const {
		data: departments,
		isPending: dptIsPending,
		isError: dptIsError,
		isSuccess: dptIsSuccess,
	} = useQuery({
		queryKey: ['departments'],
		queryFn: getDepartments,
	})

	const [searchedDepartment, setSearchedDepartment] = useState<GetDepartmentResponse>()
	const [isDepartmentsListVisible, setIsDepartmentsListVisible] = useState<boolean>(false)

	const [searchedCategory, setSearchedCategory] = useState<IncidentCategory | null>()
	const [isCategoriesListVisible, setIsCategoriesListVisible] = useState<boolean>(false)

	const filteredDepartmentsList = departments?.body?.payload?.filter((item) =>
		item.name.toLowerCase().includes(searchedDepartment?.name?.toLowerCase() || ''),
	)

	const handleSelectedDepartment = (department: GetDepartmentResponse) => {
		setSearchedDepartment(department)
		setSearchedCategory(null)
		form.setValue('department_name', String(department.name))
		setIsDepartmentsListVisible(false)
	}

	const filteredCategoriesList = (searchedDepartment?.incidentCategories || []).filter((category) =>
		category.name?.toLowerCase().includes(searchedCategory?.name?.toLowerCase() || ''),
	)

	const handleSelectedCategory = (category: IncidentCategory) => {
		setSearchedCategory(category)
		form.setValue('category_name', String(category.name))
		setIsCategoriesListVisible(false)
	}

	const [files, setFiles] = useState<File[]>([])
	const [isDragging, setIsDragging] = useState(false)

	const { mutate, isPending } = useMutation({
		mutationFn: createIncident,
		onSuccess: () => {
			toast.success('Chamado criado. Você será redirecionado.')
			const changeNavigation = () => navigate('/sistemas/chamados')
			setTimeout(changeNavigation, 2500)
		},
		onError: (error: AxiosError) => responseStatus(error),
	})

	const onSubmit: SubmitHandler<CreateIncidentsBody> = async (data) => mutate(data)

	if (dptIsPending) return <Spinner />
	if (dptIsError) return <RequestError />

	if (!dptIsPending && !dptIsError && dptIsSuccess)
		return (
			<main className="w-full max-w-[900px] flex flex-col items-center">
				<Title title="Cadastro de Chamados" />
				<p className="mb-10">Após o registro, o chamado aparecerá na lista de chamados registrados por você 💬</p>

				<form className="w-full max-w-[580px] flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
					<Textfield
						id="title"
						type="text"
						label="Título:"
						htmlFor="title"
						placeholder="Grampeadores para Compliance"
						register={form.register('title')}
						error={errors.title != null}
						message={errors?.title?.message}
					/>

					<div className="w-full flex flex-col relative">
						<Textfield
							type="text"
							label="Qual departamento deve atender?"
							id="department_name"
							htmlFor="department_name"
							value={searchedDepartment?.name || ''}
							autoComplete="off"
							onChange={(e) => {
								if (!searchedDepartment) return
								setSearchedDepartment({ ...searchedDepartment, name: e.target.value })
							}}
							onFocus={() => handleFocus(setIsDepartmentsListVisible)}
							onBlur={() => handleBlur(setIsDepartmentsListVisible)}
							placeholder="Selecione uma opção"
							register={form.register('department_name')}
							error={errors.department_name != null}
							message={errors?.department_name?.message}
						/>

						{isDepartmentsListVisible && (
							<div className="w-full h-[100vh] max-h-[130px] absolute top-[5rem] left-0 z-10 flex flex-col gap-1 overflow-hidden shadow-sm hover:overflow-auto no-scrollbar rounded-md bg-gray7">
								{filteredDepartmentsList && filteredDepartmentsList.length > 0 ? (
									filteredDepartmentsList.map((department) => (
										<span
											key={department.id}
											onClick={() => handleSelectedDepartment(department)}
											className="text-sm py-2 px-4 cursor-pointer duration-150 hover:bg-gray8"
										>
											{department.name}
										</span>
									))
								) : (
									<span className="text-sm py-2 px-4 text-gray-500">Sem resultados na busca 💬</span>
								)}
							</div>
						)}
					</div>

					<div className="w-full flex flex-col relative">
						<Textfield
							type="text"
							label="Categoria de especificação:"
							id="category_name"
							htmlFor="category_name"
							value={searchedCategory?.name || ''}
							autoComplete="off"
							onChange={(e) => {
								if (!searchedCategory) return
								setSearchedCategory({ ...searchedCategory, name: e.target.value })
							}}
							onFocus={() => handleFocus(setIsCategoriesListVisible)}
							onBlur={() => handleBlur(setIsCategoriesListVisible)}
							placeholder="Selecione uma opção"
							register={form.register('category_name')}
							error={errors.category_name != null}
							message={errors?.category_name?.message}
						/>

						{isCategoriesListVisible && (
							<div className="w-full h-[100vh] max-h-[130px] absolute top-[5rem] left-0 z-10 flex flex-col gap-1 overflow-hidden shadow-sm hover:overflow-auto no-scrollbar rounded-md bg-gray7">
								{searchedDepartment?.id ? (
									filteredCategoriesList.length > 0 ? (
										filteredCategoriesList.map((category) => (
											<span
												key={category.id}
												onClick={() => handleSelectedCategory(category)}
												className="text-sm py-2 px-4 cursor-pointer duration-150 hover:bg-gray8"
											>
												{category.name}
											</span>
										))
									) : (
										<span className="text-sm py-2 px-4 text-gray-500">Sem resultados na busca 💬</span>
									)
								) : (
									<span className="text-sm py-2 px-4 text-gray-500">Primeiro, selecione o departamento 💬</span>
								)}
							</div>
						)}
					</div>

					<Textarea
						id="description"
						label="Descrição:"
						htmlFor="description"
						placeholder="Descreva em poucas palavras sobre a necessidade do chamado ..."
						rows={4}
						register={form.register('description')}
						error={errors.description != null}
						message={errors?.description?.message}
					/>

					<FileUpload
						files={files}
						onFileChange={(newFiles) => {
							setFiles(newFiles)
							form.setValue('avatar', newFiles)
						}}
						isDragging={isDragging}
						setIsDragging={setIsDragging}
					/>

					<div className="w-full flex items-center gap-2 mt-4">
						<Button
							className="w-full"
							type="submit"
							disabled={isPending}
							description={isPending ? <Spinner /> : 'Cadastrar'}
						/>

						<Button className="w-full" description="Cancelar" />
					</div>
				</form>
			</main>
		)
}
