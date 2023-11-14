import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import { CharacterSheetTab, getAvailableItemSlot } from "common/utils";
import { ShopItem } from "./ShopItem";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { buyItem, getIsTwoHandedWeaponEquipped, setCharacterSheetTab } from "features/character";
import { useEffect } from "react";
import { openReplaceItemModal } from "features/modals";
import background from "assets/images/background/shop_interior.png";

export const Shop: React.FC = () => {
	const dispatch = useAppDispatch();
	const isTwoHandedWeaponEquipped = useAppSelector(getIsTwoHandedWeaponEquipped);
	const character = useAppSelector((state) => state.character.character);
	const availableItems = character ? character.availableItems : [];

	useEffect(() => {
		dispatch(setCharacterSheetTab(CharacterSheetTab.Inventory));
	}, [dispatch]);

	const handleBuyItem = async (item: IArmour | IWeapon) => {
		if (!character) {
			return;
		}

		const slot = getAvailableItemSlot(item, character.equipment, isTwoHandedWeaponEquipped);
		if (slot) {
			await dispatch(buyItem({ id: item.id, slot }));
			return Promise.resolve();
		}

		dispatch(openReplaceItemModal({ item }));
	};

	return (
		<Box p={2} flex={1} display="flex" flexDirection="column" width="100%">
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="h2">Shop</Typography>
				<Button component={Link} to="/game" color="inherit">
					<ArrowBackIcon sx={{ mr: 1 }} />
					Return to town
				</Button>
			</Box>
			<Paper
				sx={{
					backgroundImage: `url(${background})`,
					backgroundSize: "cover",
					backgroundPosition: "bottom",
					flex: 1,
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					flexDirection: "column",
					gap: 2,
					p: 2,
				}}
			>
				<Stack direction="row" justifyContent="center" spacing={2} flexWrap="wrap">
					{availableItems.length ? (
						availableItems.map((item) => <ShopItem key={item.id} item={item} onBuyItem={handleBuyItem} />)
					) : (
						<Typography>Sold out!</Typography>
					)}
				</Stack>
			</Paper>
		</Box>
	);
};
