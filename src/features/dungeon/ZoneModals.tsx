import { useDungeonContext } from "common/context";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { rest } from "features/character";
import { ConfirmationModal, openErrorModal, openPotionSellerModal, openShopModal } from "features/modals";
import { startBattle } from "features/battle";
import { Fragment } from "react";
import { TileType } from "common/utils";
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

	const closeConfirmationModal = () => {
		localDispatch({ type: "CLOSE" });
	};

	if (!character) {
		return null;
	}

	const { gold, restPrice } = character;
	const isRestDisabled = isCharacterLoading || gold < restPrice;

	return (
		<Fragment>
			<ConfirmationModal
				title="Tavern"
				content={
					<Fragment>
						Welcome traveller! I have a room available for the night. It will cost you{" "}
						<Box component="span" color="text.secondary">
							{restPrice} gold
						</Box>
						. Would you like to rest?
					</Fragment>
				}
				handleClose={closeConfirmationModal}
				handleConfirm={handleRest}
				open={state[TileType.Rest]}
				disabled={isRestDisabled}
			/>
			<ConfirmationModal
				title="Travelling Merchant"
				content="Hello there! I have a few items for sale. Would you like to take a look?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenShop}
				open={state[TileType.Merchant]}
			/>
			<ConfirmationModal
				title="Potion Seller"
				content="Welcome to my humble abode. I have potions for sale. Would you like to take a look?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenPotionSeller}
				open={state[TileType.Hut]}
			/>
			<ConfirmationModal
				title="Ready?"
				content="Beyond this gate lies the unknown. Are you ready to begin your adventure?"
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
		</Fragment>
	);
};
