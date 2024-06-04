import {
  CustomDecorator,
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common'
import { JwtPayload } from 'src/types/jwt'

export const IS_PUBLIC_KEY = 'isPublic'

export function Public(): CustomDecorator<string> {
  return SetMetadata(IS_PUBLIC_KEY, true)
}

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext) => getCurrentUserId(context),
)

function getCurrentUserId(context: ExecutionContext) {
  const request = context.switchToHttp().getRequest()
  const user = request.user as JwtPayload
  return user.id
}

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, context: ExecutionContext) =>
    getCurrentUser(data, context),
)

function getCurrentUser(
  data: keyof JwtPayload | undefined,
  context: ExecutionContext,
) {
  const request = context.switchToHttp().getRequest()
  if (!data) return request.user
  return request.user[data]
}
