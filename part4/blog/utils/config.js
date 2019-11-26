require("dotenv").config();

module.exports = {
	MONGODB_URI: process.env.NODE_ENV === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI,
	PORT: process.env.PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS)
};