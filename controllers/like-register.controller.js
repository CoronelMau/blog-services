import LikeSchema from '../schemas/like.schema.js';
import PostSchema from '../schemas/post.schema.js';
import UserSchema from '../Schemas/user.schema.js';

export default async function likeRegisterController(req, res) {
  const { id } = req;
  const { post_id } = req.body;

  const existingUserById = await UserSchema.findByPk(id);
  if (!existingUserById)
    return res.status(404).json({
      msg: `User with id: ${user_id} does not exist`,
    });

  const existingPostById = await PostSchema.findOne({ where: { id: post_id } });
  if (!existingPostById)
    return res.status(404).json({
      msg: `Post with id ${post_id} does not exist`,
    });

  const existingLikeInPost = await LikeSchema.findOne({
    where: { user_id: id, post_id },
  });
  if (existingLikeInPost)
    return res.status(403).json({
      msg: 'Like already exists',
    });

  const like = new LikeSchema({ user_id, post_id });
  await like.save();

  return res.status(200).json({
    msg: 'Like registered!',
  });
}
