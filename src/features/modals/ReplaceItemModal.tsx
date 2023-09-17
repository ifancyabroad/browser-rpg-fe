import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import { EQUIPMENT_SLOT_TYPE_MAP, EquipmentSlot } from "common/utils";
import { buyItem } from "features/character";
import { closeReplaceItemModal } from "features/modals";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
	item: IArmour | IWeapon | null;
	slot: EquipmentSlot;
	onSelectItem: (slot: EquipmentSlot) => void;
}

const Item: React.FC<IProps> = ({ item, slot, onSelectItem }) => {
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";

	if (!item) {
		return null;
	}

	const { description, icon, name } = item;

	const handleSelectItem = () => {
		onSelectItem(slot);
	};

	return (
		<Card sx={{ width: 200 }} variant="outlined">
			<CardMedia sx={{ height: 160 }} image={icon || "https://via.placeholder.com/1024"} title={name} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" variant="contained" onClick={handleSelectItem} disabled={isLoading}>
					Replace
				</Button>
			</CardActions>
		</Card>
	);
};

export const ReplaceItemModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, item } = useAppSelector((state) => state.modals.replaceItemModal);
	const character = useAppSelector((state) => state.character.character);

	if (!character || !item) {
		return null;
	}

	const { id, type } = item;
	const slots = EQUIPMENT_SLOT_TYPE_MAP[type];
	const replaceItem = character.equipment[slots[0]]?.name;
	const message = slots.length > 1 ? "Choose an item to replace" : `Confirm you wish to replace ${replaceItem}`;

	const handleClose = () => {
		dispatch(closeReplaceItemModal());
	};

	const handleSelectItem = async (slot: EquipmentSlot) => {
		await dispatch(buyItem({ id, slot }));
		dispatch(closeReplaceItemModal());
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Replace item?</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent>
				<DialogContentText mb={2}>{message}</DialogContentText>
				<Stack direction="row" spacing={2}>
					{slots.map((slot) => (
						<Item
							key={character.equipment[slot]?.id}
							item={character.equipment[slot]}
							slot={slot}
							onSelectItem={handleSelectItem}
						/>
					))}
				</Stack>
			</DialogContent>
		</Dialog>
	);
};
