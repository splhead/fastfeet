import Sequelize, { Model } from 'sequelize';

export default class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            let status = '';
            if (this.canceled_at) {
              status = 'CANCELADA';
            } else if (this.end_date) {
              status = 'ENTREGUE';
            } else if (this.start_date) {
              status = 'RETIRADA';
            } else {
              status = 'PENDENTE';
            }
            return status;
          },
        },
      },
      {
        sequelize,
        tableName: 'deliveries',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id' });
    this.belongsTo(models.Deliveryman, { foreignKey: 'deliveryman_id' });
    this.belongsTo(models.File, { foreignKey: 'signature_id' });
  }
}
