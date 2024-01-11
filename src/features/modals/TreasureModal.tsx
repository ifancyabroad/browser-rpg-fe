import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeTreasureModal, openErrorModal, openReplaceItemModal } from "./modalsSlice";
import { getAvailableItemSlot } from "common/utils";
import { TreasureItem } from "./TreasureItem";
import { IArmour, IWeapon } from "common/types";
import { getIsTwoHandedWeaponEquipped, takeTreasure } from "features/character";
import { getCurrentLocation } from "features/dungeon";

export const TreasureModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, items } = useAppSelector((state) => state.modals.treasureModal);
	const isTwoHandedWeaponEquipped = useAppSelector(getIsTwoHandedWeaponEquipped);
	const character = useAppSelector((state) => state.character.character);
	const location = useAppSelector(getCurrentLocation);

	if (!character || !location) {
		return null;
	}

	const handleClose = () => {
		dispatch(closeTreasureModal());
	};

	const handleTakeItem = async (item: IArmour | IWeapon) => {
		try {
			const slot = getAvailableItemSlot(item, character.equipment, isTwoHandedWeaponEquipped);
			if (slot) {
				await dispatch(takeTreasure({ id: item.id, slot, location })).unwrap();
				dispatch(closeTreasureModal());
				return Promise.resolve();
			}

			dispatch(openReplaceItemModal({ item }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle id="form-dialog-title">You have found treasure!</DialogTitle>
			<DialogContent>
				<Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap">
					{items.map((item) => (
						<TreasureItem key={item.id} item={item} onTakeItem={handleTakeItem} />
					))}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" variant="contained">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
