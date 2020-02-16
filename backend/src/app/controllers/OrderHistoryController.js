import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class OrderHistoryController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists!' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: deliveryman.id,
        canceled_at: null,
        end_date: {
          [Op.not]: null,
        },
      },
      include: [
        {
          model: Recipient,
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new OrderHistoryController();
