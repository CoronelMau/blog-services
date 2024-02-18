import { DataTypes } from 'sequelize';

import db from '../db/connection.js';

const User = db.define('user', {
  username: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  state: { type: DataTypes.BOOLEAN },
});

export default User;
