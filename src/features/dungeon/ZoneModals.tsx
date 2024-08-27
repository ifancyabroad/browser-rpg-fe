import { useDungeonContext } from "common/context";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { nextZone, rest } from "features/character";
import { ConfirmationModal, openErrorModal, openShopModal, openTreasureModal } from "features/modals";
import { startBattle } from "features/battle";
import { Fragment } from "react";
import { ZoneModalType } from "common/utils";

export const RoomModals: React.FC = () => {
	const dispatch = useAppDispatch();
	const battleStatus = useAppSelector((state) => state.battle.status);
	const isBattleLoading = battleStatus === "loading";
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

	const handleStartBattle = async () => {
		try {
			await dispatch(startBattle()).unwrap();
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

	const handleOpenChest = async () => {
		dispatch(openTreasureModal());
		localDispatch({ type: "CLOSE" });
	};

	const handleExit = async () => {
		try {
			await dispatch(nextZone()).unwrap();
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
				open={state[ZoneModalType.Rest]}
				disabled={isCharacterLoading}
			/>
			<ConfirmationModal
				title="Start Battle"
				content="You have been ambushed by an enemy and must defend yourself!"
				handleClose={closeConfirmationModal}
				handleConfirm={handleStartBattle}
				open={state[ZoneModalType.Battle]}
				disabled={isBattleLoading}
			/>
			<ConfirmationModal
				title="Fight Boss"
				content="As you make your way to the exit you are stopped in your tracks by a powerful foe."
				handleClose={closeConfirmationModal}
				handleConfirm={handleStartBattle}
				open={state[ZoneModalType.Boss]}
				disabled={isBattleLoading}
			/>
			<ConfirmationModal
				title="Visit Merchant?"
				content="You come across a merchant interested in selling some items he has discovered."
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenShop}
				open={state[ZoneModalType.Shop]}
			/>
			<ConfirmationModal
				title="Open Chest?"
				content="You find a treasure chest waiting to be opened."
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenChest}
				open={state[ZoneModalType.Treasure]}
			/>
			<ConfirmationModal
				title="Descend"
				content="You have found a staircase descending further into the dungeon, are you ready to proceed?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleExit}
				open={state[ZoneModalType.Exit]}
				disabled={isCharacterLoading}
			/>
		</Fragment>
	);
};
