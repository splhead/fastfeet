import * as Yup from 'yup';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1, itens_per_page = 2 } = req.query;
    const deliveriesProblems = await DeliveryProblem.findAndCountAll({
      include: {
        model: Delivery,
      },
      limit: itens_per_page,
      offset: (page - 1) * itens_per_page,
    });
    return res.json(deliveriesProblems);
  }

  async show(req, res) {
    const deliveryProblems = await DeliveryProblem.findAll({
      where: {
        delivery_id: req.params.deliveryId,
      },
      include: {
        model: Delivery,
      },
    });
    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: req.params.deliveryId,
        canceled_at: null,
        end_date: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({
        error:
          'Delivery was canceled or has already been' +
          ' delivered or it does not exists',
      });
    }

    const { description } = req.body;

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: delivery.id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const deliveryProblem = await DeliveryProblem.findOne({
      where: {
        id: req.params.deliveryProblemId,
      },
      include: [
        {
          model: Delivery,
          include: [
            {
              model: Deliveryman,
            },
            { model: Recipient },
          ],
        },
      ],
    });

    if (!deliveryProblem) {
      return res
        .status(400)
        .json({ error: 'Delivery problem does not exists' });
    }

    const delivery = deliveryProblem.Delivery;
    const deliveryman = delivery.Deliveryman;
    const recipient = delivery.Recipient;

    if (delivery.canceled_at) {
      return res
        .status(400)
        .json({ error: 'Delivery has already been canceled' });
    }

    if (delivery.end_date) {
      return res
        .status(400)
        .json({ error: 'Delivery has already been delivered' });
    }

    delivery.canceled_at = new Date();

    Queue.add(CancellationMail.key, {
      deliveryman,
      recipient,
      delivery,
    });

    delivery.save();

    return res.json({ message: 'Delivery was canceled' });
  }
}

export default new DeliveryProblemController();
