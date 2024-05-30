export type JwtPayload = {
  email: string
  userId: string
  refreshToken?: string
}

export type Tokens = {
  accessToken: string
  refreshToken: string
}
