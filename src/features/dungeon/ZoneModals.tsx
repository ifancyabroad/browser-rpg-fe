import { useDungeonContext } from "common/context";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { rest, salvageGold } from "features/character";
import {
	ConfirmationModal,
	InfoModal,
	openErrorModal,
	openFinalBattleModal,
	openPotionSellerModal,
	openShopModal,
} from "features/modals";
import { startBattle } from "features/battle";
import { Fragment } from "react";
import { FINAL_LEVEL, TileType } from "common/utils";
import { Box } from "@mui/material";
import { openLeaderboard } from "features/leaderboard";

export const RoomModals: React.FC = () => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	const characterStatus = useAppSelector((state) => state.character.status);
	const isCharacterLoading = characterStatus === "loading";
	const battleStatus = useAppSelector((state) => state.battle.status);
	const isBattleLoading = battleStatus === "loading";
	const { state, dispatch: localDispatch } = useDungeonContext();

	const handleRest = async () => {
		try {
			await dispatch(rest()).unwrap();
			localDispatch({ type: "CLOSE" });
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleOpenShop = () => {
		dispatch(openShopModal());
		localDispatch({ type: "CLOSE" });
	};

	const handleOpenPotionSeller = () => {
		dispatch(openPotionSellerModal());
		localDispatch({ type: "CLOSE" });
	};

	const handleExit = async () => {
		if (character && character.maxBattleLevel === FINAL_LEVEL - 1) {
			dispatch(openFinalBattleModal());
			localDispatch({ type: "CLOSE" });
			return;
		}

		try {
			await dispatch(startBattle()).unwrap();
			localDispatch({ type: "CLOSE" });
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleOpenLeaderboard = () => {
		dispatch(openLeaderboard());
		localDispatch({ type: "CLOSE" });
	};

	const handleSalvage = async () => {
		try {
			await dispatch(salvageGold()).unwrap();
			localDispatch({ type: "CLOSE" });
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const closeConfirmationModal = () => {
		localDispatch({ type: "CLOSE" });
	};

	if (!character) {
		return null;
	}

	const { gold, restPrice, salvage } = character;
	const isRestDisabled = isCharacterLoading || gold < restPrice;

	return (
		<Fragment>
			<ConfirmationModal
				title="Tavern"
				content={
					<Fragment>
						Would you like to rest at the tavern?
						<br /> It will cost you{" "}
						<Box component="span" color="text.secondary">
							{restPrice} gold
						</Box>
						.
					</Fragment>
				}
				handleClose={closeConfirmationModal}
				handleConfirm={handleRest}
				open={state[TileType.Rest]}
				disabled={isRestDisabled}
			/>
			<ConfirmationModal
				title="Travelling Merchant"
				content="Would you like to browse their wares?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenShop}
				open={state[TileType.Merchant]}
			/>
			<ConfirmationModal
				title="Potion Seller"
				content="Would you like to see what they have for sale?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenPotionSeller}
				open={state[TileType.Hut]}
			/>
			<ConfirmationModal
				title="Ready?"
				content="The exit is just ahead. Are you ready to leave?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleExit}
				open={state[TileType.Exit]}
				disabled={isBattleLoading}
			/>
			<ConfirmationModal
				title="Monument of Heroes"
				content="Here lies a monument to the heroes who have come before you. Would you like to take a look?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenLeaderboard}
				open={state[TileType.Leaderboard]}
			/>
			{salvage.value > 0 ? (
				<ConfirmationModal
					title="Salvage"
					content={
						<Fragment>
							Would you like to salvage{" "}
							<Box component="span" color="text.secondary">
								{salvage.value} gold
							</Box>{" "}
							from your last character?
						</Fragment>
					}
					handleClose={closeConfirmationModal}
					handleConfirm={handleSalvage}
					open={state[TileType.Salvage]}
					disabled={isCharacterLoading}
				/>
			) : (
				<InfoModal
					title="Salvage"
					content="There is nothing to salvage. When a hero falls or retires, they will leave behind some gold for the next hero."
					handleClose={closeConfirmationModal}
					open={state[TileType.Salvage]}
				/>
			)}
		</Fragment>
	);
};
