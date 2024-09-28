import { Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeTreasureModal, openErrorModal, openReplaceItemModal } from "./modalsSlice";
import { getAvailableItemSlot } from "common/utils";
import { Gold, TreasureItem } from "./TreasureItem";
import { IArmour, IWeapon } from "common/types";
import { getIsTwoHandedWeaponEquipped } from "features/character";
import { takeTreasure } from "features/battle";

export const TreasureModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.treasureModalOpen);
	const isTwoHandedWeaponEquipped = useAppSelector(getIsTwoHandedWeaponEquipped);
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.battle.battle);

	if (!battle || !battle.treasure || !character) {
		return null;
	}

	const handleTakeItem = async (item: IArmour | IWeapon) => {
		try {
			const slot = getAvailableItemSlot(item, character.equipment, isTwoHandedWeaponEquipped);
			if (slot) {
				await dispatch(takeTreasure({ id: item.id, slot })).unwrap();
				dispatch(closeTreasureModal());
				return Promise.resolve();
			}

			dispatch(openReplaceItemModal({ item }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleTakeGold = async () => {
		try {
			await dispatch(takeTreasure({})).unwrap();
			dispatch(closeTreasureModal());
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Dialog open={open}>
			<DialogTitle id="form-dialog-title" textAlign="center">
				Choose one treasure!
			</DialogTitle>
			<DialogContent>
				<Stack alignItems="center" justifyContent="center" spacing={1}>
					{battle.treasure.map((item) => (
						<TreasureItem key={item.id} item={item} onTakeItem={handleTakeItem} />
					))}
					<Gold level={battle.level} onTake={handleTakeGold} />
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
