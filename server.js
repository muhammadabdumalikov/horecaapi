require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");

const { sessionMiddleware } = require("./src/middlewares/session");

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	})
);
app.set("trust proxy", 1);
app.use(sessionMiddleware);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("views"));
app.use(fileUpload());
app.use(function (error, req, res, next) {
	if (error instanceof SyntaxError) {
		res.status(409).json({
			error: true,
			message: "Invalid Data",
		});
	} else {
		next();
	}
});

//ROUTES
const authRoutes = require("./src/routes/auth");
const authURoutes = require("./src/routes/users");
const categoryRoutes = require("./src/routes/categories");
const companyRoutes = require("./src/routes/companies");
const agentRoutes = require("./src/routes/agents");
const productRoutes = require("./src/routes/products");
const notificationRoutes = require("./src/routes/notification");
const orderRoutes = require("./src/routes/orders");
const regionRoutes = require("./src/routes/regions");
const aUserRoutes = require("./src/routes/a-users");

app.use("/api/auth", authRoutes);
app.use("/api/auth-u", authURoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/product", productRoutes);
app.use("/api/ntf", notificationRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/a-user", aUserRoutes);

// Not Found Route

// Listen server
server.listen(PORT, () => {
	console.log(`SERVER LISTEN  ${PORT}`);
});
