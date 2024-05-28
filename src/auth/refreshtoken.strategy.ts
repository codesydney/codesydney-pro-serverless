import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'

//TODO: Some serious refactoring is needed once we go through security analysis

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    })
  }

  // This JWT payload should be a proper type but just doing adhoc for the moment
  validate(req: Request, payload: { userId: string; email: string }) {
    const [type, token] = req.headers.authorization?.split(' ') ?? []
    const refreshToken = type === 'Bearer' ? token : undefined
    return { ...payload, refreshToken }
  }
}
