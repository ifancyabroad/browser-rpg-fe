import { Box, Container } from "@mui/material";
import { CharacterButton } from "common/components";
import { useAppSelector } from "common/hooks";
import { State, Status } from "common/utils";
import { CharacterSheet } from "features/character";
import { GameOverModal, LevelUpModal, ReplaceItemModal, RewardsModal, TreasureModal } from "features/modals";
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
			<Box bgcolor="#000" display="flex">
				<CharacterSheet />
				<Box overflow="auto">
					<Container>
						<Box
							sx={{
								height: "calc(100vh - 53px)",
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
