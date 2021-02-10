import { Response, Request } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import BCryptHashProvider from '@modules/users/providers/HashProvider/fakes/fakeHashProvider';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { password, token } = request.body;

    const resetForgotPasswordEmail = new ResetPasswordService(
      usersRepository,
      new UsersTokensRepository(),
      new BCryptHashProvider(),
    );

    await resetForgotPasswordEmail.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}
