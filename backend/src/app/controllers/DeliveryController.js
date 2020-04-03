import * as Yup from 'yup';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { q: filter, page = 1, itens_per_page = 2 } = req.query;

    const response = filter
      ? await Delivery.findAndCountAll({
          where: {
            product: {
              [Op.iLike]: `%${filter}%`,
            },
          },
          limit: itens_per_page,
          offset: (page - 1) * itens_per_page,
          include: [
            {
              model: Recipient,
              attributes: [
                'name',
                'street',
                'number',
                'complement',
                'city',
                'state',
                'zip_code',
              ],
            },
            {
              model: Deliveryman,
              attributes: ['name'],
              include: {
                model: File,
                as: 'avatar',
                attributes: ['id', 'path'],
              },
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'path'],
            },
          ],
          order: ['id'],
        })
      : await Delivery.findAndCountAll({
          limit: itens_per_page,
          offset: (page - 1) * itens_per_page,
          include: [
            {
              model: Recipient,
              attributes: [
                'name',
                'street',
                'number',
                'complement',
                'city',
                'state',
                'zip_code',
              ],
            },
            {
              model: Deliveryman,
              attributes: ['name'],
              include: {
                model: File,
                as: 'avatar',
                attributes: ['id', 'path'],
              },
            },
            {
              model: File,
              as: 'signature',
              attributes: ['id', 'path'],
            },
          ],
          order: ['id'],
        });

    return res.json(response);
  }

  async show(req, res) {
    const delivery = await Delivery.findOne({
      where: {
        id: req.params.deliveryId,
      },
      include: [
        {
          model: Recipient,
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    return res.json(delivery);
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

  async delete(req, res) {
    const delivery = await Delivery.findOne({
      where: {
        id: req.params.deliveryId,
      },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exists' });
    }

    await delivery.destroy();

    return res.json({ message: 'Delivery was deleted' });
  }
}

export default new DeliveryController();
