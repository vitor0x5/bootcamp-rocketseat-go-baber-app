import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  constructor(
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError('User does not exists');
    }

    await this.userTokenRepository.generate(checkUserExists.id);

    await this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
