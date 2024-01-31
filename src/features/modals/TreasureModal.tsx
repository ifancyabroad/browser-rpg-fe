import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeTreasureModal, openErrorModal, openReplaceItemModal } from "./modalsSlice";
import { getAvailableItemSlot } from "common/utils";
import { Gold, TreasureItem } from "./TreasureItem";
import { IArmour, IWeapon } from "common/types";
import { getIsTwoHandedWeaponEquipped, getTreasure, getTreasureByLocation, takeTreasure } from "features/character";
import { getCurrentLocation } from "features/dungeon";
import { useEffect } from "react";
import { Loader } from "common/components";

export const TreasureModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.treasureModalOpen);
	const isTwoHandedWeaponEquipped = useAppSelector(getIsTwoHandedWeaponEquipped);
	const character = useAppSelector((state) => state.character.character);
	const location = useAppSelector(getCurrentLocation);
	const treasure = useAppSelector(getTreasureByLocation);

	useEffect(() => {
		if (treasure || !location || !open) {
			return;
		}

		const fetchData = async () => {
			try {
				await dispatch(getTreasure(location)).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		fetchData();
	}, [dispatch, treasure, location, open]);

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

	const handleTakeGold = async () => {
		try {
			await dispatch(takeTreasure({ location })).unwrap();
			dispatch(closeTreasureModal());
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md">
			<DialogTitle id="form-dialog-title">You have found treasure!</DialogTitle>
			<DialogContent>
				{treasure ? (
					<Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap">
						{treasure.items.map((item) => (
							<TreasureItem key={item.id} item={item} onTakeItem={handleTakeItem} />
						))}
						<Gold onTake={handleTakeGold} />
					</Stack>
				) : (
					<Loader />
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" variant="contained">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};