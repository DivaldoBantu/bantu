import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'

import { UnauthorizedError } from '../../_errors/unauthorized-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    const permissions = [
      'list permissions',

      'create role',
      'delete role',
      'update role',
      'list role',
      'read role',

      'create empresa',
      'delete empresa',
      'update empresa',
      'list empresa',
      'read empresa',

      'create user',
      'delete user',
      'update user',
      'list user',
      'read user',

      'create fornecedor',
      'delete fornecedor',
      'update fornecedor',
      'list fornecedor',
      'read fornecedor',

      'create carreira',
      'delete carreira',
      'read carreira',
      'list carreira',
      'update carreira',

      'create cliente',
      'delete cliente',
      'update cliente',
      'list cliente',
      'read cliente',

      'create unidade',
      'delete unidade',
      'update unidade',
      'list unidade',
      'read unidade',

      'create category',
      'delete category',
      'update category',
      'list category',
      'read category',

      'create categoria',
      'delete categoria',
      'update categoria',
      'list categoria',
      'read categoria',

      'create subcategory',
      'delete subcategory',
      'update subcategory',
      'list subcategory',
      'read subcategory',

      'create loja',
      'delete loja',
      'update loja',
      'list loja',
      'read loja',

      'create armazem',
      'delete armazem',
      'update armazem',
      'list armazem',
      'read armazem',

      'create funcao',
      'delete funcao',
      'update funcao',
      'list funcao',
      'read funcao',

      'create banco',
      'delete banco',
      'update banco',
      'list banco',
      'read banco',

      'create funcionario',
      'delete funcionario',
      'update funcionario',
      'list funcionario',
      'read funcionario',
    ]
    const permissionsFromDb = await prisma.permission.findMany({
      select: {
        slug: true,
      },
    })

    if (permissionsFromDb.length !== permissions.length) {
      permissions.map(async (teste) => {
        const exists = permissionsFromDb.some((result) => result.slug === teste)
        if (!exists) {
          console.log('new role add with slug', teste)
          await prisma.permission.create({
            data: {
              slug: createSlug(teste),
              description: teste,
            },
          })
        }
      })
    }

    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: number }>()

        return sub
      } catch {
        throw new UnauthorizedError('Token invalido')
      }
    }
    request.getUserPermission = async (id?: number) => {
      const userId = id ?? (await request.getCurrentUserId())

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      })

      if (!user) throw new UnauthorizedError(`User not founded.`)

      const permissions: { slug: string }[] = await prisma.$queryRaw`
      SELECT slug FROM permissions 
      WHERE id IN (
        SELECT permission_id
        FROM role_permissions 
        WHERE role_id IN (
          SELECT role_id 
          FROM user_profiles
          WHERE user_id = ${userId}
        )
      )
    `

      return {
        permissions,
        user,
      }
    }
    request.getUserRoles = async () => {
      const userId = await request.getCurrentUserId()

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      })

      if (!user) throw new UnauthorizedError(`User not founded.`)

      const roles: {
        id: number
        name: string
      }[] = await prisma.$queryRaw`
        SELECT name, id FROM roles 
            WHERE id IN (
              SELECT role_id
              FROM user_profiles 
              WHERE role_id IN (
                SELECT role_id 
                FROM user_profiles
                WHERE user_id = ${user.id}
              )
            )
         `

      return {
        roles,
      }
    }
    request.verifyPermission = async (permission: string) => {
      const { permissions, user } = await request.getUserPermission()

      const hasRequiredPermission = permissions.some(
        (per) => per.slug === permission,
      )
      if (!user.isSuperAdmin && !hasRequiredPermission) {
        throw new UnauthorizedError('Permissão Negada')
      }
    }
  })
})
