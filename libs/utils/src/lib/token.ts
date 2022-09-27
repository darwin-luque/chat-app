import { ITokenUserMetadata, IUser } from '@chat-app/types';

export const mapUserToTokenUserMetadata = (
  user: IUser
): ITokenUserMetadata => ({
  sub: user.id,
  username: user.username,
  given_name: user.firstName,
  family_name: user.lastName,
  picture: user.picture,
});
