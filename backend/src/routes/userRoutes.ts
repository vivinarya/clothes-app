import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controller/UserContoller.ts';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);

export default router;