import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemController from './app/controllers/ProblemController';
import SessionController from './app/controllers/SessionController';
import OrderController from './app/controllers/OrderController';
import OrderHistoryController from './app/controllers/OrderHistoryController';

const routes = new Router();
const upload = multer(multerConfig);

// Upload file
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/sessions', SessionController.store);

// Deliveries from deliveryman
routes.get('/deliverymen/:deliverymanId/deliveries', OrderController.index);
/* routes.get(
  '/deliverymen/:deliverymanId/deliveries/:deliveryId',
  OrderController.show
); */

routes.get('/deliverymen/:deliverymanId', DeliverymanController.show);

// Withdraw a delivery
routes.put(
  '/deliverymen/:deliverymanId/deliveries/:deliveryId',
  OrderController.update
);

// delivered deliveries
routes.get(
  '/deliverymen/:deliverymanId/deliveries/delivered',
  OrderHistoryController.index
);

routes.post('/delivery/:deliveryId/problems', DeliveryProblemController.store);

routes.get('/deliveries/:deliveryId/problems-list', ProblemController.index);

routes.use(authMiddleware);

routes.post('/users', UserController.store);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:recipientId', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipientId', RecipientController.update);
routes.delete('/recipients/:recipientId', RecipientController.delete);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:deliverymanId', DeliverymanController.update);
routes.delete('/deliverymen/:deliverymanId', DeliverymanController.destroy);

// Problems
routes.get('/deliveries/problems', DeliveryProblemController.index);
routes.get('/deliveries/:deliveryId/problems', DeliveryProblemController.show);

// Cancellation
routes.delete(
  '/problem/:deliveryProblemId/cancel-delivery',
  DeliveryProblemController.delete
);

// Deliveries
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:deliveryId', DeliveryController.update);
routes.get('/deliveries/:deliveryId', DeliveryController.show);
routes.delete('/deliveries/:deliveryId', DeliveryController.delete);

export default routes;
