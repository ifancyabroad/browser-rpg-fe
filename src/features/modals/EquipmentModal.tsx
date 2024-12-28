import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeEquipmentModal } from "./modalsSlice";
import {
	ARMOUR_TYPE_NAME_MAP,
	ArmourType,
	EQUIPMENT_TYPE_NAME_MAP,
	ITEM_RARITY_COLOR_MAP,
	ITEM_RARITY_NAME_MAP,
	ItemRarity,
	WEAPON_MODIFIER_MAP,
	WEAPON_SIZE_NAME_MAP,
} from "common/utils";
import { Fragment } from "react";
import { EffectList, EquipmentIcon, PropertyList } from "common/components";

export const EquipmentModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, item } = useAppSelector((state) => state.modals.equipmentModal);

	const handleClose = () => {
		dispatch(closeEquipmentModal());
	};

	if (!item) {
		return null;
	}

	const { name, level, properties } = item;
	const isArmour = "armourClass" in item;
	const isWeapon = "weaponType" in item;
	const type = isWeapon ? item.weaponType : item.type;

	return (
		<Dialog open={open} onClose={handleClose} fullWidth={false}>
			<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<EquipmentIcon equipment={item} width={48} />
				<Typography component="span" color={ITEM_RARITY_COLOR_MAP[level as ItemRarity]}>
					{name}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Stack spacing={1}>
					<Box display="flex" gap={1}>
						<Typography color="secondary.main">Type:</Typography>
						<DialogContentText>{EQUIPMENT_TYPE_NAME_MAP[type]}</DialogContentText>
					</Box>
					{isArmour && (
						<Fragment>
							<Box display="flex" gap={1}>
								<Typography color="secondary.main">Armour Type:</Typography>
								<DialogContentText>
									{item.armourType && ARMOUR_TYPE_NAME_MAP[item.armourType]}
								</DialogContentText>
							</Box>
							<Box display="flex" gap={1}>
								<Typography color="secondary.main">Armour Class:</Typography>
								<DialogContentText>{item.armourClass}</DialogContentText>
								{(item.armourType === ArmourType.Cloth || item.armourType === ArmourType.Light) && (
									<DialogContentText>+ Dex (max 5)</DialogContentText>
								)}
								{item.armourType === ArmourType.Medium && (
									<DialogContentText>+ Dex (max 2)</DialogContentText>
								)}
							</Box>
						</Fragment>
					)}
					{isWeapon && (
						<Fragment>
							<Box display="flex" gap={1}>
								<Typography color="secondary.main">Size:</Typography>
								<DialogContentText>{WEAPON_SIZE_NAME_MAP[item.size]}</DialogContentText>
							</Box>
							<Box display="flex" gap={1}>
								<Typography color="secondary.main">Damage:</Typography>
								<DialogContentText>
									{item.min}-{item.max}
								</DialogContentText>
							</Box>
							<Box display="flex" gap={1}>
								<Typography color="secondary.main">Damage Type:</Typography>
								<DialogContentText sx={{ textTransform: "capitalize" }}>
									{item.damageType}
								</DialogContentText>
							</Box>
							<Box display="flex" gap={1}>
								<Typography color="secondary.main">Modifier:</Typography>
								<DialogContentText textTransform="capitalize">
									{WEAPON_MODIFIER_MAP.get(item.weaponType)}
								</DialogContentText>
							</Box>
						</Fragment>
					)}
					<Box display="flex" gap={1}>
						<Typography color="secondary.main">Rarity:</Typography>
						<DialogContentText>{ITEM_RARITY_NAME_MAP[level as ItemRarity]}</DialogContentText>
					</Box>
				</Stack>
				{properties && properties.length && (
					<Box mt={2}>
						<Typography color="info.main">Properties</Typography>
						<Stack spacing={1}>
							<PropertyList properties={properties} />
						</Stack>
					</Box>
				)}
				{isWeapon && item.effects && item.effects.length && (
					<Box mt={2}>
						<Typography color="info.main">Effects</Typography>
						<EffectList effects={item.effects} />
					</Box>
				)}
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleClose}>
					Close
				</Link>
			</DialogActions>
		</Dialog>
	);
};
