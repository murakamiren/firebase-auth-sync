import axios from "axios";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { useAxios } from "./hooks/useAxios";
import { auth, provider } from "./libs/firebase";
import { someType } from "./types/types";

const App: FC = () => {
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [token, setToken] = useState<string>("");
	const [some, setSome] = useState<someType[] | null>(null);
	const [errMsg, setErrMsg] = useState<string | null>(null);

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
		setToken("");
		setIsAuth(false);
		console.log("logout");
	};

	const fetchData = async () => {
		try {
			const res = await axios.get("http://localhost:5000/api/some", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			const data = res.data;
			if (data.message === "token is not verified!") {
				setErrMsg(data.message);
				return;
			}
			setSome(data.some);
			setErrMsg(null);
		} catch (err: any) {
			console.log(err);
			setErrMsg(err.message);
		}
	};

	const resetData = () => {
		setSome(null);
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
				setToken("");
				console.log("user not found");
			}
		});
	}, []);

	return (
		<div>
			<p>{isAuth ? "hello world" : "not auth"}</p>
			{isAuth ? (
				<button onClick={logout}>logout</button>
			) : (
				<button onClick={loginWithGoogle}>sign in with google</button>
			)}
			<button onClick={fetchData}>fetch data</button>
			<button onClick={resetData}>reset data</button>
			<div>
				{some ? (
					some.map((s) => (
						<p key={s.id}>
							{s.id}: {s.thing}
						</p>
					))
				) : (
					<p>ない</p>
				)}
			</div>
			<p>{errMsg && errMsg}</p>
		</div>
	);
};

export default App;
