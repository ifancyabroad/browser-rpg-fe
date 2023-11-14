import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import { ConfirmationModal } from "features/modals";
import { Fragment, useState } from "react";

interface IProps {
	item: IArmour | IWeapon;
	onBuyItem: (item: IArmour | IWeapon) => Promise<void>;
}

export const ShopItem: React.FC<IProps> = ({ item, onBuyItem }) => {
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const character = useAppSelector((state) => state.character.character);
	const gold = character?.gold ?? 0;
	const { id, icon, name, description, price } = item;
	const isDisabled = Boolean(price > gold);

	const handleBuyItem = async () => {
		await onBuyItem(item);
		setIsConfirmationOpen(false);
	};

	const openConfirmationModal = () => {
		setIsConfirmationOpen(true);
	};

	const closeConfirmationModal = () => {
		setIsConfirmationOpen(false);
	};

	return (
		<Fragment>
			<Card key={id} sx={{ width: 200 }} variant="outlined">
				<CardMedia sx={{ height: 160 }} image={icon || "https://via.placeholder.com/1024"} title={name} />
				<CardContent>
					<Typography gutterBottom variant="h6" fontFamily="'Cinzel', serif" noWrap>
						{name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" variant="contained" onClick={openConfirmationModal} disabled={isDisabled}>
						Buy
					</Button>
					<Button size="small" variant="contained" color="secondary">
						Details
					</Button>
				</CardActions>
			</Card>

			<ConfirmationModal
				title="Are you sure?"
				content={`Item will cost ${price}g`}
				handleClose={closeConfirmationModal}
				handleConfirm={handleBuyItem}
				open={isConfirmationOpen}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
