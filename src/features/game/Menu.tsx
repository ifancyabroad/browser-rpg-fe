import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getRestPrice } from "common/utils";
import { rest } from "features/character";
import { ConfirmationModal } from "features/modals";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { startBattle } from "./gameSlice";
import arena from "assets/images/background/arena_exterior.png";
import tavern from "assets/images/background/tavern.png";
import shop from "assets/images/background/shop_exterior.png";

export const Menu: React.FC = () => {
	const dispatch = useAppDispatch();
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const character = useAppSelector((state) => state.character.character);
	const restPrice = getRestPrice(character?.day ?? 1);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";

	const handleRest = async () => {
		await dispatch(rest());
		setIsConfirmationOpen(false);
	};

	const handleStartBattle = () => {
		dispatch(startBattle());
	};

	const openConfirmationModal = () => {
		setIsConfirmationOpen(true);
	};

	const closeConfirmationModal = () => {
		setIsConfirmationOpen(false);
	};

	return (
		<Fragment>
			<Box p={2} flex={1} display="flex" flexDirection="column" width="100%">
				<Typography variant="h2">Town</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Card>
							<CardMedia sx={{ height: 240 }} image={arena} title="Arena" />
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Arena
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Take on your next foe in the arena!
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small" variant="contained" onClick={handleStartBattle}>
									Start Battle
								</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card>
							<CardMedia sx={{ height: 240 }} image={tavern} title="Tavern" />
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Tavern
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Restore health and skills with a room at the tavern.
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small" variant="contained" onClick={openConfirmationModal}>
									Rest
								</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card>
							<CardMedia sx={{ height: 240 }} image={shop} title="Shop" />
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Shop
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Browse the wares for the current day.
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small" variant="contained" component={Link} to="/game/shop">
									Enter Shop
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Box>

			<ConfirmationModal
				title="Would you like to rest?"
				content={`Resting will cost ${restPrice}g`}
				handleClose={closeConfirmationModal}
				handleConfirm={handleRest}
				open={isConfirmationOpen}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
