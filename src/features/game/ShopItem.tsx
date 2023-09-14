import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IArmour, IWeapon } from "common/types";

interface IProps {
	item: IArmour | IWeapon;
	onSelectItem: (id: string) => void;
}

export const ShopItem: React.FC<IProps> = ({ item, onSelectItem }) => {
	const { id, icon, name, description } = item;

	const handleSelectItem = () => {
		onSelectItem(id);
	};

	return (
		<Card key={id} sx={{ width: 200 }} variant="outlined">
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
				<Button size="small" variant="contained" onClick={handleSelectItem} data-value={id}>
					Buy
				</Button>
			</CardActions>
		</Card>
	);
};
