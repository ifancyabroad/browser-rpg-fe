import { HOCGameData, HOCLayout, HOCSession } from "common/components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing } from "features/landing";
import { Game } from "features/game";
import { LoginModal } from "features/modals";
import { useAppSelector } from "common/hooks";
import { Start } from "features/start";
import { CharacterCreate } from "features/character";

function App() {
	const isLoggedIn = useAppSelector((state) => state.authentication.session);

	return (
		<HOCSession>
			<Router>
				{isLoggedIn ? (
					<HOCGameData>
						<HOCLayout>
							<Routes>
								<Route path="/" element={<Start />} />
								<Route path="/create" element={<CharacterCreate />} />
								<Route path="/game" element={<Game />} />
							</Routes>
						</HOCLayout>
					</HOCGameData>
				) : (
					<Routes>
						<Route path="/" element={<Landing />} />
					</Routes>
				)}
			</Router>

			<LoginModal />
		</HOCSession>
	);
}

export default App;
