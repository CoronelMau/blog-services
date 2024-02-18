import { DataTypes } from 'sequelize';

import db from '../db/connection.js';

const CommentSchema = db.define('comment', {
  content: { type: DataTypes.STRING },
  user_id: { type: DataTypes.INTEGER },
  post_id: { type: DataTypes.INTEGER },
});

export default CommentSchema;
