import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Link,
	Stack,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeLeaderboard, fetchLeaderboard } from "./leaderboardSlice";
import { Loader } from "common/components";
import { Fragment, useEffect, useState } from "react";
import { openCharacterModal, openErrorModal } from "features/modals";
import { CHARACTER_STATUS_MAP, CharacterClassTab, LeaderboardTab, Status } from "common/utils";

export const Leaderboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.leaderboard.isOpen);
	const rankings = useAppSelector((state) => state.leaderboard.leaderboard);
	const status = useAppSelector((state) => state.leaderboard.status);
	const isLoading = status === "loading";
	const [leaderboardTab, setLeaderboardTab] = useState<LeaderboardTab>(LeaderboardTab.Overall);
	const [characterClass, setCharacterClass] = useState<CharacterClassTab>(CharacterClassTab.All);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchLeaderboard({ type: leaderboardTab, characterClass })).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		if (open) {
			fetchData();
		}
	}, [dispatch, open, leaderboardTab, characterClass]);

	const handleClose = () => {
		dispatch(closeLeaderboard());
	};

	const handleChangeTab = (event: React.SyntheticEvent, newValue: LeaderboardTab) => {
		setLeaderboardTab(newValue);
	};

	const handleChangeClass = (event: React.SyntheticEvent, newValue: CharacterClassTab) => {
		setCharacterClass(newValue);
	};

	const handleViewHero = (id: string) => {
		dispatch(openCharacterModal({ id }));
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="leaderboard-dialog-title"
			maxWidth="md"
			fullScreen={isMobile}
		>
			<DialogTitle id="leaderboard-dialog-title" textAlign="center">
				Hall of Legends
			</DialogTitle>
			<DialogContent>
				<Box>
					<Stack spacing={0.5}>
						<Tabs value={leaderboardTab} onChange={handleChangeTab} variant="fullWidth">
							<Tab label="Overall" value={LeaderboardTab.Overall} />
							<Tab label="Your Heroes" value={LeaderboardTab.User} />
						</Tabs>
						<Tabs value={characterClass} onChange={handleChangeClass} variant="fullWidth">
							<Tab label="All" value={CharacterClassTab.All} sx={{ minWidth: 0 }} />
							<Tab label="Fighter" value={CharacterClassTab.Fighter} sx={{ minWidth: 0 }} />
							<Tab label="Thief" value={CharacterClassTab.Thief} sx={{ minWidth: 0 }} />
							<Tab label="Mage" value={CharacterClassTab.Mage} sx={{ minWidth: 0 }} />
						</Tabs>
					</Stack>
					<TableContainer sx={{ minHeight: 600 }}>
						<Table size="small" sx={{ bgcolor: "#000" }}>
							<TableHead>
								<TableRow>
									<TableCell
										sx={{
											width: 30,
											color: "info.light",
										}}
									></TableCell>
									<TableCell sx={{ color: "info.light" }}>Name</TableCell>
									<TableCell
										align="right"
										sx={{ color: "info.light", display: { xs: "none", md: "table-cell" } }}
									>
										Status
									</TableCell>
									<TableCell align="right" sx={{ color: "info.light" }}>
										Kills
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{isLoading ? (
									<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell component="th" scope="row" colSpan={6} align="center">
											<Loader />
										</TableCell>
									</TableRow>
								) : (
									rankings.map((character, index) => (
										<TableRow
											key={index}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row" width={30}>
												{index + 1}
											</TableCell>
											<TableCell>
												<Box display="flex" alignItems="center" gap={1}>
													<Box
														component="img"
														sx={{ width: 40, height: 40, borderRadius: "50%" }}
														alt={character.name}
														src={character.characterClass.icon}
													/>
													<Box>
														<Typography color="text.secondary">
															<Link
																component="button"
																color="text.secondary"
																onClick={handleViewHero.bind(null, character.id)}
															>
																{character.name}
															</Link>{" "}
															<Box
																component="span"
																color={
																	character.isUser ? "primary.main" : "text.primary"
																}
																fontStyle="italic"
															>
																({character.username})
															</Box>
														</Typography>
														<Typography variant="body2">
															Level {character.level} {character.characterClass.name}
														</Typography>
													</Box>
												</Box>
											</TableCell>
											<TableCell align="right" sx={{ display: { xs: "none", md: "table-cell" } }}>
												{character.status === Status.Dead ? (
													<Fragment>
														Slain By{" "}
														<Box component="span" color="text.secondary">
															{character.slainBy}
														</Box>
													</Fragment>
												) : (
													<Box component="span" color="text.secondary">
														{CHARACTER_STATUS_MAP[character.status as Status]}
													</Box>
												)}
											</TableCell>
											<TableCell align="right">{character.kills}</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleClose} disabled={isLoading}>
					Close
				</Link>
			</DialogActions>
		</Dialog>
	);
};
