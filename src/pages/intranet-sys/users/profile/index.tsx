import { Link, useParams } from 'react-router-dom'

import { getUserById } from '~/api/users-requests'
import { dateFormatter, pageTitle } from '~/helpers'

import { CloudUpload } from '~/assets'
import { RequestError, Spinner, Textfield, Title } from '~/components'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export const Profile = () => {
	// TODO: Implementar readOnly - Ficará igual o gerenciamento da notícia
	const [isReadOnly, setIsReadeOnly] = useState(true)
	pageTitle(`${isReadOnly ? 'Perfil Detalhe' : 'Perfil Edição'}`)

	const params = useParams()

	const { data, isPending, isError, isSuccess } = useQuery({
		queryKey: [`users-${params.id}`],
		queryFn: () => getUserById(String(params.id)),
	})

	if (isPending) return <Spinner />
	if (isError) return <RequestError />

	if (isSuccess)
		return (
			<main className="w-full max-w-[1000px] flex gap-10">
				<aside className="w-full max-w-[260px] overflow-x-hidden overflow-y-auto p-2 rounded-lg bg-gray8">
					<ul className="flex flex-col gap-2">
						<li>
							<Link to="/sistemas/registro-de-ponto" className="flex text-[15px] py-2 px-4 rounded-lg bg-gray7">
								Registro de Ponto
							</Link>
						</li>
						<li>
							<Link
								to={`/sistemas/chamados/usuario/${data?.body?.payload?.id}`}
								className="flex text-[15px] py-2 px-4 rounded-lg bg-gray7"
							>
								Meus Chamados
							</Link>
						</li>
						<li>
							<Link
								to={`/sistemas/compras/usuario/${data?.body?.payload?.id}`}
								className="flex text-[15px] py-2 px-4 rounded-lg bg-gray7"
							>
								Solicitações de Compras
							</Link>
						</li>
						<li>
							<Link
								to={`/usuarios/${data?.body?.payload?.id}/alterar-minha-senha`}
								className="flex text-[15px] py-2 px-4 rounded-lg bg-gray7"
							>
								Alterar Senha
							</Link>
						</li>
					</ul>
				</aside>

				<section className="flex flex-col items-start gap-6">
					<div className="flex items-center gap-4">
						{data?.body?.payload?.avatar ? (
							<img
								src={data?.body?.payload?.avatar}
								alt={data?.body?.payload?.name.split(' ')[0]}
								title={data?.body?.payload?.name.split(' ')[0]}
							/>
						) : (
							<div className="w-full file-inputs px-4 rounded duration-150 bg-gray7 hover:bg-gray8">
								<Textfield
									id="avatar"
									type="file"
									label={
										<span className="flex flex-col items-center gap-1 font-medium">
											<CloudUpload size={40} /> Inserir uma foto
										</span>
									}
									htmlFor="avatar"
									placeholder="Avatar"
									// register={register('avatar')}
									// error={errors.avatar != null}
									// message={errors?.avatar?.message}
								/>
							</div>
						)}
						<div className="flex flex-col">
							<Textfield
								id="name"
								type="text"
								htmlFor="name"
								placeholder="Benefício de Seguro de Vida para Todos"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.name}
								// register={register('name')}
								// error={errors.name != null}
								// message={errors?.name?.message}
							/>
							<div className="flex gap-1">
								{/* TODO: PRECISA CRIAR UMA COLUNA NO BANCO E NÃO USAR O CREATED_AT */}
								<span>Admissão:</span>
								<span>
									{data?.body?.payload?.created_at !== undefined
										? dateFormatter.format(new Date(data?.body?.payload?.created_at))
										: 'A Definir'}
								</span>
							</div>
						</div>
					</div>

					<div className="w-full flex flex-col gap-2">
						<Title title="Overview" className="text-start text-lg font-semibold" />

						<div>
							<div className="w-full flex justify-between">
								<span>Ocupação: A definir</span>
								<span>Departamento: {data?.body?.payload?.department.name}</span>
							</div>

							<div>
								<span>Permissões:</span>

								<div className="w-full h-screen max-h-[90px] overflow-hidden overflow-y-auto p-2 rounded-lg bg-gray7">
									{data?.body?.payload?.profile.permissions
										.sort((a, b) => a.permission.localeCompare(b.permission))
										.map((p) => {
											return (
												<p key={p.id}>
													🢝 <strong className="font-semibold">{p.permission}</strong> -{' '}
													<span className="text-sm">{p.description}</span>
												</p>
											)
										})}
								</div>
							</div>
						</div>
					</div>

					<div className="w-full flex flex-col">
						<Title title="Contato" className="text-start text-lg font-semibold" />

						<div className="w-full flex justify-between gap-4">
							<Textfield
								id="contact"
								type="text"
								label="Contato:"
								htmlFor="contact"
								placeholder="(11) 91234-5678"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.contact}
								// register={register('contact')}
								// error={errors.contact != null}
								// message={errors?.contact?.message}
							/>

							<Textfield
								id="email"
								type="text"
								label="E-mail:"
								htmlFor="email"
								placeholder="exemplo@email.com"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.email}
								// register={register('email')}
								// error={errors.email != null}
								// message={errors?.email?.message}
							/>
						</div>
					</div>

					<div className="w-full flex flex-col">
						<Title title="Acessos" className="text-start text-lg font-semibold" />

						<div className="w-full flex justify-between gap-4">
							<Textfield
								id="registration"
								type="text"
								label="Matrícula:"
								htmlFor="registration"
								placeholder="00123"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.registration}
								// register={register('registration')}
								// error={errors.registration != null}
								// message={errors?.registration?.message}
							/>

							<Textfield
								id="active"
								type="text"
								label="Status:"
								htmlFor="active"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.active === true ? 'Ativo' : 'Não ativo'}
								// register={register('active')}
								// error={errors.active != null}
								// message={errors?.active?.message}
							/>
						</div>
					</div>

					<div>
						<Title title="Informações de Endereço" className="text-start text-lg font-semibold" />

						<div className="w-full grid grid-cols-3 gap-2">
							<Textfield
								id="street"
								type="text"
								label="Rua:"
								htmlFor="street"
								placeholder="Av. Exemplo"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.address.street}
								// register={register('street')}
								// error={errors.street != null}
								// message={errors?.street?.message}
							/>

							<Textfield
								id="number"
								type="text"
								label="Número:"
								htmlFor="number"
								placeholder="567"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.address.number}
								// register={register('number')}
								// error={errors.number != null}
								// message={errors?.number?.message}
							/>

							<Textfield
								id="neighborhood"
								type="text"
								label="Bairro:"
								htmlFor="neighborhood"
								placeholder="Jardim Tal"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.address.neighborhood}
								// register={register('neighborhood')}
								// error={errors.neighborhood != null}
								// message={errors?.neighborhood?.message}
							/>

							<Textfield
								id="city"
								type="text"
								label="Cidade:"
								htmlFor="city"
								placeholder="São Paulo"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.address.city}
								// register={register('city')}
								// error={errors.city != null}
								// message={errors?.city?.message}
							/>

							<Textfield
								id="state"
								type="text"
								label="Estado:"
								htmlFor="state"
								placeholder="São Paulo"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.address.state}
								// register={register('state')}
								// error={errors.state != null}
								// message={errors?.state?.message}
							/>

							<Textfield
								id="cep"
								type="text"
								label="CEP:"
								htmlFor="cep"
								placeholder="00000-000"
								readOnly={isReadOnly}
								defaultValue={data?.body?.payload?.address.cep}
								// register={register('cep')}
								// error={errors.cep != null}
								// message={errors?.cep?.message}
							/>

							<Textfield
								id="complement"
								type="text"
								label="Complemento:"
								htmlFor="complement"
								placeholder="Próximo ao local tal"
								readOnly={isReadOnly}
								defaultValue={
									data?.body?.payload?.address.complement ? data?.body?.payload?.address.complement : 'A definir'
								}
								// register={register('complement')}
								// error={errors.complement != null}
								// message={errors?.complement?.message}
							/>
						</div>
					</div>
				</section>
			</main>
		)
}
