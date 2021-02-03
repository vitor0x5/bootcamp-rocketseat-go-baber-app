import { Response, Request } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fake/FakeMailProvider';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      usersRepository,
      new FakeMailProvider(),
      new UsersTokensRepository(),
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}
