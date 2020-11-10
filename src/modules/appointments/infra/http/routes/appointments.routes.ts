import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';

const appointmentController = new AppointmentController();

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', appointmentController.show);

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
