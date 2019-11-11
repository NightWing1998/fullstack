const
	app = require("./app"),
	http = require("http"),
	config = require("./utils/constants");

let server = http.createServer(app);

server.listen(config.PORT, (err) => {
	if (err) console.error(err);
	else console.log("Server started!!")
});