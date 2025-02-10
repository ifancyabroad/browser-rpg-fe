import { alpha, Box, Container, Divider, Link as MuiLink, Paper, Stack, styled, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { fetchDailyWinner, getHasActiveCharacter, retireCharacter } from "features/character";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmationModal, openErrorModal } from "features/modals";
import { Dragon, Footer, Header, HoverButton, PageLoader } from "common/components";
import { DailyWinner } from "./DailyWinner";
import logo from "assets/images/logos/browser_heroes.png";

const Logo = styled("img")({
	width: "100%",
	maxWidth: 260,
	marginRight: -20,
});

export const Start: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const hasActiveCharacter = useAppSelector(getHasActiveCharacter);
	const user = useAppSelector((state) => state.authentication.user);
	const character = useAppSelector((state) => state.character.character);
	const status = useAppSelector((state) => state.character.status);
	const isCharacterLoading = status === "loading";
	const dailyWinner = useAppSelector((state) => state.character.dailyWinner);
	const dailyWinnerStatus = useAppSelector((state) => state.character.dailyWinnerStatus);
	const isLoading = dailyWinnerStatus === "loading";

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchDailyWinner()).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		fetchData();
	}, [dispatch]);

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

	if (isLoading) {
		return <PageLoader />;
	}

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
									<Logo src={logo} alt="Browser Heroes" width="200" />
									<Stack spacing={1}>
										<Typography textAlign="center">
											Welcome back{" "}
											<Box component="span" color="text.secondary">
												{user?.username}
											</Box>
										</Typography>
										<Typography textAlign="center">
											<MuiLink component="button" onClick={openConfirmationModal}>
												Click here
											</MuiLink>{" "}
											to start a new game or continue the below journey.
										</Typography>
									</Stack>
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
										<Typography textAlign="center">
											Lvl {character?.level} {character?.characterClass.name}
										</Typography>
										<Typography>
											<MuiLink component={Link} to="/game">
												CONTINUE
											</MuiLink>
										</Typography>
									</HoverButton>
									{dailyWinner && <Divider flexItem />}
									<DailyWinner />
								</Stack>
							) : (
								<Stack spacing={3} alignItems="center">
									<Logo src={logo} alt="Browser Heroes" width="200" />
									<Stack spacing={1}>
										<Typography textAlign="center">
											Welcome{" "}
											<Box component="span" color="text.secondary">
												{user?.username}
											</Box>
										</Typography>
										<Typography textAlign="center">Your new adventure awaits you!</Typography>
									</Stack>
									<MuiLink component={Link} to="/create">
										CREATE CHARACTER
									</MuiLink>
									{dailyWinner && <Divider flexItem />}
									<DailyWinner />
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
				disabled={isCharacterLoading}
			/>
		</Fragment>
	);
};
