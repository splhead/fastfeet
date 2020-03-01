import Sequelize, { Model } from 'sequelize';

export default class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        delivery_id: Sequelize.INTEGER,
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Delivery, { foreignKey: 'delivery_id' });
  }
}
