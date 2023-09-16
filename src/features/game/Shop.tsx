import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import { CharacterSheetTab, EquipmentType, getAvailableItemSlot } from "common/utils";
import { ShopItem } from "./ShopItem";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { buyItem, getIsTwoHandedWeaponEquipped, setCharacterSheetTab } from "features/character";
import { useEffect } from "react";

export const Shop: React.FC = () => {
	const dispatch = useAppDispatch();
	const isTwoHandedWeaponEquipped = useAppSelector(getIsTwoHandedWeaponEquipped);
	const character = useAppSelector((state) => state.character.character);
	const availabeItems = character ? character.availableItems : [];
	const armour = availabeItems.filter(({ type }) => type !== EquipmentType.Weapon) as IArmour[];
	const weapons = availabeItems.filter(({ type }) => type === EquipmentType.Weapon) as IWeapon[];

	useEffect(() => {
		dispatch(setCharacterSheetTab(CharacterSheetTab.Inventory));
	}, [dispatch]);

	const handleBuyItem = (item: IArmour | IWeapon) => {
		if (!character) {
			return;
		}

		const slot = getAvailableItemSlot(item, character.equipment, isTwoHandedWeaponEquipped);
		if (slot) {
			dispatch(
				buyItem({
					id: item.id,
					slot,
				}),
			);
		}

		// TODO: Open replace item modal
	};

	return (
		<Box p={2} flex={1} width="100%">
			<Paper
				sx={{
					position: "relative",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: 2,
					p: 2,
				}}
			>
				<IconButton
					sx={{ position: "absolute", top: 8, right: 8 }}
					aria-label="close"
					color="inherit"
					type="button"
					component={Link}
					to="/game"
				>
					<CloseIcon />
				</IconButton>
				<Typography variant="h5">BROWSER HEROES</Typography>
				<Typography>This is the shop!</Typography>
				<Stack direction="row" spacing={2}>
					{armour.map((item) => (
						<ShopItem key={item.id} item={item} onBuyItem={handleBuyItem} />
					))}
				</Stack>
				<Stack direction="row" spacing={2}>
					{weapons.map((item) => (
						<ShopItem key={item.id} item={item} onBuyItem={handleBuyItem} />
					))}
				</Stack>
			</Paper>
		</Box>
	);
};
