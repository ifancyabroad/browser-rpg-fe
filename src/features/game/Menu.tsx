import { Badge, Box, Button, Paper, Typography, alpha, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { rest } from "features/character";
import { ConfirmationModal, openErrorModal } from "features/modals";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { startBattle } from "./gameSlice";
import background from "assets/images/background/town_map.png";

export const Menu: React.FC = () => {
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const hasViewedItems = useAppSelector((state) => state.character.hasViewedItems);
	const character = useAppSelector((state) => state.character.character);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";

	const handleRest = async () => {
		try {
			await dispatch(rest()).unwrap();
			setIsConfirmationOpen(false);
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleStartBattle = async () => {
		try {
			await dispatch(startBattle()).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const openConfirmationModal = () => {
		setIsConfirmationOpen(true);
	};

	const closeConfirmationModal = () => {
		setIsConfirmationOpen(false);
	};

	if (!character) {
		return null;
	}

	const isRestDisabled = character.restPrice > character.gold;

	return (
		<Fragment>
			<Box py={2} flex={1} display="flex" flexDirection="column" width="100%">
				<Typography variant="h2">Town</Typography>
				<Paper
					sx={{
						backgroundImage: `url(${background})`,
						backgroundSize: "cover",
						backgroundPosition: "bottom left",
						flex: 1,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						gap: 2,
						p: 2,
					}}
				>
					<Paper
						sx={{
							backgroundColor: alpha(theme.palette.background.paper, 0.8),
							display: "flex",
							justifyContent: "center",
							alignItems: "stretch",
							flexDirection: "column",
							gap: 2,
							p: 4,
						}}
					>
						<Button variant="contained" size="large" fullWidth onClick={handleStartBattle}>
							Battle
						</Button>
						<Badge color="secondary" badgeContent={`${character.restPrice}g`}>
							<Button
								variant="contained"
								size="large"
								fullWidth
								onClick={openConfirmationModal}
								disabled={isRestDisabled}
							>
								Rest
							</Button>
						</Badge>
						<Badge color="secondary" badgeContent="New!" invisible={hasViewedItems}>
							<Button variant="contained" size="large" fullWidth component={Link} to="/game/shop">
								Shop
							</Button>
						</Badge>
						<Button variant="contained" size="large" fullWidth component={Link} to="/">
							Exit
						</Button>
					</Paper>
				</Paper>
			</Box>

			<ConfirmationModal
				title="Would you like to rest?"
				content={`Resting will cost ${character.restPrice}g`}
				handleClose={closeConfirmationModal}
				handleConfirm={handleRest}
				open={isConfirmationOpen}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
