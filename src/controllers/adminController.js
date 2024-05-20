const User = require('../models/userModel');
// const Product = require('../models/productModel'); // Assuming you have a cart model
// const Cart = require('../models/cartModel'); // Assuming you have a cart model
// const Order = require('../models/orderModel'); // Assuming you have an order model

// Get all users
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().select('-password');
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
 };

// Get user by ID
const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// Update user by ID
const updateUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const { name, email, roles } = req.body;
		user.name = name || user.name;
		user.email = email || user.email;
		user.roles = roles || user.roles;

		await user.save();

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// Delete user by ID
const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		await user.remove();
		res.status(200).json({ message: 'User deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

// CRUD operations for products, carts, and orders should be similar to above

module.exports = {
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser
};


