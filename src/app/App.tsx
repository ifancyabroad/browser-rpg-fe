import { HOCLayout, HOCSession } from "common/components";
import { AuthContext } from "common/context";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing } from "features/landing";
import { Game } from "features/game";

function App() {
	const user = useContext(AuthContext);

	return (
		<HOCSession>
			<Router>
				<HOCLayout>
					<Routes>
						{user ? <Route path="/" element={<Game />} /> : <Route path="/" element={<Landing />} />}
					</Routes>
				</HOCLayout>
			</Router>
		</HOCSession>
	);
}

export default App;
