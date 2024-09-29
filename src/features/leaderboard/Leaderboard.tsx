import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Link,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Tooltip,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeLeaderboard, fetchLeaderboard } from "./leaderboardSlice";
import { Loader } from "common/components";
import { Fragment, useEffect, useState } from "react";
import { closeBattleModal, openErrorModal } from "features/modals";
import { CHARACTER_STATUS_MAP, LeaderboardTab, Status } from "common/utils";
import { useNavigate } from "react-router-dom";

export const Leaderboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const open = useAppSelector((state) => state.leaderboard.isOpen);
	const rankings = useAppSelector((state) => state.leaderboard.leaderboard);
	const status = useAppSelector((state) => state.leaderboard.status);
	const isLoading = status === "loading";
	const [leaderboardTab, setLeaderboardTab] = useState<LeaderboardTab>(LeaderboardTab.Overall);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const showUserCharacters = leaderboardTab === LeaderboardTab.User;
				await dispatch(fetchLeaderboard({ showUserCharacters })).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		if (open) {
			fetchData();
		}
	}, [dispatch, open, leaderboardTab]);

	const handleClose = () => {
		dispatch(closeBattleModal());
		dispatch(closeLeaderboard());
		navigate("/");
	};

	const handleChangeTab = (event: React.SyntheticEvent, newValue: LeaderboardTab) => {
		setLeaderboardTab(newValue);
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
			<DialogTitle id="form-dialog-title" textAlign="center">
				Hall of Legends
			</DialogTitle>
			<DialogContent>
				<Box>
					<Tabs value={leaderboardTab} onChange={handleChangeTab} variant="fullWidth">
						<Tab label="Overall" value={LeaderboardTab.Overall} />
						<Tab label="Your Heroes" value={LeaderboardTab.User} />
					</Tabs>
					<TableContainer sx={{ height: 600 }}>
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
										<Box component="span" display={{ xs: "none", md: "inline" }}>
											Kills
										</Box>
										<Box component="span" display={{ xs: "inline", md: "none" }}>
											<Tooltip title="Kills">
												<span>K</span>
											</Tooltip>
										</Box>
									</TableCell>
									<TableCell align="right" sx={{ color: "info.light" }}>
										<Box component="span" display={{ xs: "none", md: "inline" }}>
											Highest Level
										</Box>
										<Box component="span" display={{ xs: "inline", md: "none" }}>
											<Tooltip title="Highest Level">
												<span>HL</span>
											</Tooltip>
										</Box>
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
															{character.name}{" "}
															{character.isUser && (
																<Box
																	component="span"
																	color="primary.main"
																	fontStyle="italic"
																>
																	(You)
																</Box>
															)}
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
											<TableCell align="right">{character.maxBattleLevel}</TableCell>
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
