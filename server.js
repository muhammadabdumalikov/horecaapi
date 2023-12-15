require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const helmet = require("helmet");
const { sessionMiddleware } = require("./src/middlewares/session");

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(helmet());
app.set("trust proxy", 1);
app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/agent", agentRoutes);

// Not Found Route

// Listen server
server.listen(PORT, () => {
	console.log(`SERVER LISTEN  ${PORT}`);
});
