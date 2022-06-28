import express from "express";
import cors from "cors";

const app: express.Express = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/some", async (req, res) => {
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
