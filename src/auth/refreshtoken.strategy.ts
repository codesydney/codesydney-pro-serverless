import { ForbiddenException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { JwtPayload } from 'src/types/jwt'

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

  validate(req: Request, payload: JwtPayload): JwtPayload {
    const refreshToken = req.headers.authorization
      ?.replace('Bearer', ' ')
      .trim()

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed')

    return {
      ...payload,
      refreshToken,
    }
  }
}
