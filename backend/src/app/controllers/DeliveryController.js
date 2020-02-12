import * as Yup from 'yup';
import { addMonths, parseISO, isPast, areIntervalsOverlapping } from 'date-fns';

import { Op } from 'sequelize';

import Delivery from '../models/Delivery';

/* import DeliveryMail from '../jobs/DeliveryMail'; */
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll();
    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const startOfDelivery = parseISO(start_date);

    if (isPast(startOfDelivery)) {
      return res
        .status(400)
        .json({ error: 'You can not register in a past date' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists!' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists!' });
    }

    const endOfDelivery = addMonths(startOfDelivery, plan.duration);

    const today = new Date();

    const savedDeliverys = await Delivery.findAll({
      where: {
        student_id,
        end_date: {
          [Op.gte]: today,
        },
      },
    });

    if (savedDeliverys.length > 0) {
      const alreadyRegistred = savedDeliverys.some(registration => {
        return areIntervalsOverlapping(
          { start: registration.start_date, end: registration.end_date },
          { start: startOfDelivery, end: endOfDelivery }
        );
      });

      if (alreadyRegistred) {
        return res
          .status(400)
          .json({ error: 'Student already registered in period!' });
      }
    }

    const registration = await Delivery.create({
      student_id,
      plan_id,
      start_date,
      end_date: endOfDelivery,
      price: plan.price * plan.duration,
    });

    Queue.add(DeliveryMail.key, {
      student,
      plan,
      registration,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const registration = await Delivery.findByPk(req.params.registrationId);

    if (!registration) {
      return res.status(401).json({ error: 'Delivery does not exists!' });
    }

    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const startOfDelivery = parseISO(start_date);

    if (isPast(startOfDelivery)) {
      return res
        .status(400)
        .json({ error: 'You can not register in a past date' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists!' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists!' });
    }

    const endOfDelivery = addMonths(startOfDelivery, plan.duration);

    const today = new Date();

    const savedDeliverys = await Delivery.findAll({
      where: {
        student_id,
        end_date: {
          [Op.gte]: today,
        },
      },
    });

    if (savedDeliverys.length > 0) {
      const alreadyRegistred = savedDeliverys.some(registration => {
        return areIntervalsOverlapping(
          { start: registration.start_date, end: registration.end_date },
          { start: startOfDelivery, end: endOfDelivery }
        );
      });

      if (alreadyRegistred) {
        return res
          .status(400)
          .json({ error: 'Student already registered in period!' });
      }
    }

    const registrationUpdated = registration.update({
      student_id,
      plan_id,
      start_date,
      end_date: endOfDelivery,
      price: plan.price * plan.duration,
    });

    return res.json(registrationUpdated);
  }

  async delete(req, res) {
    const registration = await Delivery.findByPk(req.params.registrationId);

    if (!registration) {
      return res.status(401).json({ error: 'Delivery does not exists!' });
    }

    await registration.destroy();

    return res.json();
  }
}

export default new DeliveryController();
