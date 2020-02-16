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
import SessionController from './app/controllers/SessionController';
import OrderController from './app/controllers/OrderController';
import OrderHistoryController from './app/controllers/OrderHistoryController';

const routes = new Router();
const upload = multer(multerConfig);

// Upload files
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/sessions', SessionController.store);

// Deliveries from deliveryman
routes.get('/deliverymen/:deliverymanId/deliveries', OrderController.index);
// Withdraw a delivery
routes.put(
  '/deliverymen/:deliverymanId/deliveries/:deliveryId',
  OrderController.update
);

// Finsh delivery
routes.get(
  '/deliverymen/:deliverymanId/deliveries/finished',
  OrderHistoryController.index
);

routes.post('/delivery/:deliveryId/problems', DeliveryProblemController.store);

routes.use(authMiddleware);

routes.post('/users', UserController.store);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:recipientId', RecipientController.update);
routes.delete('/recipients/:recipientId', RecipientController.delete);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:deliverymanId', DeliverymanController.update);
routes.delete('/deliverymen/:deliverymanId', DeliverymanController.destroy);

// Problems
routes.get('/deliveries/problems', DeliveryProblemController.index);
routes.get('/delivery/:deliveryId/problems', DeliveryProblemController.show);

// Cancellation
routes.delete(
  '/problem/:deliveryProblemId/cancel-delivery',
  DeliveryProblemController.delete
);

// Deliveries
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:deliveryId', DeliveryController.update);

export default routes;
