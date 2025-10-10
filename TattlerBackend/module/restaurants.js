const mongoose = require('mongoose');

// Sub-esquema para las reseñas (comentarios)
const reviewSchema = new mongoose.Schema({
  nombreUsuario: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comentario: {
    type: String,
    required: true,
    minlength: 5
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

// Esquema principal del restaurante
const restaurantSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  reviews: [reviewSchema], // Array de reseñas dentro del restaurante
  promedioRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Método para calcular el promedio automáticamente
restaurantSchema.methods.calcularPromedio = function() {
  if (this.reviews.length === 0) {
    this.promedioRating = 0;
    this.totalReviews = 0;
  } else {
    const suma = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.promedioRating = Math.round((suma / this.reviews.length) * 10) / 10;
    this.totalReviews = this.reviews.length;
  }
};

// Antes de guardar, calcular el promedio
restaurantSchema.pre('save', function(next) {
  this.calcularPromedio();
  next();
});

module.exports = mongoose.model('Restaurant', restaurantSchema);