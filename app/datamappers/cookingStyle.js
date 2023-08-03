import CoreDatamapper from './coreDatamapper.js';
import client from '../db/pg.js';

class CookingStyle extends CoreDatamapper {
  tableName = 'cooking_style';

  async findByRestaurant(restaurantId) {
    const preparedQuery = {
      text: `
                SELECT *
                FROM "${this.tableName}"
                JOIN "restaurant_has_cooking_style" ON "restaurant_has_cooking_style"."cooking_style_id" = "cooking_style"."id"
                WHERE "restaurant_id" = $1`,
      values: [restaurantId],
    };

    const result = await this.client.query(preparedQuery);

    return result.rows;
  }
}

export default new CookingStyle(client);
