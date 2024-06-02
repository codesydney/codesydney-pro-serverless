import { Roles } from '@prisma/client'

export type JwtPayload = {
  email: string
  id: string
  role?: Roles // This is a prisma enum, hence too much coupling and dependency
  refreshToken?: string // TODO: re-think this through
}

export type Tokens = {
  accessToken: string
  refreshToken: string
}
