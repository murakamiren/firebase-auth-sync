import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./libs/firebase";

const App = () => {
	const loginWithGoogle = async () => {
		const signIn = await signInWithPopup(auth, provider);
		const result = await signIn.user;
	};

	return (
		<div>
			<p>aaaa</p>
		</div>
	);
};

export default App;
