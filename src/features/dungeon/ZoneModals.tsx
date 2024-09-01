import { useDungeonContext } from "common/context";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { rest } from "features/character";
import { ConfirmationModal, openErrorModal, openShopModal } from "features/modals";
import { startBattle } from "features/battle";
import { Fragment } from "react";
import { TileType, Zone } from "common/utils";

export const RoomModals: React.FC = () => {
	const dispatch = useAppDispatch();
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
			// TODO: Change Zone to be dynamic
			await dispatch(startBattle({ zone: Zone.Forest })).unwrap();
			localDispatch({ type: "CLOSE" });
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const closeConfirmationModal = () => {
		localDispatch({ type: "CLOSE" });
	};

	return (
		<Fragment>
			<ConfirmationModal
				title="Rest?"
				content="You stumble upon an abandoned camp and a chance to rest for the night."
				handleClose={closeConfirmationModal}
				handleConfirm={handleRest}
				open={state[TileType.Rest]}
				disabled={isCharacterLoading}
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
