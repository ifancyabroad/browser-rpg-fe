import { Box, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getHasActiveCharacter, retireCharacter } from "features/character";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "assets/images/logos/browser_heroes.png";
import { ConfirmationModal, openErrorModal } from "features/modals";
import { GameButton } from "common/components";

export const Start: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const hasActiveCharacter = useAppSelector(getHasActiveCharacter);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";

	const openConfirmationModal = () => {
		setIsConfirmationOpen(true);
	};

	const closeConfirmationModal = () => {
		setIsConfirmationOpen(false);
	};

	const handleNewCharacter = async () => {
		try {
			await dispatch(retireCharacter()).unwrap();
			setIsConfirmationOpen(false);
			navigate("/create");
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Fragment>
			<Box
				sx={{
					minHeight: "calc(100vh - 53px)",
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
						maxWidth: "400px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						textAlign: "center",
						gap: 2,
						p: 4,
					}}
				>
					<Box component="img" src={logo} height={64} width={64} />
					<Typography variant="h5" fontFamily="'Cinzel', serif" fontWeight="bold">
						BROWSER HEROES
					</Typography>
					{hasActiveCharacter ? (
						<Fragment>
							<Typography variant="subtitle1">Welcome to Browser Heroes! </Typography>
							<Typography>
								Click one of the below options to continue your existing game or start a new one.
							</Typography>
							<Stack spacing={2}>
								<GameButton component={Link} to="/game">
									CONTINUE
								</GameButton>
								<GameButton onClick={openConfirmationModal}>NEW GAME</GameButton>
							</Stack>
						</Fragment>
					) : (
						<Fragment>
							<Typography variant="subtitle1">
								Welcome to Browser Heroes, your new adventure awaits you!{" "}
							</Typography>
							<Typography>
								Please click the button below to start a new game and see how long you can survive!
							</Typography>
							<GameButton component={Link} to="/create">
								START
							</GameButton>
						</Fragment>
					)}
				</Paper>
			</Box>

			<ConfirmationModal
				title="Are you sure?"
				content="Your currently active character will be retired."
				handleClose={closeConfirmationModal}
				handleConfirm={handleNewCharacter}
				open={isConfirmationOpen}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
