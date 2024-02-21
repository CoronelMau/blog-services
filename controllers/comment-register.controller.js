import UserSchema from '../Schemas/user.schema.js';
import CommentSchema from '../schemas/comment.schema.js';
import PostSchema from '../schemas/post.schema.js';

export default async function commentRegisterController(req, res) {
  const { id } = req;
  const { content, post_id } = req.body;

  if (!content)
    return res.status(409).json({
      msg: 'Content is required',
    });

  const existingUserById = await UserSchema.findByPk(id);
  if (!existingUserById)
    return res.status(409).json({
      msg: `User with id ${id} does not exist`,
    });

  const existingPostById = await PostSchema.findOne({ where: { id: post_id } });
  if (!existingPostById)
    return res.status(409).json({
      msg: `Post with id ${post_id} does not exist`,
    });

  const comment = new CommentSchema({ content, user_id: id, post_id });
  await comment.save();

  return res.status(200).json({
    msg: 'Comment registered!',
  });
}
