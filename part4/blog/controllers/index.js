const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
	if (req.isAuthenticated) {
		return res.status(201).json({
			token: req.token
		});
	}
	try {
		const {
			username,
			password
		} = req.body;
		const savedUser = await User.findOne({
			username
		});
		if (savedUser === null) {
			return res.status(400).json({
				error: "Username does not exist."
			});
		};

		if (savedUser !== null && bcrypt.compareSync(password, savedUser.passwordHash)) {
			const token = jwt.sign({
				username,
				id: savedUser._id
			}, config.JWT_SECRET);
			res.status(201).json({
				token,
				username
			});
		} else {
			res.status(401).json({
				error: "Invalid username or password."
			})
		}
	} catch (err) {
		next(err);
	}
});

module.exports = router;