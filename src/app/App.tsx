import { HOCGameData, HOCLayout, HOCSession } from "common/components";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Landing } from "features/landing";
import { Game, Menu, Shop } from "features/game";
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
								<Route path="/game" element={<Game />}>
									<Route index element={<Menu />} />
									<Route path="shop" element={<Shop />} />
								</Route>
							</Routes>
						</HOCLayout>
					</HOCGameData>
				) : (
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				)}
			</Router>

			<LoginModal />
		</HOCSession>
	);
}

export default App;
