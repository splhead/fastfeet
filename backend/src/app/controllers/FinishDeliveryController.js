import Delivery from '../models/Delivery';

class FinishDeliveryController {
  async update(req, res) {
    const { deliverymanId, deliveryId } = req.params;

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
        end_date: null,
        canceled_at: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({
        error: 'Delivery does not found or cancelled or aready delivered.',
      });
    }

    const deliveryUpdated = await delivery.update({
      end_date: new Date(),
      signature_id: req.body.signature_id,
    });

    return res.json(deliveryUpdated);
  }
}

export default new FinishDeliveryController();
