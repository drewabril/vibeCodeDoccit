import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { validateLogin, validateRegistration } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', validateLogin, login);
router.post('/register', validateRegistration, register);

export default router;