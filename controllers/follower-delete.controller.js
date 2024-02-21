import UserSchema from '../Schemas/user.schema.js';
import FollowerSchema from '../schemas/follower.schema.js';

export default async function followerDeleteController(req, res) {
  const { id } = req;
  const { following_id } = req.body;

  const existingFollowerById = await UserSchema.findByPk(id);
  if (!existingFollowerById)
    return res.status(401).json({
      msg: `User with id ${id} not found`,
    });

  const existingFollowingById = await UserSchema.findOne({
    where: { id: following_id },
  });
  if (!existingFollowingById)
    return res.status(401).json({
      msg: `User with id ${id} not found`,
    });

  const follow = await FollowerSchema.findOne({
    where: { follower_id: id, following_id },
  });
  if (!follow)
    return res.status(401).json({
      msg: 'Follow not found',
    });

  await follow.destroy();

  return res.status(200).json({
    msg: 'Follow deleted!',
  });
}
