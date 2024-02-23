import { HOCGameData, HOCLayout, HOCSession } from "common/components";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Landing } from "features/landing";
import { Game } from "features/game";
import {
	CharacterClassModal,
	EquipmentModal,
	ErrorModal,
	LoginModal,
	RegistrationModal,
	SkillModal,
} from "features/modals";
import { useAppSelector } from "common/hooks";
import { Start } from "features/start";
import { CharacterCreate } from "features/character";
import { Leaderboard } from "features/leaderboard";
import { Dungeon } from "features/dungeon";
import { Battle } from "features/battle";

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
									<Route index element={<Dungeon />} />
									<Route path="battle" element={<Battle />} />
								</Route>
							</Routes>
						</HOCLayout>
					</HOCGameData>
				) : (
					<HOCLayout>
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</HOCLayout>
				)}
			</Router>

			<Leaderboard />
			<EquipmentModal />
			<SkillModal />
			<CharacterClassModal />
			<LoginModal />
			<RegistrationModal />
			<ErrorModal />
		</HOCSession>
	);
}

export default App;
