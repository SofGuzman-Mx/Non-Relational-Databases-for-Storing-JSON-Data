const Restaurant = require('../models/Restaurant');

// Obtener todos los restaurantes
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ promedioRating: -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un restaurante por ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo restaurante
exports.createRestaurant = async (req, res) => {
  const restaurant = new Restaurant({
    nombre: req.body.nombre
  });

  try {
    const nuevoRestaurant = await restaurant.save();
    res.status(201).json(nuevoRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Agregar una reseña a un restaurante
exports.addReview = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    const nuevaReview = {
      nombreUsuario: req.body.nombreUsuario,
      rating: req.body.rating,
      comentario: req.body.comentario
    };

    restaurant.reviews.push(nuevaReview);
    await restaurant.save(); // Automáticamente recalcula el promedio

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las reseñas de un restaurante
exports.getReviews = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json(restaurant.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una reseña
exports.deleteReview = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    restaurant.reviews.id(req.params.reviewId).deleteOne();
    await restaurant.save(); // Recalcula el promedio automáticamente

    res.json({ message: 'Reseña eliminada', restaurant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un restaurante
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    if (req.body.nombre) {
      restaurant.nombre = req.body.nombre;
    }

    const restaurantActualizado = await restaurant.save();
    res.json(restaurantActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un restaurante
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    await restaurant.deleteOne();
    res.json({ message: 'Restaurante eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};