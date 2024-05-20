const User = require('../models/userModel');

// Get all users
const getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

// Get User by ID
const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Create a user
const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	const user = new User({
		name,
		email,
		password,
	});

	try {
		const createdUser = await user.save();
		res.status(201).json(createdUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Update User
const updateUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await User.findById(req.params.id);
		if (user) {
			user.name = name;
			user.email = email;
			user.password = password;

			const updatedUser = await user.save();
			res.json(updatedUser);
		} else {
			res.status(404).json({ message: 'Product not found' });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Delete a User
const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (user) {
			await user.remove();
			res.json({ message: 'User removed' });
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
 getUsers,
 getUserById,
 createUser,
 updateUser,
 deleteUser,
};

