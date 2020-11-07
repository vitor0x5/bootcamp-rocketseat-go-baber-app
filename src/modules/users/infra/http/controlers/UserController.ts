import { Response, Request } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password;

    return response.json(user);
  }
}
