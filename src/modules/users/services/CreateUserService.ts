import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import User from '../infra/typeorm/entities/Users';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  private hashProvider: IHashProvider;

  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: Request): Promise<User> {
    this.hashProvider = new BCryptHashProvider();

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    return this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
