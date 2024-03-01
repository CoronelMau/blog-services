import { jwtVerify } from 'jose';

import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/post.schema.js';
import LikeSchema from '../schemas/like.schema.js';

export default function setupSocketEvents(io) {
  io.on('connection', (socket) => {
    socket.on('like', async (data, res) => {
      const { jwt, post_id } = data;

      const encoder = new TextEncoder();
      const { payload } = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
      );

      const id = payload.id;

      const existingUserById = await UserSchema.findByPk(id);
      if (!existingUserById) {
        console.log('User not found');
        return;
      }

      const existingPostById = await PostSchema.findOne({
        where: { id: post_id },
      });
      if (!existingPostById) {
        console.log('Post not found');
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
      io.emit('likesCount', { post_id, likesCount });
    });
  });
}
