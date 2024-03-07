import FollowerSchema from '../schemas/follower.schema.js';
import UserSchema from '../Schemas/user.schema.js';

export default async function followerRegisterController(req, res) {
  const { id } = req;
  const { following_id } = req.body;

  if (id === following_id)
    return res.status(401).json({
      msg: 'Follower and following are the same',
    });

  const followerExistsById = await UserSchema.findByPk(id);
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

  const existingFollow = await FollowerSchema.findOne({
    where: { follower_id: id, following_id },
  });
  if (existingFollow) {
    await existingFollow.destroy();
    return res.status(200).json({
      msg: 'Follow deleted',
    });
  }

  const follow = new FollowerSchema({ follower_id: id, following_id });
  await follow.save();

  return res.status(200).json({
    msg: 'Follow registered!',
  });
}
