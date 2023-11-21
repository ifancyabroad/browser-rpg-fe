import { Box, Container } from "@mui/material";
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
				<Container>
					<Box
						sx={{
							minHeight: "calc(100vh - 53px)",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Outlet />
					</Box>
				</Container>
			</Box>

			<RewardsModal />
			<ReplaceItemModal />
			<LevelUpModal />
			<GameOverModal />
		</Fragment>
	);
};
