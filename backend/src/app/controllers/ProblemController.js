import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class ProblemController {
  async index(req, res) {
    const deliveriesProblems = await DeliveryProblem.findAll({
      where: {
        delivery_id: req.params.deliveryId,
      },
      include: {
        model: Delivery,
      },
    });
    return res.json(deliveriesProblems);
  }
}

export default new ProblemController();
