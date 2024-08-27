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
import { EQUIPMENT_SLOT_TYPE_MAP, EQUIPMENT_TYPE_NAME_MAP, EquipmentSlot } from "common/utils";
import { buyItem, takeTreasure } from "features/character";
import { closeReplaceItemModal, closeTreasureModal, openEquipmentModal, openErrorModal } from "features/modals";
import { useEffect, useState } from "react";
import { EquipmentIcon, HoverButton } from "common/components";

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
						Level {item.level} {EQUIPMENT_TYPE_NAME_MAP[item.type]}
					</Typography>
				</Stack>
			</Box>
			<Link component="button" onClick={handleViewItem}>
				View Details
			</Link>
		</HoverButton>
	);
};

export const ReplaceItemModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, item } = useAppSelector((state) => state.modals.replaceItemModal);
	const character = useAppSelector((state) => state.character.character);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const [slot, setSlot] = useState<EquipmentSlot | null>(null);
	const isShop = true; // TODO: Get isShop from modal data

	useEffect(() => {
		const sl = item ? EQUIPMENT_SLOT_TYPE_MAP[item.type][0] : null;
		setSlot(sl);
	}, [item]);

	if (!character || !item) {
		return null;
	}

	const { id, type } = item;
	const slots = EQUIPMENT_SLOT_TYPE_MAP[type];
	const replaceItem = character.equipment[slots[0]]?.name;

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
			if (isShop) {
				await dispatch(buyItem({ id, slot })).unwrap();
			} else {
				await dispatch(takeTreasure({ id, slot, zone: character.zone })).unwrap();
				dispatch(closeTreasureModal());
			}
			dispatch(closeReplaceItemModal());
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title" textAlign="center">
				Replace item?
			</DialogTitle>
			<DialogContent>
				{slots.length > 1 ? (
					<FormControl sx={{ width: "100%", alignItems: "center" }}>
						<FormLabel id="replace-item-label" sx={{ textAlign: "center", mb: 2 }}>
							Choose an item to replace
						</FormLabel>
						<RadioGroup
							aria-labelledby="replace-item-label"
							name="attribute"
							value={slot}
							onChange={handleSlotChange}
							sx={{ gap: 1 }}
						>
							{slots.map((sl) => (
								<FormControlLabel
									key={sl}
									value={sl}
									sx={{ m: 0 }}
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
							{replaceItem}
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
