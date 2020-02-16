import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      district: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { name, city } = req.body;
    const recipientExist = await Recipient.findOne({ where: { name, city } });

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

    const { recipientId } = req.params;

    if (!recipientId) {
      return res.status(400).json({ error: "Recipient's Id not provided!" });
    }

    const recipient = await Recipient.findByPk(recipientId);

    const { name } = req.body;

    if (name && name !== recipient.name) {
      const recipientExist = await Recipient.findOne({ where: { name } });

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
