import { z } from 'zod'

export const validateCreateNewsSchema = z.object({
	title: z.string().min(1, 'Título inválido'),
	description: z.string().min(1, 'Descrição inválida'),
	flag_name: z.string().min(1, 'Sessão inválida'),
	avatar: z.instanceof(FileList).optional(),
})

export const validateUpdateNewsSchema = z.object({
	title: z.string().min(1, 'Título inválido'),
	description: z.string().min(1, 'Descrição inválida'),
	flag_name: z.string().min(1, 'Sessão inválida'),
	avatar: z.instanceof(FileList).optional(),
})
