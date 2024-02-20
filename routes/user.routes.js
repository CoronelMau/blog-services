import { Router } from 'express';

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

//Data Transfer Objects
import userJWTDTO from '../dto/user-jwt.dto.js';
import likeDeleteController from '../controllers/like-delete.controller.js';

//Router
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
router.post('/post', postRegisterController);
router.post('/comment', commentRegisterController);
router.post('/like', likeRegisterController);
router.post('/follow', followerRegisterController);

//Update routes
router.put('/update-profile', userJWTDTO, userUpdateController);
router.put('/update-pwd', userJWTDTO, passwordUpdateController);

//Delete routes
router.put('/user-delete', userJWTDTO, userDeleteController);
router.delete('/like-delete', userJWTDTO, likeDeleteController);
router.delete('/follower-delete');

export default router;
