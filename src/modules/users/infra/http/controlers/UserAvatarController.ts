import { Response, Request } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService';

export default class SessionsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository,
    );

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      AvatarFileName: request.file.filename,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password;

    return response.json(user);
  }
}
