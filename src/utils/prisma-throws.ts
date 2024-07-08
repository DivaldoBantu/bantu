import { BadRequestError } from '@/_errors/bad-request-error'
import { prisma } from '@/lib/prisma'

class User {
  async find(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findError(id: number) {
    const user = await this.find(id)

    if (!user) return new BadRequestError('usuário não encontrado')
  }
}

class Role {
  async findById(id: number) {
    const role = await prisma.role.findUnique({
      where: {
        id,
      },
    })
    return role
  }

  async findByName(name: string) {
    const role = await prisma.role.findUnique({
      where: {
        name,
      },
    })
    return role
  }

  async findError(id: number) {
    const role = await this.findById(id)
    console.log(role)
    if (!role) throw new BadRequestError('role não encontrada')
  }

  async findErrorName(name: string) {
    const role = await this.findByName(name)

    if (!role) throw new BadRequestError('role não encontrada')
  }
}

class Permission {
  async find(id: number) {
    const permission = await prisma.permission.findUnique({
      where: {
        id,
      },
    })
    return permission
  }

  async findError(id: number) {
    const role = await this.find(id)
    if (!role) throw new BadRequestError('Permissão não encontrada')
  }
}

class Provincia {
  async find(id: number) {
    const provincia = await prisma.provincia.findUnique({
      where: {
        id,
      },
    })

    return provincia
  }

  async findError(id: number) {
    const provincia = await this.find(id)

    if (!provincia) throw new BadRequestError('provincia não encontrada')
    return provincia
  }
}

class Country {
  async find(id: number) {
    const country = await prisma.country.findUnique({
      where: {
        id,
      },
    })

    return country
  }

  async findError(id: number) {
    const country = await this.find(id)

    if (!country) throw new BadRequestError('Pais não encontrado')
    return country
  }

  async findByCode(code: string) {
    const country = await prisma.country.findUnique({
      where: {
        code,
      },
    })

    return country
  }

  async findByCodeError(code: string) {
    const country = await this.findByCode(code)
    if (!country) throw new BadRequestError('Pais não encontrado')
    return country
  }
}

class SubAccount {
  async find(id: number) {
    const account = await prisma.subAccount.findUnique({
      where: {
        id,
      },
    })

    return account
  }

  async findError(id: number) {
    const account = await this.find(id)

    if (!account) throw new BadRequestError('sub-conta não encontrado')
    return account
  }

  async findByNumero(numero: string) {
    const account = await prisma.subAccount.findUnique({
      where: {
        numero,
      },
    })
    return account
  }

  async findByNumeroError(code: string) {
    const account = await this.findByNumero(code)
    if (!account) throw new BadRequestError('sub-conta não encontrado')
    return account
  }
}

class Organization {
  async find(id: number) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findError(id: number) {
    const organization = await this.find(id)

    if (!organization) throw new BadRequestError('organization não encontrada')
  }
}

class Cliente {
  async find(id: number) {
    const client = await prisma.cliente.findUnique({
      where: {
        id,
      },
    })

    return client
  }

  async findError(id: number) {
    const client = await this.find(id)

    if (!client) throw new BadRequestError('cliente não encontrado')
  }
}

class Fornecedor {
  async find(id: number) {
    const fornecedor = await prisma.fornecedor.findUnique({
      where: {
        id,
      },
    })

    return fornecedor
  }

  async findError(id: number) {
    const fornecedor = await this.find(id)

    if (!fornecedor) throw new BadRequestError('fornecedor não encontrado')
  }
}


class Entidade {
  async find(id: number) {
    const fornecedor = await prisma.entidadeTerceiros.findUnique({
      where: {
        id,
      },
    })

    return fornecedor
  }

  async findError(id: number) {
    const fornecedor = await this.find(id)

    if (!fornecedor) throw new BadRequestError('fornecedor não encontrado')
  }
}

class Loja {
  async find(id: number) {
    const loja = await prisma.loja.findUnique({
      where: {
        id,
      },
    })

    return loja
  }

  async findError(id: number) {
    const loja = await this.find(id)

    if (!loja) throw new BadRequestError('Loja não encontrado')
  }
}

class Armazem {
  async find(id: number) {
    const armazem = await prisma.armazem.findUnique({
      where: {
        id,
      },
    })

    return armazem
  }

  async findError(id: number) {
    const armazem = await this.find(id)

    if (!armazem) throw new BadRequestError('Armazem não encontrado')
  }
}

export const Prisma = {
  user: new User(),
  role: new Role(),
  provincia: new Provincia(),
  country: new Country(),
  organization: new Organization(),
  client: new Cliente(),
  permission: new Permission(),
  loja: new Loja(),
  armazem: new Armazem(),
  fornecedor: new Fornecedor(),
  entidade: new Entidade(),
  subAccount: new SubAccount(),
}
