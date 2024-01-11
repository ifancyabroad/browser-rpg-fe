import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import { openEquipmentModal } from "features/modals";

interface IProps {
	item: IArmour | IWeapon;
	onTakeItem: (item: IArmour | IWeapon) => Promise<void>;
}

export const TreasureItem: React.FC<IProps> = ({ item, onTakeItem }) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const { id, icon, name, description } = item;

	const handleTakeItem = () => {
		onTakeItem(item);
	};

	const openEquipmentDetailsModal = () => {
		dispatch(openEquipmentModal({ item }));
	};

	return (
		<Card key={id} sx={{ width: 250 }} variant="outlined">
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
