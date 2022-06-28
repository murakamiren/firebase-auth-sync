import express from "express";
import cors from "cors";
import AuthMiddleware from "./middleware/auth";

const app: express.Express = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(AuthMiddleware.decodeToken);

app.get("/api/some", async (req, res) => {
	console.log(req.headers);

	return res.json({
		some: [
			{ id: 1, thing: "test" },
			{ id: 2, thing: "todo" },
			{ id: 3, thing: "hello world" },
		],
	});
});

app.listen(port, () => {
	console.log(`open port: ${port}`);
});
