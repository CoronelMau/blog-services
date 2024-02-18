import { DataTypes } from 'sequelize';
import db from '../db/connection.js';

const PostSchema = db.define('post', {
  url: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
  user_id: { type: DataTypes.INTEGER },
});

export default PostSchema;
