import { autoserializeAs } from 'cerialize';

export class AuthData {

  @autoserializeAs('refresh_token')
  refreshToken!: string;

  @autoserializeAs('access_token')
  accessToken!: string;

  @autoserializeAs('expires_in')
  expiresIn!: number;

}
