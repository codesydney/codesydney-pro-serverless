import { Roles } from '@prisma/client'

// Note this is not a real DTO as per data class
// Having it as a type to make it decoupled from the Prisma type

export interface UserDto {
  id: string
  email: string
  password: string
  // This is a prisma enum, hence too much coupling and dependency
  // It will be hard to make a generic data model with those dependencies
  role: Roles
  firstName: string
  lastName: string
  refreshToken: string
}

export interface ReqUserDto {
  id?: string
  email: string
  password?: string
  role?: Roles // This is a prisma enum, hence too much coupling and dependency
  firstName: string
  lastName: string
  refreshToken?: string
}

//TODO: Some serious refactoring is needed once we go through security analysis

export interface ResUserDto {
  id?: string
  email: string
  firstName: string
  lastName: string
  tokens?: {
    accessToken: string
    refreshToken: string
  }
  refreshToken?: string
}

export interface LoginDto {
  email: string
  password: string
}
