import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import { openEquipmentModal } from "features/modals";

interface IGoldProps {
	onTake: () => Promise<void>;
}

export const Gold: React.FC<IGoldProps> = ({ onTake }) => {
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";

	const handleTakeItem = () => {
		onTake();
	};

	return (
		<Card sx={{ width: 250 }} variant="outlined">
			<CardMedia sx={{ height: 160 }} image="https://via.placeholder.com/1024" title="Gold" />
			<CardContent>
				<Typography variant="h6" fontFamily="'Cinzel', serif" noWrap>
					Gold
				</Typography>
				<Typography variant="body2" color="text.secondary">
					25g
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" variant="contained" onClick={handleTakeItem} disabled={isLoading}>
					Take
				</Button>
			</CardActions>
		</Card>
	);
};

interface IItemProps {
	item: IArmour | IWeapon;
	onTakeItem: (item: IArmour | IWeapon) => Promise<void>;
}

export const TreasureItem: React.FC<IItemProps> = ({ item, onTakeItem }) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const { icon, name, description } = item;

	const handleTakeItem = () => {
		onTakeItem(item);
	};

	const openEquipmentDetailsModal = () => {
		dispatch(openEquipmentModal({ item }));
	};

	return (
		<Card sx={{ width: 250 }} variant="outlined">
			<CardMedia sx={{ height: 160 }} image={icon || "https://via.placeholder.com/1024"} title={name} />
			<CardContent>
				<Typography variant="h6" fontFamily="'Cinzel', serif" noWrap>
					{name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" variant="contained" onClick={handleTakeItem} disabled={isLoading}>
					Take
				</Button>
				<Button size="small" variant="contained" color="secondary" onClick={openEquipmentDetailsModal}>
					Details
				</Button>
			</CardActions>
		</Card>
	);
};
