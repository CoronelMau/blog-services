import FollowerSchema from '../schemas/follower.schema.js';
import UserSchema from '../Schemas/user.schema.js';

export default async function getFollowerController(req, res) {
  const { followerId } = req.params;

  const existingFollowerById = await UserSchema.findByPk(followerId);

  if (!existingFollowerById)
    return res.status(404).json({
      msg: `User with id ${followerId} does not exist`,
    });

  const existingFollowingsByFollowerId = await FollowerSchema.findAll({
    where: { following_id: followerId },
  });

  if (!existingFollowingsByFollowerId)
    return res.status(404).json({
      msg: `User with id ${followerId} does not have followers`,
    });

  return res.status(200).json({
    followers: existingFollowingsByFollowerId,
  });
}
