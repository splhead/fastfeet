import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll();
    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists!' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists!' });
    }

    const delivery = await Delivery.create(req.body);

    Queue.add(DeliveryMail.key, {
      deliveryman,
      recipient,
      delivery,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: req.params.deliveryId,
        canceled_at: null,
        end_date: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    if (delivery.start_date) {
      return res
        .status(400)
        .json({ error: 'You can not change delivery already on the road' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    if (recipient_id && recipient_id !== delivery.recipient_id) {
      const recipent = await Recipient.findByPk(recipient_id);

      if (!recipent) {
        return res.status(400).json({ error: 'Recipient does not exists' });
      }
    }

    if (deliveryman_id && deliveryman_id !== delivery.deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(deliveryman_id);

      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman does not exists' });
      }
    }

    const deliveryUpdated = await delivery.update(req.body);

    return res.json(deliveryUpdated);
  }
}

export default new DeliveryController();
