import * as Yup from 'yup';
import { Op } from 'sequelize';
import File from '../models/File';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const { q: filter, page = 1, itens_per_page = 2 } = req.query;

    const deliverymen = filter
      ? await Deliveryman.findAndCountAll({
          where: {
            name: {
              [Op.iLike]: `%${filter}%`,
            },
          },
          limit: itens_per_page,
          offset: (page - 1) * itens_per_page,
          include: {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        })
      : await Deliveryman.findAndCountAll({
          limit: itens_per_page,
          offset: (page - 1) * itens_per_page,
          include: {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        });

    return res.json(deliverymen);
  }

  async show(req, res) {
    const deliveryman = await Deliveryman.findOne({
      where: {
        id: req.params.deliverymanId,
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'url', 'path'],
        },
      ],
    });

    if (!deliveryman) {
      return res.json({ error: 'Deliveryman does not exists' });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const deliverymanExists = await Deliveryman.findOne({ where: { email } });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }

    const { name, avatar_id } = await Deliveryman.create(req.body);

    return res.json({
      name,
      avatar_id,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      avatar_id: Yup.number(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.deliverymanId);

    if (!deliveryman) {
      return res
        .status(400)
        .json({ error: 'This deliveryman does not exists!' });
    }

    const { email } = req.body;

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({ where: { email } });

      if (deliverymanExists) {
        return res
          .status(400)
          .json({ error: "Deliveryman's email already registered" });
      }
    }

    const { name, avatar_id } = await deliveryman.update(req.body);

    return res.json({
      name,
      avatar_id,
      email,
    });
  }

  async destroy(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.deliverymanId);

    if (!deliveryman) {
      return res
        .status(400)
        .json({ error: 'This deliveryman does not exists!' });
    }

    await deliveryman.destroy();

    return res.json({ message: 'Deliveryman was deleted' });
  }
}

export default new DeliverymanController();
