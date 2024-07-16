import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { armazem } from '@/controllers/armazem'
import { requestPasswordRecover } from '@/controllers/auth/request-password-recover'
import { reset } from '@/controllers/auth/reset-password'
import { auth } from '@/controllers/auth/sign-in'
import { banco } from '@/controllers/banco'
import { carreira } from '@/controllers/carreira'
import { categoria } from '@/controllers/categoria'
import { category } from '@/controllers/category'
import { cliente } from '@/controllers/client'
import { competencia } from '@/controllers/competencia'
import { departamento } from '@/controllers/departamento'
import { formacao } from '@/controllers/formacao'
import { fornecedor } from '@/controllers/fornecedor'
import { funcao } from '@/controllers/função'
import { funcionario } from '@/controllers/funcionario'
import { helpers } from '@/controllers/helpers'
import { loja } from '@/controllers/loja'
import { organization } from '@/controllers/organization'
import { permission } from '@/controllers/permission'
import { role } from '@/controllers/role'
import { subCarreira } from '@/controllers/subcarreira'
import { subcategory } from '@/controllers/subcategory '
import { unity } from '@/controllers/unity'
import { getProfile } from '@/controllers/user/get-user-profile-controller'
import { users } from '@/controllers/users'

// import { seedAccounts } from 'prisma/seeds/account.seed'
// import { seedClasse } from 'prisma/seeds/class.seed'
// import { seedImpost } from 'prisma/seeds/impost-type.seed'
// import { seedIsencao } from 'prisma/seeds/isencao.seed'
// import { seedSubContas } from 'prisma/seeds/sub-conta.seed'
import { errorHandler } from './error-handler'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Commerce Module',
      description: 'Fastify backed-end module for Tecno Bantu.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})
app.register(import('@fastify/swagger-ui'), {
  routePrefix: '/docs',
})
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET ?? 'JWT_SECRET',
})

app.register(fastifyCors)
app.register(auth)
app.register(reset)
app.register(requestPasswordRecover)

// user routes
app.register(getProfile)
app.register(users, {
  prefix: '/user',
})

app.register(organization, {
  prefix: '/organization',
})

app.register(unity, {
  prefix: '/unity',
})

app.register(category, { prefix: '/category' })
app.register(subcategory, { prefix: '/subcategory' })

app.register(loja, {
  prefix: '/loja',
})

app.register(armazem, {
  prefix: '/armazem',
})

app.register(role, {
  prefix: '/role',
})

app.register(permission, {
  prefix: '/permission',
})

app.register(cliente, {
  prefix: '/cliente',
})

app.register(fornecedor, {
  prefix: '/fornecedor',
})

app.register(helpers, {
  prefix: '/helpers',
})

// RH routes

app.register(funcao, {
  prefix: '/funcao',
})

app.register(carreira, {
  prefix: '/carreira',
})

app.register(banco, {
  prefix: '/banco',
})

app.register(funcionario, {
  prefix: '/funcionario',
})
app.register(categoria, {
  prefix: '/categoria',
})

app.register(subCarreira, {
  prefix: '/subcarreira',
})

app.register(departamento, {
  prefix: '/departamento',
})

app.register(competencia, {
  prefix: '/competencia',
})

app.register(formacao, {
  prefix: '/formacao',
})

/*
await seedImpost()
await seedClasse()
await seedAccounts()
await seedSubContas()
await seedIsencao()
*/
app
  .listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then((e) => {
    console.log('🔥 HTTP server on port', e)
  })
