import { NextFunction, Request, Response } from "express";
import admin from "../libs/firebase";

class AuthMiddleware {
	async decodeToken(req: Request, res: Response, next: NextFunction) {
		if (req.headers.authorization) {
			const token = await req.headers.authorization.split(" ")[1];
			try {
				const decodeValue = await admin.auth().verifyIdToken(token);
				if (decodeValue) {
					console.log("ok");
					return next();
				}
				return res.json({ message: "token is not verified!" });
			} catch (e) {
				console.log(e);
				return res.json({ message: "token is not verified!" });
			}
		}
	}
}

export default new AuthMiddleware();
