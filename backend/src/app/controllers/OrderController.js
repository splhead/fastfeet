import { Op } from 'sequelize';
import { getHours, setHours, setMinutes, setSeconds } from 'date-fns';

import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class OrderController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists!' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: deliveryman.id,
        canceled_at: null,
        end_date: null,
      },
      include: [
        {
          model: Recipient,
        },
      ],
    });

    return res.json(deliveries);
  }

  /* async show(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists!' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: req.params.deliveryId,
        deliveryman_id: deliveryman.id,
        canceled_at: null,
        end_date: null,
      },
      include: [
        {
          model: Recipient,
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({
        error: 'Delivery does not exists or cancelled or delivered!',
      });
    }

    return res.json(delivery);
  } */

  async update(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists!' });
    }

    const start_date = new Date();
    const hour = getHours(start_date);

    if (hour < 8 || hour > 18) {
      return res.status(401).json({
        error: 'You can not get this delivery now, only in business hours',
      });
    }

    const start = setSeconds(setMinutes(setHours(new Date(), 8), 0), 0);
    const end = setSeconds(setMinutes(setHours(new Date(), 18), 0), 0);

    const deliveriesThisDay = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: deliveryman.id,
        canceled_at: null,
        end_date: null,
        start_date: {
          [Op.between]: [start, end],
        },
      },
    });

    if (deliveriesThisDay.count >= 5) {
      return res
        .status(400)
        .json({ error: 'You can only withdraw 5 deliveries per day' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: req.params.deliveryId,
        deliveryman_id: deliveryman.id,
        start_date: null,
        end_date: null,
        canceled_at: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({
        error:
          'Delivery does not exists or was canceled or has already been withdrawed!',
      });
    }

    const deliveryWithdrawed = await delivery.update({
      start_date,
    });

    return res.json(deliveryWithdrawed);
  }
}

export default new OrderController();
