import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

// to use with dependency injection
// import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    console.log(response);

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});