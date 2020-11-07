import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.ormRepository.findOne({
      where: { date },
    });
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async find(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }
}

export default AppointmentRepository;
