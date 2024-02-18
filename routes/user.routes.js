import { Router } from 'express';
import getUsersController from '../controllers/users.controller.js';
import getProfileController from '../controllers/user-profile.controller.js';

const router = Router();

//Get routes
router.get('/users', getUsersController);
router.get('/profile/:id', getProfileController);
router.get('/posts');
router.get('/posts/:id');
router.get('/comments');
router.get('/likes');
router.get('/follower/:id');

//Post routes
router.post('/log-in');
router.post('/register');
router.post('/post');
router.post('/post-comment');
router.post('/post-like');

//Update routes
router.put('/update-profile');

//Delete routes
router.delete('user-delete');
router.delete('like-delete');

export default router;
