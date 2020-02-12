import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll();
    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.number().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, avatar_id, email } = await Deliveryman.create(req.body);

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

    const { name, avatar_id, email } = await deliveryman.update(req.body);

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

    return res.json();
  }
}

export default new DeliverymanController();
