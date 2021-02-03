import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fake/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUserRepository: FakeUserRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUsersTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exampe.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@exampe.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'johndoe@exampe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUsersTokensRepository, 'generate');

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUsersTokensRepository,
    );

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@exampe.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@exampe.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
