export interface ITokenUserMetadata {
  sub: string;
  username: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

export interface ITokenPayload extends ITokenUserMetadata {
  aud: string;
  iss: string;
  iat: number;
  exp: number;
}

export interface IUserWithoutPassword {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IUserWithoutPassword {
  password: string;
}

export interface Session {
  attributes: IUserWithoutPassword;
  accessToken: {
    jwtToken: string;
    payload: ITokenPayload;
  };
}
