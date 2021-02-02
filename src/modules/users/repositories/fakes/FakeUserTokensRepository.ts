import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';

class FakeUsersTokensRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = [];

  generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return userToken;
  }
}

export default FakeUsersTokensRepository;
