import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

//TODO: Some serious refactoring is needed once we go through security analysis

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    })
  }

  // This JWT payload should be a proper type but just doing adhoc for the moment
  validate(payload: { userId: string; email: string }) {
    return payload
  }
}
