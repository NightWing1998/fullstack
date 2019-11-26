const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const logger = require("../utils/logger");

router.post("/", async (req, res, next) => {
	try {
		const {
			username,
			name,
			password
		} = req.body;
		if (password.length < 3) {
			let err = new Error("Password length should be more than 3");
			err.name = "ValidationError";
			err._message = err.message;
			throw err;
		}
		const passwordHash = bcrypt.hashSync(password, config.SALT_ROUNDS);

		const newUser = new User({
			username,
			name,
			passwordHash
		});
		const savedUser = (await newUser.save()).toJSON();
		const token = jwt.sign({
			username,
			id: savedUser.id
		}, config.JWT_SECRET);
		res.status(201).json({
			user: savedUser,
			token
		});
	} catch (err) {
		if (err.errors && err.errors.username) {
			err._message = err.errors.username.message;
		}
		next(err);
	}
});

router.get("/", async (req, res, next) => {
	try {
		const allUsers = (await User.find({}).populate("blogs")).map(user => user.toJSON());
		res.status(200).json(allUsers);
	} catch (err) {
		next(err);
	}
});

module.exports = router;