import { Box, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { State, Status } from "common/utils";
import { BattleModal } from "features/battle";
import { CharacterSheet } from "features/character";
import {
	GameOverModal,
	LevelUpModal,
	ReplaceItemModal,
	RewardsModal,
	ShopModal,
	TreasureModal,
	openBattleModal,
} from "features/modals";
import { Fragment, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const Game: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (character?.state === State.Battle) {
			dispatch(openBattleModal());
		}
	}, [dispatch, character]);

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
					<Container disableGutters sx={{ ml: 0 }}>
						<Box
							sx={{
								height: "100vh",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Outlet />
						</Box>
					</Container>
				</Box>
			</Box>

			<RewardsModal />
			<ReplaceItemModal />
			<LevelUpModal />
			<TreasureModal />
			<GameOverModal />
			<ShopModal />
			<BattleModal />
		</Fragment>
	);
};
