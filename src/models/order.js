const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return order.init(sequelize, DataTypes);
};

/**
 * @openapi
 * components:
 *   schemas:
 *     orders:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 2
 *         total_price:
 *           type: double
 *           example: 13.3
 *         user_id:
 *           type: int
 *           example: 1
 *         status:
 *           type: string
 *           example: purchased
 *     orderstatus:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 2
 *         status:
 *           type: string
 *           example: purchased
 */

class order extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        total_price: {
          type: DataTypes.DOUBLE,
          allowNull: true,
          defaultValue: 0,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        status: {
          type: DataTypes.ENUM("pending", "purchased", "cancelled"),
          allowNull: true,
          defaultValue: "pending",
        },
      },
      {
        sequelize,
        tableName: "order",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "order_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
