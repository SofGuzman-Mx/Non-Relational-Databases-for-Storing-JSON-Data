import Restaurant from '../models/Restaurant.js';

// @desc    Get all restaurants
// @route   GET /api/restaurants
export const getAllRestaurants = async (req, res) => {
    try {
        // --- LÓGICA DE BÚSQUEDA (FILTRADO) ---
        const queryObject = { ...req.query };
        const excludedFields = ['sort', 'page', 'limit'];
        excludedFields.forEach(el => delete queryObject[el]);

        // Permite búsquedas flexibles por nombre (insensible a mayúsculas)
        if (queryObject.name) {
            queryObject.name = { $regex: queryObject.name, $options: 'i' };
        }

        let query = Restaurant.find(queryObject);

        // --- LÓGICA DE ORDENAMIENTO ---
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            // Ordenamiento por defecto si no se especifica
            query = query.sort('-createdAt'); 
        }

        const restaurants = await query;

        res.status(200).json({
            status: 'success',
            results: restaurants.length,
            data: {
                restaurants,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get a single restaurant by ID, populated with its reviews
// @route   GET /api/restaurants/:id
export const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate('reviews');

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new restaurant
// @route   POST /api/restaurants
export const createRestaurant = async (req, res) => {
    try {
        const { name, cuisine, address } = req.body;

        const restaurant = new Restaurant({
            name,
            cuisine,
            address,
        });

        const createdRestaurant = await restaurant.save();
        res.status(201).json(createdRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a restaurant
// @route   DELETE /api/restaurants/:id
export const deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        
        await restaurant.deleteOne();
        res.status(200).json({ message: 'Restaurant removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// --- 👇 NUEVA FUNCIÓN AÑADIDA AQUÍ 👇 ---

// @desc    Update a restaurant
// @route   PUT /api/restaurants/:id
export const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id, // El ID del restaurante a actualizar
            req.body,      // Los datos nuevos que envías en el JSON
            { new: true, runValidators: true } // Opciones: devuelve el documento nuevo y corre las validaciones del schema
        );

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.status(200).json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};