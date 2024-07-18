import { BadRequestError } from "@/_errors/bad-request-error";
import { listTipoDeImpostoModel } from "@/models/tipo-de-imposto/list-tipo-de-imposto-model";
import { auth } from "@/routes/middlewares/auth";
import { getError } from "@/utils/error-utils";
import type { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { string, z } from "zod";

export async function listTipoDeImpostoControll(app: FastifyInstance) {
    enum TipoAGT {
        IVA,
        IS,
        NS
    }



    app
        .withTypeProvider<ZodTypeProvider>()
        .register(auth)
        .get(
            'list', {
            schema: {
                tags: ["tipo de imposto"],
                summary: "Listar tipo de imposto",
                security: [{ bearerAuth: [] }],
                response: {
                    200: z.any({


                    })
                }
            }
        }, async (response, reply) => {
            try {
                const listtipoDeimposto = await listTipoDeImpostoModel()
                return reply.status(200).send(listtipoDeimposto)
            } catch (error) {
                const { message } = getError(error)
                throw new BadRequestError(message)
            }

        }
        )


}