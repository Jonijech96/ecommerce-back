const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return product.init(sequelize, DataTypes);
};

/**
 * @openapi
 * components:
 *   schemas:
 *     products:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 2
 *         name:
 *           type: string
 *           example: lavarropas
 *         price:
 *           type: double
 *           example: 12.5
 *         available_qty:
 *           type: int
 *           example: 12
 *         status:
 *           type: boolean
 *           example: false
 *         user_id:
 *           type: int
 *           example: 1
 *         image:
 *           type: string
 *           example: www.imagenfalsa.com/12/asdasd.jpg
 *     newproduct:
 *       type: object
 *       properties:
 *         id:
 *           type: int
 *           example: 2
 *         name:
 *           type: string
 *           example: lavarropas
 *         price:
 *           type: double
 *           example: 12.5
 *         available_qty:
 *           type: int
 *           example: 12
 *         status:
 *           type: boolean
 *           example: false
 *         user_id:
 *           type: int
 *           example: 1
 *         image:
 *           type: string
 *           example: www.imagenfalsa.com/12/asdasd.jpg
 */

class product extends Sequelize.Model {
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
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        price: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        available_qty: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "product",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "product_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
