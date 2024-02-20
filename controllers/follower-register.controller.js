import FollowerSchema from '../schemas/follower.schema.js';
import UserSchema from '../Schemas/user.schema.js';

export default async function followerRegisterController(req, res) {
  const { follower_id, following_id } = req.body;

  const followerExistsById = await UserSchema.findOne({
    where: { id: follower_id },
  });
  if (!followerExistsById)
    return res.status(409).json({
      msg: `Follower with id ${follower_id} does not exits`,
    });

  const followingExistsById = await UserSchema.findOne({
    where: { id: following_id },
  });
  if (!followingExistsById)
    return res.status(409).json({
      msg: `Following with id ${followingExistsById} does not exist`,
    });

  const follow = new FollowerSchema({ follower_id, following_id });
  await follow.save();

  return res.status(200).json({
    msg: 'Follow registered!',
  });
}
