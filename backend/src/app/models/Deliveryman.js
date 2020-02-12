import Sequelize, { Model } from 'sequelize';

export default class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'deliverymen',
        /*  name: {
          singular: 'deliveryman',
          plural: 'deliverymen',
        }, */
      }
    );
  }
}
