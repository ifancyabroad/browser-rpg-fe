import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	Link,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import {
	EQUIPMENT_SLOT_TYPE_MAP,
	EQUIPMENT_TYPE_NAME_MAP,
	EquipmentSlot,
	getItemsToReplace,
	ITEM_RARITY_NAME_MAP,
	ItemRarity,
	WeaponSize,
} from "common/utils";
import { buyItem, getIsTwoHandedWeaponEquipped } from "features/character";
import { closeReplaceItemModal, closeTreasureModal, openEquipmentModal, openErrorModal } from "features/modals";
import { useEffect, useState } from "react";
import { EquipmentIcon, HoverButton } from "common/components";
import { takeTreasure } from "features/battle";

interface IProps {
	item: IArmour | IWeapon | null;
	isSelected: boolean;
}

const ItemLabel: React.FC<IProps> = ({ item, isSelected }) => {
	const dispatch = useAppDispatch();

	if (!item) {
		return null;
	}

	const handleViewItem = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		dispatch(openEquipmentModal({ item }));
	};

	return (
		<HoverButton
			component={Box}
			isActive={isSelected}
			sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3, p: 1 }}
		>
			<Box display="flex" alignItems="center" gap={2}>
				<EquipmentIcon equipment={item} width={40} />
				<Stack>
					<Typography color="text.secondary">{item.name}</Typography>
					<Typography>
						{ITEM_RARITY_NAME_MAP[item.level as ItemRarity]} {EQUIPMENT_TYPE_NAME_MAP[item.type]}
					</Typography>
				</Stack>
			</Box>
			<Link component="button" onClick={handleViewItem}>
				Details
			</Link>
		</HoverButton>
	);
};

export const ReplaceItemModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, item, isReward } = useAppSelector((state) => state.modals.replaceItemModal);
	const character = useAppSelector((state) => state.character.character);
	const isTwoHandedWeaponEquipped = useAppSelector(getIsTwoHandedWeaponEquipped);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const [slot, setSlot] = useState<EquipmentSlot | null>(null);

	useEffect(() => {
		const sl = item ? EQUIPMENT_SLOT_TYPE_MAP[item.type][0] : null;
		setSlot(sl);
	}, [item]);

	if (!character || !item) {
		return null;
	}

	const { id, type } = item;
	const slots = EQUIPMENT_SLOT_TYPE_MAP[type];
	const isTwoHandedWeapon = "size" in item && item.size === WeaponSize.TwoHanded;
	const showSlotSelection = slots.length > 1 && !isTwoHandedWeapon;
	const replaceItems = getItemsToReplace(item, character.equipment, isTwoHandedWeaponEquipped);

	const handleClose = () => {
		dispatch(closeReplaceItemModal());
	};

	const handleSlotChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSlot(event.target.value as EquipmentSlot);
	};

	const handleSelectItem = async () => {
		try {
			if (!slot) {
				throw new Error("No item selected");
			}
			if (isReward) {
				await dispatch(takeTreasure({ id, slot })).unwrap();
				dispatch(closeTreasureModal());
			} else {
				await dispatch(buyItem({ id, slot })).unwrap();
			}
			dispatch(closeReplaceItemModal());
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="replace-item-dialog-title">
			<DialogTitle id="replace-item-dialog-title" textAlign="center">
				Replace item?
			</DialogTitle>
			<DialogContent>
				{showSlotSelection ? (
					<FormControl sx={{ width: "100%", alignItems: "center" }}>
						<FormLabel id="replace-item-label" sx={{ textAlign: "center", mb: 2 }}>
							Choose an item to replace
						</FormLabel>
						<RadioGroup
							aria-labelledby="replace-item-label"
							name="attribute"
							value={slot}
							onChange={handleSlotChange}
							sx={{ maxWidth: "100%", gap: 1 }}
						>
							{slots.map((sl) => (
								<FormControlLabel
									key={sl}
									value={sl}
									sx={{ maxWidth: "100%", m: 0 }}
									control={<Radio sx={{ display: "none" }} />}
									disableTypography
									label={<ItemLabel item={character.equipment[sl]} isSelected={sl === slot} />}
								/>
							))}
						</RadioGroup>
					</FormControl>
				) : (
					<DialogContentText textAlign="center">
						Confirm you wish to replace{" "}
						<Box component="span" color="text.secondary">
							{replaceItems.map((it) => it?.name).join(" and ")}
						</Box>
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Link component="button" color="text.secondary" onClick={handleClose}>
					Cancel
				</Link>
				<Link component="button" onClick={handleSelectItem} disabled={isLoading || !slot}>
					Confirm
				</Link>
			</DialogActions>
		</Dialog>
	);
};
