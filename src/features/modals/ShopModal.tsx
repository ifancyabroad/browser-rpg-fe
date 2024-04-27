import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeShopModal, openErrorModal, openReplaceItemModal } from "./modalsSlice";
import { CharacterSheetTab, getAvailableItemSlot } from "common/utils";
import { useEffect } from "react";
import { buyItem, getIsTwoHandedWeaponEquipped, setCharacterSheetTab, viewItems } from "features/character";
import { getCurrentLocation } from "features/dungeon";
import { IArmour, IWeapon } from "common/types";
import { ShopItem } from "./ShopItem";

export const ShopModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.shopModalOpen);
	const isTwoHandedWeaponEquipped = useAppSelector(getIsTwoHandedWeaponEquipped);
	const character = useAppSelector((state) => state.character.character);
	const availableItems = character ? character.availableItems : [];
	const location = useAppSelector(getCurrentLocation);

	useEffect(() => {
		dispatch(setCharacterSheetTab(CharacterSheetTab.Inventory));
		dispatch(viewItems());
	}, [dispatch]);

	if (!character || !location) {
		return null;
	}

	const handleClose = () => {
		dispatch(closeShopModal());
	};

	const handleBuyItem = async (item: IArmour | IWeapon) => {
		try {
			const slot = getAvailableItemSlot(item, character.equipment, isTwoHandedWeaponEquipped);
			if (slot) {
				await dispatch(buyItem({ id: item.id, slot, location })).unwrap();
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
			<DialogTitle>Shop</DialogTitle>
			<DialogContent>
				<Stack sx={{ height: "100%", overflowY: "auto" }}>
					{availableItems.map((item) => (
						<ShopItem key={item.id} item={item} onBuyItem={handleBuyItem} />
					))}
				</Stack>
			</DialogContent>
			<DialogActions sx={{ justifyContent: "space-between" }}>
				<Box
					sx={{
						flex: 1,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: 1,
						height: "100%",
					}}
				>
					Gold: {character.gold}
				</Box>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};
