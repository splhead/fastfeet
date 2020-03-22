import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { q: filter } = req.query;

    const recipients = filter
      ? await Recipient.findAll({
          where: {
            name: {
              [Op.iLike]: `%${filter}%`,
            },
          },
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        })
      : await Recipient.findAll({
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        });

    return res.json(recipients);
  }

  async show(req, res) {
    const recipient = await Recipient.findByPk(req.params.recipientId);

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { name, street, number } = req.body;
    const recipientExist = await Recipient.findOne({
      where: { name, street, number },
    });

    if (recipientExist) {
      return res.status(400).json({ error: 'Recipient already exists!' });
    }

    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      district: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const recipient = await Recipient.findByPk(req.params.recipientId);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }
    const { name } = req.body;

    if (
      name &&
      name !== recipient.name &&
      street &&
      street !== recipient.street &&
      number &&
      number !== recipient.number
    ) {
      const recipientExist = await Recipient.findOne({
        where: { name, street, number },
      });

      if (recipientExist) {
        return res.status(400).json({ error: 'recipient already exists!' });
      }
    }

    const recipientUpdated = await recipient.update(req.body);

    return res.json(recipientUpdated);
  }

  async delete(req, res) {
    const { recipientId } = req.params;

    if (!recipientId) {
      return res.status(400).json({ error: "Recipient's Id not provided!" });
    }

    const recipient = await Recipient.findByPk(recipientId);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exits' });
    }

    await recipient.destroy();

    return res.json({ message: 'Recipient was deleted' });
  }
}

export default new RecipientController();
