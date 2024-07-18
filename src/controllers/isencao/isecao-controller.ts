import { BadRequestError } from "@/_errors/bad-request-error";
import { listIsencaoModel } from "@/models/isencao/list-isencao-model";
import { auth } from "@/routes/middlewares/auth";
import { getError } from "@/utils/error-utils";
import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function listIsencaoController(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
        'list',
        {
            schema:{
                tags: ["isencao"],
                summary: "Listar isencao",
                security: [{ bearerAuth: [] }],
                response:{
                    200:z.any({
                        // id: z.number(),
                        // codIsencao:z. string(),
                        // mencaoConstarDoc: z.string(), 
                        // normaAplicavel: z.string(),
                        // description: z.string(),
                        // regimeGeral: z.boolean(),
                        // regimeTransitorio: z.boolean(),
                        // regimeNaoSujeicao: z.boolean(),
                        // status: z.boolean(),
                        // createdAt: z.date(),
                        // updatedAt: z.date(),
                    })
                }
            }
        },
        async (reaponse,reply) => {
            try {
                const isencao = await listIsencaoModel()
                return reply.status(200).send(isencao)
            } catch (error) {
                const { message } = getError(error)
                throw new BadRequestError(message)
            }
        }
    )
    
}