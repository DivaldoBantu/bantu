import type { FastifyReply, FastifyRequest } from 'fastify'

export interface carreira {
  id: number
  nome_carreira: string
  regime: string
  createdAt: Date
  updatedAt: Date
}

export interface app {
  request: FastifyRequest
  reply: FastifyReply
}

export interface entidade {
  id?: number
  name: string
  tipo: 'SINGULAR' | 'COLECTIVO'
  identificacao: string
  tipodeIdentificacao: 'NIF' | 'BI' | 'CARTAO_DE_RESIDENTE' | 'PASSAPORTE'
}

export interface cliente {
  id?: number
  countryId: number
  telefone: string
  telefone2?: string
  whatsapp?: string
  endereco?: string
  email?: string
  subAccountId: number
  tipoDesconto: 'COMERCIAL' | 'FINANCEIRO' | 'DIVERSO' | 'NENHUM'
  valorDesconto?: number
  percentagemDesconto?: number
  efectuaRetencao: boolean
  saldo: number
  limiteSaldo: number
  limiteCredito: number
  estado: 'ACTIVO' | 'REMOVIDO'
}

export interface fornecedor {
  id?: number
  countryId: number
  telefone: string
  telefone2?: string
  whatsapp?: string
  address?: string
  email?: string
  subAccountId: number
  estado: 'ACTIVO' | 'REMOVIDO'
}

export interface Loja {
  id?: number
  name: string
  indentificao: string
  address: string
  provinciaId: number
  telefone: string
  telefone2?: string
  email: string
}

export interface Armazem {
  id?: number
  name: string
  lojaId: number
  description?: string
  localidade?: string
  bloqueioEntrada: boolean
  bloqueioSaida: boolean
}

export interface Role {
  id?: number
  name: string
  description?: string
}
