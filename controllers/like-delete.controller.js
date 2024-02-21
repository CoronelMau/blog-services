import LikeSchema from '../schemas/like.schema.js';
import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function likeDeleteController(req, res) {
  const { id } = req;
  const { post_id } = req.body;

  const existingUserById = await UserSchema.findByPk(id);
  if (!existingUserById)
    return res.status(401).json({
      msg: `User with id ${id} not found`,
    });

  if (!existingUserById.state)
    return res.status(401).json({
      msg: `User with id ${id} not found`,
    });

  const existingPostById = await PostSchema.findOne({ where: { id: post_id } });
  if (!existingPostById)
    return res.status(401).json({
      msg: `Post with id ${post_id} not found`,
    });

  const existingLikeInPost = await LikeSchema.findOne({
    where: { user_id: id, post_id },
  });
  if (!existingLikeInPost)
    return res.status(404).json({
      msg: 'Like not found',
    });

  const like = await LikeSchema.findOne({ where: { user_id: id, post_id } });
  await like.destroy();

  return res.status(200).json({
    msg: 'Like deleted!',
  });
}
