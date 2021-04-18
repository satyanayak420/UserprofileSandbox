import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getAllUsers,
  getUserProfile,
  getUserFirstName,
  getUserLastName,
} from '../controllers/userController.js'
import { protect, admin } from '../Middleware/authMiddleware.js'

router.route('/register').post(registerUser)
router.post('/login', authUser)
router.route('/').get(protect, admin, getAllUsers)
router.route('/:id/profile').get(protect, getUserProfile)
router.route('/:id/profile/firstname').get(protect, getUserFirstName)
router.route('/:id/profile/lastname').get(protect, getUserLastName)

export default router
