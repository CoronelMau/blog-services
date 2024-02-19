import { Router } from 'express';
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

import userJWTDTO from '../dto/user-jwt.dto.js';

const router = Router();

//Get routes
router.get('/users', getUsersController);
router.get('/profile', userJWTDTO, getProfileController);
router.get('/posts', getPostsController);
router.get('/post/:id', getPostController);
router.get('/posts/:userId', getUserPostController);
router.get('/comments/:postId', getPostCommentsController);
router.get('/likes/:postId', getPostLikesController);
router.get('/follower/:followerId', getFollowerController);

//Post routes
router.post('/register', userRegisterController);
router.post('/log-in', userLogInController);
router.post('/post');
router.post('/comment');
router.post('/like');
router.post('/follower');

//Update routes
router.put('/update-profile');

//Delete routes
router.delete('user-delete');
router.delete('like-delete');

export default router;
