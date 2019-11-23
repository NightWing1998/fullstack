const
	express = require("express"),
	app = express(),
	cors = require("cors"),
	mongoose = require("mongoose"),
	constants = require("./utils/config"),
	blogRouter = require("./controllers/blogs"),
	middleware = require("./utils/middleware"),
	logger = require("./utils/logger");

app.use(cors());
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());

app.use(middleware.requestLogger);

logger.info("Connecting to", constants.MONGODB_URI);
mongoose.connect(constants.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}, (err) => {
	if (err) logger.error(err);
	else logger.info("Connected to DB");
});

app.get("/", (req, res) => {
	res.status(200).send("Hello");
});

app.use("/api/blog", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;