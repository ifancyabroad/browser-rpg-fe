import { Box } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { State, Status } from "common/utils";
import { CharacterSheet } from "features/character";
import { GameOverModal, LevelUpModal, ReplaceItemModal, RewardsModal } from "features/modals";
import { Fragment, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const Game: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const navigate = useNavigate();

	useEffect(() => {
		if (character?.state === State.Battle) {
			navigate("/game/battle");
		}
	}, [navigate, character]);

	if (!character) {
		return <Navigate to="/" />;
	}

	if (character.status === Status.Retired) {
		return <Navigate to="/" />;
	}

	return (
		<Fragment>
			<Box display="flex">
				<CharacterSheet />
				<Box
					sx={{
						flexGrow: 1,
						height: "calc(100vh - 52px)",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Outlet />
				</Box>
			</Box>

			<RewardsModal />
			<ReplaceItemModal />
			<LevelUpModal />
			<GameOverModal />
		</Fragment>
	);
};
