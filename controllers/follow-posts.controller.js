import UserSchema from '../Schemas/user.schema.js';
import PostSchema from '../schemas/post.schema.js';
import FollowerSchema from '../schemas/follower.schema.js';

export default async function getFollowPostController(req, res) {
  const { id } = req;

  const user = await UserSchema.findByPk(id);
  if (!user)
    return res.status(409).json({
      msg: 'User not found',
    });

  const follows = await FollowerSchema.findAll({
    where: { follower_id: id },
  });
  if (!follows)
    return res.status(401).json({
      msg: `User with id ${id} does not follow nobody`,
    });

  const followingIds = follows.map((follow) => follow.following_id);

  const postsByFollowing = await PostSchema.findAll({
    where: { user_id: followingIds },
  });
  if (!postsByFollowing)
    return res.status(401).json({
      msg: `User with id ${followingIds.following_id} does not have posts`,
    });

  const sortedPostFollowers = postsByFollowing.sort(
    (a, b) => b.createdAt - a.createdAt
  );

  const posterNames = await UserSchema.findAll({
    where: { id: followingIds },
  });

  const userPosts = await PostSchema.findAll({ where: { user_id: id } });

  const sortedUserPosts = userPosts.sort((a, b) => b.createdAt - a.createdAt);

  const usernames = posterNames.map((poster) => poster.username);

  const postInfo = sortedPostFollowers.map((post) => {
    return {
      user: usernames[followingIds.indexOf(post.user_id)],
      postId: post.id,
      text: post.text,
    };
  });

  const allPosts = [
    ...postInfo,
    ...sortedUserPosts.map((post) => ({
      user: user.username,
      postId: post.id,
      text: post.text,
    })),
  ];

  return res.status(200).json(allPosts);
}
