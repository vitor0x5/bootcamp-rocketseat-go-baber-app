import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/Users';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  AvatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, AvatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = AvatarFileName;

    await userRepository.save(user);

    return user;
  }
}
