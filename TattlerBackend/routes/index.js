import { Router } from 'express';

import restaurantRoutes from './restaurantRoutes.js';
//import reviewRoutes from './reviewRoutes.js';
import userRoutes from './userRoutes.js'; 

const routerMain = Router();

routerMain.use('/restaurants', restaurantRoutes);
//routerMain.use('/reviews', reviewRoutes);
routerMain.use('/users', userRoutes); 

export default routerMain;