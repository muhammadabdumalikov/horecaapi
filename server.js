require("dotenv").config();
const express = require("express");
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
app.use(helmet());
app.set("trust proxy", 1);
app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
const categoryRoutes = require("./src/routes/categories");
const companyRoutes = require("./src/routes/companies");
const agentRoutes = require("./src/routes/agents");
const productRoutes = require("./src/routes/products");
const notificationRoutes = require("./src/routes/notification");
const orderRoutes = require("./src/routes/orders");

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/product", productRoutes);
app.use("/api/ntf", notificationRoutes);
app.use("/api/order", orderRoutes);

// Not Found Route

// Listen server
server.listen(PORT, () => {
	console.log(`SERVER LISTEN  ${PORT}`);
});
