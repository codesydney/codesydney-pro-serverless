import * as bcrypt from 'bcrypt'

// TODO: Making this as a class because we will most likely be adding some more sophisticated dependency injections in the future
export class Cryptography {
  //TODO: This is a very simple hash and by no means should go in prod
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)
    return hashedPassword
  }

  async compareToHashedPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatched = await bcrypt.compare(password, hashedPassword)
    return isMatched
  }

  async hashToken(token: string): Promise<string> {
    const saltOrRounds = 10
    const hashedToken = await bcrypt.hash(token, saltOrRounds)
    return hashedToken
  }

  async compareHashedToken(
    refreshToken: string,
    hashedRefreshToken: string,
  ): Promise<boolean> {
    const isMatched = await bcrypt.compare(refreshToken, hashedRefreshToken)
    return isMatched
  }
}
