import { Box, Button, Paper, Typography, alpha, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getRestPrice } from "common/utils";
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
	const character = useAppSelector((state) => state.character.character);
	const restPrice = getRestPrice(character?.day ?? 1);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const isRestDisabled = restPrice > (character?.gold ?? 0);

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

	return (
		<Fragment>
			<Box p={2} flex={1} display="flex" flexDirection="column" width="100%">
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
						<Button variant="contained" size="large" onClick={handleStartBattle}>
							Battle
						</Button>
						<Button
							variant="contained"
							size="large"
							onClick={openConfirmationModal}
							disabled={isRestDisabled}
						>
							Rest
						</Button>
						<Button variant="contained" size="large" component={Link} to="/game/shop">
							Shop
						</Button>
					</Paper>
				</Paper>
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
