import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/users/services/user/user.service'
import { Cryptography } from 'src/utils/cryptography/cryptography'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.authUserByEmail(email)

    const cryptography = new Cryptography()
    const validPassword = await cryptography.compareToHashedPassword(
      password,
      user.password,
    )

    if (!validPassword || !user) {
      throw new UnauthorizedException()
    }

    const payload = { userId: user.id, email: user.email }
    const accessToken = await this.jwtService.signAsync(payload)
    return {
      access_token: accessToken,
    }
  }
}
