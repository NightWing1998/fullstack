const
	express = require("express"),
	app = express(),
	cors = require("cors"),
	mongoose = require("mongoose"),
	constants = require("./utils/constants"),
	blogRouter = require("./controllers/blogs");

app.use(cors());
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());

mongoose.connect(constants.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true
}, (err) => {
	if (err) console.error(err);
	else console.log("Connected to DB");
});

app.get("/", (req, res) => {
	res.status(200).send("Hello");
});

app.use("/api/blogs", blogRouter);

module.exports = app;