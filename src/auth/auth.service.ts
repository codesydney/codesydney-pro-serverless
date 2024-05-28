import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ResUserDto, UserDto } from 'src/types/user.dto'
import { UserService } from 'src/users/services/user/user.service'
import { Cryptography } from 'src/utils/cryptography/cryptography'
import { uuidv7 } from 'uuidv7'

//TODO: Some serious refactoring is needed once we go through security analysis

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  cryptography = new Cryptography()

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.authUserByEmail(email)

    const validPassword = await this.cryptography.compareToHashedPassword(
      password,
      user.password,
    )

    if (!validPassword || !user) {
      throw new UnauthorizedException()
    }

    // This JWT payload should be a proper type but just doing adhoc for the moment
    const payload = { userId: user.id, email: user.email }
    const tokens = await this.getTokens(payload.userId, payload.email)
    return {
      access_token: tokens,
    }
  }

  async logout(userId: string) {
    // Here we update the DB with a null value to the refresh token, thus invalidating
    return this.userService.updateUserRefreshToken(userId, null)
  }

  async register(userDto: UserDto): Promise<ResUserDto> {
    const userExists = await this.userService.findUserByEmail(userDto.email)
    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    const cryptography = new Cryptography()
    const uuid = uuidv7().toString()
    userDto.id = uuid
    userDto.password = await cryptography.hashPassword(userDto.password)
    const newUser = await this.userService.createUser(userDto)
    const tokens = await this.getTokens(newUser.id, newUser.email)
    await this.updateRefreshToken(newUser.id, tokens.refreshToken)
    return { ...newUser, tokens: tokens }
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<{
    accessToken: string
    refreshToken: string
  }> {
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

    const tokens = await this.getTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }

  async getTokens(
    userId: string,
    email: string,
  ): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const payload = { userId: userId, email: email }
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
}
