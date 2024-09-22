import { useDungeonContext } from "common/context";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { rest } from "features/character";
import { ConfirmationModal, openErrorModal, openShopModal } from "features/modals";
import { startBattle } from "features/battle";
import { Fragment } from "react";
import { TileType } from "common/utils";
import { Box } from "@mui/material";

export const RoomModals: React.FC = () => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	const characterStatus = useAppSelector((state) => state.character.status);
	const isCharacterLoading = characterStatus === "loading";
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

	const handleExit = async () => {
		try {
			// TODO: Allow user to choose starting level
			await dispatch(startBattle({ level: 1 })).unwrap();
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

	const { gold, restPrice } = character;
	const isRestDisabled = gold < restPrice;

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
				disabled={isCharacterLoading || isRestDisabled}
			/>
			<ConfirmationModal
				title="Travelling Merchant"
				content="Hello there! I have a few items for sale. Would you like to take a look?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenShop}
				open={state[TileType.Merchant]}
			/>
			<ConfirmationModal
				title="Ready?"
				content="This is the entrance to the forest. Once you enter you will not be able to return to town until you have slain at least one monster."
				handleClose={closeConfirmationModal}
				handleConfirm={handleExit}
				open={state[TileType.Exit]}
				disabled={isCharacterLoading}
			/>
		</Fragment>
	);
};
