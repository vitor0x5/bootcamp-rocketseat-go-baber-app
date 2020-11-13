import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/Users';

interface Request {
  user_id: string;
  AvatarFileName: string;
}

export default class UpdateUserAvatarService {
  constructor(
    private userRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, AvatarFileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(AvatarFileName);
    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}
