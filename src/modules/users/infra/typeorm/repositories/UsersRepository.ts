import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/Users';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    this.ormRepository = getRepository(User);
    const user = this.ormRepository.create({ name, email, password });
    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    this.ormRepository = getRepository(User);
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  public async findById(id: string): Promise<User | undefined> {
    this.ormRepository = getRepository(User);
    return this.ormRepository.findOne(id);
  }

  public async save(user: User): Promise<User> {
    this.ormRepository = getRepository(User);
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
