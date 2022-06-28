import firebaseAdmin from "firebase-admin";

const admin = firebaseAdmin;

const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export default admin;
