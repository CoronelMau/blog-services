import { DataTypes } from 'sequelize';

import db from '../db/connection.js';

const FollowerSchema = db.define('follower', {
  follower_id: { type: DataTypes.INTEGER },
  following_id: { type: DataTypes.INTEGER },
});

export default FollowerSchema;
