import express from 'express';
import {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    deleteRestaurant,
} from '../controllers/restaurantController.js';

const router = express.Router();

router.route('/').get(getAllRestaurants).post(createRestaurant);
router.route('/:id').get(getRestaurantById).delete(deleteRestaurant);

export default router;