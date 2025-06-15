import type { AxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useNotification } from '~/contexts'
import { signIn } from '~/api/users-requests'
import { api } from '~/api/config'
import { useGeneralStates } from '~/hooks'
import { config, pageTitle, responseStatus } from '~/helpers'
import { validateSignInSchema } from '~/validators'
import type { SignInFormBody } from '~/@types'

import { Title, Textfield, Button, Spinner } from '~/components'
import { EyeOff, Eye } from '~/assets'

export const SignIn = () => {
	pageTitle('Entrar')
	const navigate = useNavigate()
	const { activateNotifications } = useNotification()

	const form = useForm<SignInFormBody>({
		resolver: zodResolver(validateSignInSchema),
	})
	const {
		formState: { errors },
	} = form

	const { mutate, isPending } = useMutation({
		mutationFn: signIn,
		onSuccess: (data) => {
			localStorage.setItem(config.LOCAL_STORAGE_TOKEN, JSON.stringify(data?.body?.payload?.token as string))
			api.defaults.headers.common.Authorization = `Bearer ${data?.body?.payload?.token}`

			activateNotifications()
			navigate('/')
		},
		onError: (error: AxiosError) => responseStatus(error),
	})

	const onSubmit: SubmitHandler<SignInFormBody> = (data) => mutate(data)

	const { passwordState, handleShowPassword } = useGeneralStates()

	return (
		<main className="w-full max-w-[500px]">
			<Title title="Entrar" className="mb-8" />

			<form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
				<Textfield
					id="registration"
					type="text"
					label="Matrícula:"
					htmlFor="registration"
					placeholder="Sua matrícula"
					register={form.register('registration')}
					error={errors.registration != null}
					message={errors?.registration?.message}
				/>

				<Textfield
					id="password"
					type={passwordState ? 'text' : 'password'}
					label="Senha:"
					htmlFor="password"
					placeholder="Sua senha"
					register={form.register('password')}
					error={errors.password != null}
					message={errors?.password?.message}
				>
					<button type="button" onClick={handleShowPassword} className="flex text-2xl bg-none cursor-pointer">
						{passwordState ? <EyeOff /> : <Eye />}
					</button>
				</Textfield>

				<Button
					type="submit"
					disabled={isPending}
					className="w-full mt-6 py-2"
					description={isPending ? <Spinner /> : 'Entrar'}
				/>

				<p className="flex justify-center gap-1 mt-2">
					Esqueceu sua senha?
					<Link to="/usuarios/recuperacao-de-senha" className="font-medium hover:underline">
						Clique aqui
					</Link>
				</p>
			</form>
		</main>
	)
}
