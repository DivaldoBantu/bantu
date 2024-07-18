import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/_errors/bad-request-error'
import api from '@/lib/axios'
import { auth } from '@/routes/middlewares/auth'
import { getError } from '@/utils/error-utils'

export async function createFuncionario(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '',
      {
        schema: {
          tags: ['RH', 'Funcionario'],
          summary: 'Criar Funcionario',
          security: [{ bearerAuth: [] }],
          body: z.object({
            nome_completo: z.string()
              .min(8, { message: "O nome precisa ter no mínimo 8 caracteres!" }),
            nome_mae: z.string()
              .min(8, {
                message: "O nome precisa ter no mínimo 8 caracteres!",
              }),
            nome_pai: z.string()
              .min(8, {
                message: "O nome precisa ter no mínimo 8 caracteres!",
              }),
            nascimento: z.coerce.date(),
            email: z.string()
              .email("Formato de e-mail inválido"),
            genero: z.enum(["masculino", "feminino"]),
            tipo_identificacao: z.enum(["BI", "Passaporte", "Residente", "Outro"]),
            num_identificacao: z.string(),
            nivel_academico: z.enum([
              "Base",
              "Medio",
              "Universitario",
              "Licenciado",
              "Mestrado",
              "Doctoramento",
            ]),
            avatar: z.string().optional(),
            telefone1: z.string().min(9, {
              message: "O número de telefone precisa ter no mínimo 9 caracteres!",
            }),
            telefone2: z.string().min(9, {
              message: "O número de telefone precisa ter no mínimo 9 caracteres!",
            }).optional(),
            linkedin: z.string().optional(),
            whatsApp: z.string().optional(),
            instagram: z.string().optional(),
            bairro: z.string(),
            rua: z.string(),
            id_funcao: z.number({ message: "Este campo precisa receber um número!" })
              .int({ message: "O número deve ser inteiro!" })
              .positive({ message: "O número precisa ser positivo!" }),
            id_categoria: z.number({ message: "Este campo precisa receber um número!" })
              .int({ message: "O número deve ser inteiro!" })
              .positive({ message: "O número precisa ser positivo!" }),
            num_conta: z.string().optional(),
            iban: z.string().transform((iban) => {
              return "AOA" + iban.trim();
            }),
            Id_banco: z.number({ message: "Este campo precisa receber um número!" })
              .int({ message: "O número deve ser inteiro!" })
              .positive({ message: "O número precisa ser positivo!" }),
          }),
          response: {
            200: z.any(),
          },
        },
      },
      async (request, reply) => {
        await request.verifyPermission('create-funcionario')
        const body = request.body

        try {
          const { data } = await api.post('/funcionario', body)
          return reply.code(201).send(data)
        } catch (error) {
        console.log(error)
          const { message } = getError(error)
          throw new BadRequestError(message)
        }
      },
    )
}
