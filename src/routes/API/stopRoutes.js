import express from 'express'
import stopsController from '../controllers/stopsController.js'
import verifRole from '../middleware/verifyRole.js'
import verifyJWT from 'middleware/verifyJWT.js'

const router = express.Router()

// Public routes
router.get('/stops', verifyJWT, stopsController.getAllStops)
router.get('/stops/:id', verifyJWT, stopsController.getStopById)

// Admin routes
router.post('/stops', isAdmin, stopsController.createStop)
router.put('/stops/:id', isAdmin, stopsController.updateStop)
router.delete('/stops/:id', isAdmin, stopsController.deleteStop)

export default router
