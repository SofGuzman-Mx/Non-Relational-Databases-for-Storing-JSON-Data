import express from 'express';

// ✅ 1. SE AÑADIERON LAS IMPORTACIONES FALTANTES
import { registerUser, loginUser, getMe } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Rutas para registrar y hacer login
router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ 2. RUTA PROTEGIDA (esta línea ahora funcionará)
router.get('/me', protect, getMe);

export default router;