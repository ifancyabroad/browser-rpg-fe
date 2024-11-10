import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeShopModal, openErrorModal, openReplaceItemModal } from "./modalsSlice";
import { getAvailableItemSlot, getItemsToReplace, getRandomElement, MERCHANT_QUOTES } from "common/utils";
import { useEffect, useState } from "react";
import { buyItem, getIsTwoHandedWeaponEquipped, restockItems, viewItems } from "features/character";
import { IArmour, IWeapon } from "common/types";
import { ShopItem } from "./ShopItem";
import merchant from "assets/images/icons/Merchant_nb.png";

export const ShopModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.shopModalOpen);
	const isTwoHandedWeaponEquipped = useAppSelector(getIsTwoHandedWeaponEquipped);
	const character = useAppSelector((state) => state.character.character);
	const availableItems = character ? character.availableItems : [];
	const isRestockDisabled = character ? character.gold < character.restockPrice : true;
	const [currentQuote, setCurrentQuote] = useState(getRandomElement(MERCHANT_QUOTES));

	useEffect(() => {
		if (!open) {
			setCurrentQuote(getRandomElement(MERCHANT_QUOTES));
		}
	}, [open]);

	useEffect(() => {
		if (open) {
			dispatch(viewItems());
		}
	}, [dispatch, open]);

	if (!character) {
		return null;
	}

	const handleClose = () => {
		dispatch(closeShopModal());
	};

	const handleBuyItem = async (item: IArmour | IWeapon) => {
		try {
			const slot = getAvailableItemSlot(item, character.equipment, isTwoHandedWeaponEquipped);
			if (slot) {
				await dispatch(buyItem({ id: item.id, slot })).unwrap();
				return Promise.resolve();
			}

			dispatch(openReplaceItemModal({ item }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleRestock = async () => {
		try {
			await dispatch(restockItems()).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm">
			<DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
				<Box>
					<Box
						component="img"
						src={merchant}
						alt="Merchant"
						width={40}
						borderRadius="50%"
						sx={{ verticalAlign: "middle" }}
						mr={1}
					/>
					Merchant
				</Box>
				<Typography component="span" fontSize={16}>
					<Typography component="span" color="secondary">
						Gold:{" "}
					</Typography>
					{character.gold}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center" fontStyle="italic" mb={2}>
					{currentQuote}
				</DialogContentText>
				<Box
					display="grid"
					justifyContent="center"
					gridTemplateColumns={{ xs: "repeat(1, 1fr)", md: "repeat(2, minmax(0, 1fr))" }}
					gap={1}
				>
					{availableItems.map((item) => (
						<ShopItem
							key={item.id}
							item={item}
							replaceItems={getItemsToReplace(item, character.equipment, isTwoHandedWeaponEquipped)}
							onBuyItem={handleBuyItem}
						/>
					))}
				</Box>
			</DialogContent>
			<DialogActions>
				<Link component="button" color="text.secondary" onClick={handleRestock} disabled={isRestockDisabled}>
					Restock - {character.restockPrice}g
				</Link>
				<Link component="button" onClick={handleClose}>
					Close
				</Link>
			</DialogActions>
		</Dialog>
	);
};
