import LikeSchema from '../schemas/like.schema.js';
import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function likeDeleteController(req, res) {
  const { id } = req;
  const { post_id } = req.body;

  const user = await UserSchema.findByPk(id);
  if (!user)
    return res.status(401).json({
      msg: `User with id ${id} not found`,
    });

  if (!user.state)
    return res.status(401).json({
      msg: `User with id ${id} not found`,
    });

  const post = await PostSchema.findOne({ where: { id: post_id } });
  if (!post)
    return res.status(401).json({
      msg: `Post with id ${post_id} not found`,
    });

  const like = await LikeSchema.findOne({ where: { user_id: id, post_id } });
  await like.destroy();

  return res.status(200).json({
    msg: 'Like deleted!',
  });
}
