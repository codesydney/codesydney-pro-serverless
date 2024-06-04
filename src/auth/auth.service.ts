import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload, Tokens } from '../types/jwt'
import { ResUserAuthDto, UserDto } from '../types/user.dto'
import { UserService } from '../users/services/user/user.service'
import { Cryptography } from '../utils/cryptography/cryptography'

//TODO: Some serious refactoring is needed once we go through security analysis

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  cryptography = new Cryptography()

  async login(email: string, password: string): Promise<Tokens> {
    const user = await this.userService.authUserByEmail(email)

    const validPassword = await this.cryptography.compareToHashedPassword(
      password,
      user.password,
    )

    if (!validPassword || !user) {
      throw new ForbiddenException('Access Denied')
    }

    // This JWT payload should be a proper type but just doing adhoc for the moment
    // const payload = { userId: user.id, email: user.email }
    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    }
    const tokens = await this.getTokens(jwtPayload)
    return tokens
  }

  async logout(userId: string): Promise<boolean> {
    // Here we update the DB with a null value to the refresh token, thus invalidating
    const response = await this.userService.updateUserLogOutToken(userId)

    if (!response.refreshToken) return true
  }

  async register(userDto: UserDto): Promise<Tokens> {
    const userExists = await this.userService.findUserByEmail(userDto.email)
    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    const user = await this.userService.createUser(userDto)
    const jwtPayload = this.getJwtPayload(user)
    const tokens = await this.getTokens(jwtPayload)
    await this.updateRefreshToken(jwtPayload.id, tokens.refreshToken)
    return tokens
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    const user = await this.userService.findUserById(userId)
    if (!user || !refreshToken) {
      throw new ForbiddenException('Access Denied')
    }

    const refreshTokenMatches = await this.cryptography.compareHashedToken(
      refreshToken,
      user.refreshToken,
    )

    if (!refreshTokenMatches || !user) {
      throw new ForbiddenException('Access Denied')
    }

    const jwtPayload = this.getJwtPayload(user)
    const tokens = await this.getTokens(jwtPayload)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }

  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {
    const payload = jwtPayload
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  // Need to think this though, because this transaction can fail
  // Then there will be a mismatched state and it will be fubar
  async updateRefreshToken(userId: string, refreshToken: string) {
    try {
      const hashedRefreshToken = await this.cryptography.hashToken(refreshToken)
      await this.userService.updateUserRefreshToken(userId, hashedRefreshToken)
    } catch (error) {
      throw new BadRequestException('Something gone wrong its FUBAR')
    }
  }

  private getJwtPayload(user: ResUserAuthDto): JwtPayload {
    return { id: user.id, email: user.email, role: user.role }
  }
}
