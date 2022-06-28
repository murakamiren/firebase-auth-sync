import e = require("express");

const app = e();
const cors = require("cors");
const port = 5000;

app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cors);

app.get("/api/some", async (req, res) => {
	return res.json({
		some: [
			{ id: 1, thing: "test" },
			{ id: 1, thing: "todo" },
		],
	});
});

app.listen(port, () => {
	console.log("open");
});
