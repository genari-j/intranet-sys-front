import { z } from 'zod'

export const validateCreateIncidentsSchema = z.object({
	title: z.string().min(1, 'Título inválido'),
	description: z.string().min(1, 'Descrição inválida'),
	department_name: z.string().min(1, 'Departamento atendente inválido'),
	category_name: z.string().min(1, 'Categoria inválida'),
	avatar: z
		.any()
		.refine((val) => Array.isArray(val) && val.every((v) => v instanceof File), {
			message: 'Selecione pelo menos um arquivo válido.',
		})
		.optional(),
})
