import express from 'express'
import authController from '../controllers/AuthController.js'
import authValidator from '../middleware/authValidator.js'
import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()

//User routes
router.get('/profile', verifyJWT, authController.getMe)

router.post(
    '/register',
    authValidator.createUserValidator,
    authController.createUser
)
router.post('/login', authValidator.loginValidator, authController.login)
router.post('/logout', authController.logout)
router.put(
    '/reset/password',
    authValidator.resetPasswordValidator,
    authController.resetPassword
)
router.delete('/delete/me', verifyJWT, authController.deleteMe)

// Google OAuth routes
router.get('/google', authController.googleAuth)
router.get('/google/callback', authController.googleCallback)

export default router
