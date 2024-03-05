import { jwtVerify } from 'jose';

import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/post.schema.js';
import LikeSchema from '../schemas/like.schema.js';

export default function socketEvents(io) {
  io.on('connection', (socket) => {
    socket.on('like', async (data) => {
      const { jwt, post_id } = data;

      const encoder = new TextEncoder();
      const { payload } = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
      );

      const id = payload.id;

      const existingUserById = await UserSchema.findByPk(id);
      if (!existingUserById) {
        io.emit('likesCount', { msg: 'User not found' });
        return;
      }

      const existingPostById = await PostSchema.findOne({
        where: { id: post_id },
      });
      if (!existingPostById) {
        io.emit('likesCount', { msg: 'Post not found' });
        return;
      }

      const existingLikeInPost = await LikeSchema.findOne({
        where: { user_id: id, post_id },
      });

      if (existingLikeInPost) {
        await existingLikeInPost.destroy();
        const likesCount = await LikeSchema.count({ where: { post_id } });
        io.emit('likesCount', { post_id, likesCount });

        return;
      }

      const like = new LikeSchema({ user_id: id, post_id });
      await like.save();

      const likesCount = await LikeSchema.count({ where: { post_id } });
      io.emit('likesCount', { id, post_id, likesCount });
    });

    socket.on('comment', async (data) => {
      const { jwt, content, post_id } = data;

      if (!content) {
        io.emit('newComment', {
          msg: 'Comment must be at least 1 char long',
        });
        return;
      }

      const encoder = new TextEncoder();
      const { payload } = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
      );

      const id = payload.id;

      const existingUserById = await UserSchema.findByPk(id);
      if (!existingUserById) {
        io.emit('newComment', {
          msg: 'User not found',
        });
        return;
      }
      const existingPostById = await PostSchema.findOne({
        where: { id: post_id },
      });
      if (!existingPostById) {
        io.emit('newComment', {
          msg: 'Post not found',
        });
        return;
      }
      const comment = new CommentSchema({ content, user_id: id, post_id });
      await comment.save();

      io.emit('newComment', {
        content,
        user_id: id,
        post_id,
      });
    });
  });
}
