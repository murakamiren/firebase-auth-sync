import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { auth, provider } from "./libs/firebase";

const App: FC = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [token, setToken] = useState<string>("");

	const loginWithGoogle = async () => {
		const signIn = await signInWithPopup(auth, provider);
		const result = await signIn.user;
		console.log(result);
		if (result) {
			setIsAuth(true);
			console.log("login");
		} else {
			setIsAuth(false);
			console.log("cant login");
		}
	};

	const logout = async () => {
		await signOut(auth);
		console.log("logout");
	};

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				setIsAuth(true);
				const getToken = await user.getIdToken();
				await setToken(getToken);
				console.log(`user found token: ${token}`);
			} else {
				setIsAuth(false);
				console.log("user not found");
			}
		});
	}, []);

	return (
		<div>
			<p>{isAuth ? "hello world" : "not auth"}</p>
			<button onClick={loginWithGoogle}>sign in with google</button>
			<button onClick={logout}>logout</button>
		</div>
	);
};

export default App;
