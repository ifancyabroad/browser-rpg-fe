import { Box, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { State, Status } from "common/utils";
import { BattleModal, CombatLogModal } from "features/battle";
import { CharacterSheet } from "features/character";
import {
	GameOverModal,
	HowToPlayModal,
	LevelUpModal,
	PotionSellerModal,
	ReplaceItemModal,
	RewardsModal,
	ShopModal,
	TreasureModal,
	VictoryModal,
	openBattleModal,
	openHowToPlayModal,
} from "features/modals";
import { Fragment, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Game: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const dispatch = useAppDispatch();
	const hasSeenTutorial = localStorage.getItem("tutorial") === "true";

	useEffect(() => {
		if (!hasSeenTutorial) {
			dispatch(openHowToPlayModal());
		}
	}, [dispatch, hasSeenTutorial]);

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
								height: "100svh",
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Header />
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
			<PotionSellerModal />
			<BattleModal />
			<CombatLogModal />
			<VictoryModal />
			<HowToPlayModal />
		</Fragment>
	);
};
