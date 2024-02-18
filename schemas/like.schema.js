import { DataTypes } from 'sequelize';

import db from '../db/connection.js';

const LikeSchema = db.define('like', {
  user_id: { type: DataTypes.INTEGER },
  post_id: { type: DataTypes.INTEGER },
});

export default LikeSchema;
