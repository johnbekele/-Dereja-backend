import express from 'express';
import authController from '../controllers/AuthController.js';
import verifyJWT from '../middleware/verifyJWT.js';
import { isAdmin, isModerator } from '../middleware/verifyRole.js';
import authValidator from '../middleware/authValidator.js';

const router = express.Router();

router.get('/profile', verifyJWT, authController.getMe);
router.get('/users', authController.users);
router.post('/register',authValidator.createUserValidator, authController.createUser);
router.post('/login',authValidator.loginValidator, authController.login);
router.post('/logout', authController.logout);
router.post('/escalate/:id', verifyJWT, isAdmin, authController.escalateUser);
router.delete('/delete/:id', verifyJWT, isAdmin, authController.deleteUser);
router.put('/freez/access/:id', verifyJWT, isAdmin, authController.freezUser);
router.put(
  '/restore/access/:id',
  verifyJWT,
  isAdmin,
  authController.unfreezUser
);
router.put('/reset/password',authValidator.resetPasswordValidator, authController.resetPassword);

router.post('/profile/:userId', authController.findUserProfile);
// Google OAuth routes
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

export default router;
