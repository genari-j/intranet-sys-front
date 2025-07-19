import { useState } from 'react'

import { pageTitle } from '~/helpers'

import { Title } from '~/components'

export const FAQ = () => {
	pageTitle('FAQ')

	const faqData = [
		{
			id: 1,
			question: 'Como posso resetar minha senha?',
			answer:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non deserunt esse cumque excepturi minima qui distinctio. Consequuntur commodi repellat tempora dignissimos quis consectetur obcaecati qui eius ipsa, veniam harum laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae fuga quia molestias sint! Obcaecati rem provident animi necessitatibus inventore ea iure id quae, ipsam quos perferendis vel numquam. Alias, et. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sit, quaerat exercitationem libero aperiam sapiente! Sit nemo velit libero ratione iusto accusamus eius, dolor vitae excepturi molestias officia, cupiditate nam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint dolorem quia fuga, neque impedit sequi optio, itaque inventore qui architecto nulla, ipsa quod ex nobis. Deleniti recusandae impedit molestias eveniet. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat molestias accusamus unde eum voluptatum veniam necessitatibus, consequatur assumenda quas, illo consequuntur, nam accusantium commodi provident nesciunt! Corrupti ducimus commodi ipsam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum tenetur qui tempore. Veniam harum et, quis velit, corporis, voluptatem ratione expedita cupiditate minima accusantium nam. Natus perferendis quasi ipsam iure. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora rem necessitatibus corporis nostrum voluptate! Atque, nostrum maiores. Placeat accusantium reiciendis nam. Odio saepe provident repellat dolore labore dolores necessitatibus molestias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magnam hic fugit doloremque eaque obcaecati similique fugiat aliquid! Itaque, in recusandae eius explicabo unde non minima laboriosam impedit a minus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Non deserunt esse cumque excepturi minima qui distinctio. Consequuntur commodi repellat tempora dignissimos quis consectetur obcaecati qui eius ipsa, veniam harum laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae fuga quia molestias sint! Obcaecati rem provident animi necessitatibus inventore ea iure id quae, ipsam quos perferendis vel numquam. Alias, et. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sit, quaerat exercitationem libero aperiam sapiente! Sit nemo velit libero ratione iusto accusamus eius, dolor vitae excepturi molestias officia, cupiditate nam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint dolorem quia fuga, neque impedit sequi optio, itaque inventore qui architecto nulla, ipsa quod ex nobis. Deleniti recusandae impedit molestias eveniet. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat molestias accusamus unde eum voluptatum veniam necessitatibus, consequatur assumenda quas, illo consequuntur, nam accusantium commodi provident nesciunt! Corrupti ducimus commodi ipsam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum tenetur qui tempore. Veniam harum et, quis velit, corporis, voluptatem ratione expedita cupiditate minima accusantium nam. Natus perferendis quasi ipsam iure. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora rem necessitatibus corporis nostrum voluptate! Atque, nostrum maiores. Placeat accusantium reiciendis nam. Odio saepe provident repellat dolore labore dolores necessitatibus molestias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto magnam hic fugit doloremque eaque obcaecati similique fugiat aliquid! Itaque, in recusandae eius explicabo unde non minima laboriosam impedit a minus!',
		},
		{
			id: 2,
			question: 'Onde encontro meus dados de faturamento?',
			answer: 'Seus dados de faturamento estão disponíveis em Perfil > Faturamento.',
		},
		{
			id: 3,
			question: 'Posso mudar meu plano a qualquer momento?',
			answer: 'Sim, você pode alterar seu plano na seção "Assinatura" da sua conta.',
		},
		{
			id: 4,
			question: 'Posso mudar meu plano a qualquer momento?',
			answer: 'Sim, você pode alterar seu plano na seção "Assinatura" da sua conta.',
		},
		{
			id: 5,
			question: 'Posso mudar meu plano a qualquer momento?',
			answer: 'Sim, você pode alterar seu plano na seção "Assinatura" da sua conta.',
		},
		{
			id: 6,
			question: 'Posso mudar meu plano a qualquer momento?',
			answer: 'Sim, você pode alterar seu plano na seção "Assinatura" da sua conta.',
		},
		{
			id: 7,
			question: 'Posso mudar meu plano a qualquer momento?',
			answer: 'Sim, você pode alterar seu plano na seção "Assinatura" da sua conta.',
		},
		{
			id: 8,
			question: 'Posso mudar meu plano a qualquer momento?',
			answer: 'Sim, você pode alterar seu plano na seção "Assinatura" da sua conta.',
		},
		{
			id: 9,
			question: 'Posso mudar meu plano a qualquer momento?',
			answer: 'Sim, você pode alterar seu plano na seção "Assinatura" da sua conta.',
		},
		{
			id: 10,
			question: 'Posso mudar meu plano a qualquer momento?',
			answer: 'Sim, você pode alterar seu plano na seção "Assinatura" da sua conta.',
		},
		{
			id: 11,
			question: 'Posso mudar meu plano a qualquer momento?',
			answer: 'Sim, você pode alterar seu plano na seção "Assinatura" da sua conta.',
		},
	]

	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const toggleQuestion = (index: number) => setOpenIndex(openIndex === index ? null : index)

	return (
		<main className="w-full max-w-[900px] flex justify-center">
			<div className="w-full flex flex-col gap-10">
				<Title title="Perguntas Frequentes" />

				<div className="flex flex-col gap-4">
					{faqData.map((item, index) => {
						const isOpen = openIndex === index

						return (
							<div
								key={item.id}
								className="overflow-hidden transition-all duration-300 cursor-pointer shadow-md rounded-lg"
								onClick={() => toggleQuestion(index)}
							>
								<div className="w-full flex justify-between items-center p-4 rounded-lg bg-gray7">
									<span className="font-medium">
										{index + 1}. {item.question}
									</span>
									<span
										className={`transform transition-transform duration-300 text-2xl ${isOpen ? 'rotate-45' : 'rotate-0'}`}
									>
										+
									</span>
								</div>

								<div
									className={`grid transition-all duration-300 px-4 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pt-5 pb-4' : 'grid-rows-[0fr] opacity-0'}`}
								>
									<div className="overflow-hidden text-gray-700">{item.answer}</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</main>
	)
}
