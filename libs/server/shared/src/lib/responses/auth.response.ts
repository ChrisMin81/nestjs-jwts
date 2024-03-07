import { TokenResponse } from './token.response';
import { IUser } from '@fst/shared/domain';

export type AuthResponse = TokenResponse & {
  user: Partial<IUser> | null;
};
