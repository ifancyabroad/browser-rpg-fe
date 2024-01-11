import { Box, Container } from "@mui/material";
import { CharacterButton } from "common/components";
import { useAppSelector } from "common/hooks";
import { State, Status } from "common/utils";
import { CharacterSheet } from "features/character";
import { GameOverModal, LevelUpModal, ReplaceItemModal, RewardsModal, TreasureModal } from "features/modals";
import { Fragment, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { GameBar } from "./GameBar";

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
				<Box flex={1} overflow="auto">
					<GameBar />
					<Container>
						<Box
							sx={{
								height: "calc(100vh - 102px)",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Outlet />
						</Box>
					</Container>
				</Box>
			</Box>

			<CharacterButton />
			<RewardsModal />
			<ReplaceItemModal />
			<LevelUpModal />
			<TreasureModal />
			<GameOverModal />
		</Fragment>
	);
};
