import {Router} from 'express';
import appointmentsRoutes from './appointments.routes';
import usersRoutes from './users.routes';

const routes = Router();
routes.use('/appointments', appointmentsRoutes);
routes.use('/users', usersRoutes);

routes.get('/', (request, response) => {
	return response.json({ message: 'Hello World'});
})

export default routes;