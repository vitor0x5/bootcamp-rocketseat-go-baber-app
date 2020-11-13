import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (await this.appointmentsRepository.findByDate(appointmentDate)) {
      throw new AppError('This appointment is already booked');
    }

    return this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
  }
}

export default CreateAppointmentService;
