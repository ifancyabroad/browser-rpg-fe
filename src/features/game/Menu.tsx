import { Button, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getRestPrice } from "common/utils";
import { rest } from "features/character";
import { ConfirmationModal } from "features/modals";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

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

	const openConfirmationModal = () => {
		setIsConfirmationOpen(true);
	};

	const closeConfirmationModal = () => {
		setIsConfirmationOpen(false);
	};

	return (
		<Fragment>
			<Typography variant="h5">BROWSER HEROES</Typography>
			<Typography>This is the game page!</Typography>
			<Stack direction="row" spacing={2}>
				<Button variant="contained" component={Link} to="/game/hall-of-fame">
					Hall of Fame
				</Button>
				<Button variant="contained" onClick={openConfirmationModal}>
					Rest
				</Button>
				<Button variant="contained" component={Link} to="/game/shop">
					Shop
				</Button>
				<Button variant="contained" component={Link} to="/game/battle">
					Battle
				</Button>
			</Stack>

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
