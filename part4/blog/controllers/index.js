const router = require("express").Router();

router.post("/login", async (req, res, next) => {
	if (req.isAuthenticated) {
		res.status(201).json({
			token: req.token
		});
	}
	try {
		const {
			username,
			password
		} = req.body;
	} catch (err) {
		next(err);
	}
});

module.exports = router;