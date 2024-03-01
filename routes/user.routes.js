import { Router } from 'express';
import { check } from 'express-validator';

import validateFields from '../helpers/validation.js';

//Controllers
import getUsersController from '../controllers/users.controller.js';
import getProfileController from '../controllers/user-profile.controller.js';
import getPostsController from '../controllers/posts.controller.js';
import getUserPostController from '../controllers/user-post.controller.js';
import getPostCommentsController from '../controllers/post-comments.controller.js';
import getPostLikesController from '../controllers/post-likes.controller.js';
import getFollowerController from '../controllers/follower.controller.js';
import getPostController from '../controllers/post.controller.js';
import userRegisterController from '../controllers/user-register.controller.js';
import userLogInController from '../controllers/user-login.controller.js';
import postRegisterController from '../controllers/post-register.controller.js';
import commentRegisterController from '../controllers/comment-register.controller.js';
import likeRegisterController from '../controllers/like-register.controller.js';
import followerRegisterController from '../controllers/follower-register.controller.js';
import userUpdateController from '../controllers/user-update.controller.js';
import passwordUpdateController from '../controllers/pwd-update.controller.js';
import userDeleteController from '../controllers/user-delete.controller.js';
import followerDeleteController from '../controllers/follower-delete.controller.js';
import getFollowPostController from '../controllers/follow-posts.controller.js';

//Data Transfer Objects
import userJWTDTO from '../dto/user-jwt.dto.js';

//Router
const router = Router();

//Get routes
router.get('/users', getUsersController);
router.get('/profile', userJWTDTO, getProfileController);
router.get('/posts', getPostsController);
router.get('/post/:id', getPostController);
router.get('/posts/:userId', getUserPostController);
router.get('/follow-posts', userJWTDTO, getFollowPostController);
router.get('/comments/:postId', getPostCommentsController);
router.get('/likes/:postId', getPostLikesController);
router.get('/follower/:followerId', getFollowerController);

//Post routes
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
    check('email', 'Email is not valid').isEmail(),
    validateFields,
  ],
  userRegisterController
);
router.post(
  '/log-in',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email').isEmail(),
    check('password', 'Password must have at least 6 charachters').isLength({
      min: 6,
    }),
    validateFields,
  ],
  userLogInController
);
router.post(
  '/post',
  userJWTDTO,
  [
    check('text', 'Text must have at least 1 character').isLength({
      min: 1,
    }),
    validateFields,
  ],
  postRegisterController
);
router.post(
  '/comment',
  [
    check('content', 'Content must have at least 1 character').isLength({
      min: 1,
    }),
    validateFields,
  ],
  userJWTDTO,
  commentRegisterController
);
router.post('/follow', userJWTDTO, followerRegisterController);

//Update routes
router.put(
  '/update-profile',
  userJWTDTO,
  [check('username', 'Username is required').not().isEmpty(), validateFields],
  userUpdateController
);
router.put(
  '/update-pwd',
  userJWTDTO,
  [
    check('oldPwd', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
    check('newPwd', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
    validateFields,
  ],
  passwordUpdateController
);

//Delete routes
router.put('/user-delete', userJWTDTO, userDeleteController);
router.delete('/follow-delete', userJWTDTO, followerDeleteController);

export default router;
