import { alpha, Box, Container, Link as MuiLink, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getHasActiveCharacter, retireCharacter } from "features/character";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmationModal, openErrorModal } from "features/modals";
import { Dragon, Footer, Header, HoverButton } from "common/components";

export const Start: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const hasActiveCharacter = useAppSelector(getHasActiveCharacter);
	const character = useAppSelector((state) => state.character.character);
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
					minHeight: "100svh",
					display: "flex",
					flexDirection: "column",
					overflow: "hidden",
				}}
			>
				<Header />

				<Box flex={1} display="flex" alignItems="center" justifyContent="center">
					<Container maxWidth="xs">
						<Paper
							sx={(theme) => ({
								position: "relative",
								p: 3,
								backgroundColor: alpha(theme.palette.background.paper, 0.9),
							})}
						>
							<Dragon />
							{hasActiveCharacter ? (
								<Stack spacing={3} alignItems="center">
									<Typography variant="h1" textAlign="center">
										Browser Heroes
									</Typography>
									<Typography textAlign="center">
										<MuiLink component="button" onClick={openConfirmationModal}>
											Click here
										</MuiLink>{" "}
										to start a new game or continue the below journey.
									</Typography>
									<HoverButton
										component="div"
										isActive
										sx={{
											width: "100%",
											py: 1,
											px: 2,
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											gap: 1,
											cursor: "default",
										}}
									>
										<Typography color="text.secondary">{character?.name}</Typography>
										<Typography>Lvl {character?.level}</Typography>
										<Typography>{character?.characterClass.name}</Typography>
										<Typography>
											<MuiLink component={Link} to="/game">
												CONTINUE
											</MuiLink>
										</Typography>
									</HoverButton>
									<MuiLink component={Link} to="/progress" color="text.secondary">
										View Progress
									</MuiLink>
								</Stack>
							) : (
								<Stack spacing={3} alignItems="center">
									<Typography variant="h1" textAlign="center">
										Browser Heroes
									</Typography>
									<Typography textAlign="center">
										Welcome to{" "}
										<Box component="span" color="text.secondary">
											Browser Heroes
										</Box>
										, your new adventure awaits you!
									</Typography>
									<Stack alignItems="center">
										<MuiLink component={Link} to="/create">
											Create Character
										</MuiLink>
										<Typography textAlign="center">OR</Typography>
										<MuiLink component={Link} to="/progress" color="text.secondary">
											View Progress
										</MuiLink>
									</Stack>
								</Stack>
							)}
						</Paper>
					</Container>
				</Box>

				<Footer />
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
