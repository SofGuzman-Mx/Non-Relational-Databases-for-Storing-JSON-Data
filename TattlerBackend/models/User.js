import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
        // Note: We will need to hash this password before saving!
        // We typically use a library like bcrypt.js for this in the user controller.
    },
    preferences: {
        type: [String] // An array of strings, e.g., ['Italian', 'Spicy', 'Outdoor Seating']
    }
}, {
    // This option adds `createdAt` and `updatedAt` fields automatically
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;