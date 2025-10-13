import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Revisar si el token existe en los headers y si empieza con "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Obtener el token del string "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // 3. Verificar la validez del token con la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Buscar al usuario por el ID del token y adjuntarlo al objeto `req`
            // Se excluye la contraseña para no exponerla
            req.user = await User.findById(decoded.id).select('-password');

            // 5. Si todo es correcto, pasar al siguiente paso (el controlador de la ruta)
            next();
        } catch (error) {
            console.error(error);
            res.status(401); // 401: No autorizado
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export { protect };