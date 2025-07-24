import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors"

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import { pathToRegexp } from "path-to-regexp";

import connectDB from "./db/connectDB.js";

dotenv.config();
const app = express();
// try {
//   app._router.stack.forEach((layer) => {
//     if (layer.route && layer.route.path) {
//       console.log("Checking route:", layer.route.path);
//       pathToRegexp(layer.route.path);  // Will throw if malformed
//     }
//   });
// } catch (err) {
//   console.error("❌ Crashed route:", err.message);
// }

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({
	// origin : "http://localhost:3000",
	origin : "https://x-clone-1-f7zi.onrender.com",
	credentials : true
}))

app.use(express.urlencoded(
	{
		extended : true
	}
))

app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser());

app.use(express.json({ limit: "5mb" })); // to parse req.body
// limit shouldn't be too high to prevent DOS

// console.log("Registering auth routes");
app.use("/api/auth", authRoutes);

// console.log("Registering user routes");
app.use("/api/users", userRoutes);

// console.log("Registering post routes");
app.use("/api/posts", postRoutes);

// console.log("Registering notification routes");
app.use("/api/notifications", notificationRoutes);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));
	
	try {
		app.get("/*", (req, res) => {
			res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
		});
		console.log("Registered wildcard route ✅");
	} catch (err) {
		console.error("❌ Failed to register wildcard route:", err);
	}
}

app.listen(PORT, () => {
    console.log(`${PORT} Server is Running...`);
    connectDB();
}
)
