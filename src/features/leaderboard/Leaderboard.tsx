import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Link,
	Stack,
	styled,
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
import { Loader, Select } from "common/components";
import { useEffect, useState } from "react";
import { openCharacterModal, openErrorModal } from "features/modals";
import { CHARACTER_CLASS_NAME_MAP, CHARACTER_CLASSES, CharacterClass, LeaderboardTab } from "common/utils";

type CharacterClassTab = "all" | CharacterClass;

const StyledTab = styled(Tab)(({ theme }) => ({
	minWidth: 0,
	whiteSpace: "nowrap",
}));

const SelectWrapper = styled("div")(({ theme }) => ({
	flex: 1,
	[theme.breakpoints.down("sm")]: {
		order: 1,
	},
}));

export const Leaderboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.leaderboard.isOpen);
	const rankings = useAppSelector((state) => state.leaderboard.leaderboard);
	const status = useAppSelector((state) => state.leaderboard.status);
	const isLoading = status === "loading";
	const [leaderboardTab, setLeaderboardTab] = useState<LeaderboardTab>(LeaderboardTab.Daily);
	const [characterClass, setCharacterClass] = useState<CharacterClassTab>("all");
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const noRankings = rankings.length === 0 && status === "succeeded";
	const options = CHARACTER_CLASSES.map((characterClass) => ({
		label: CHARACTER_CLASS_NAME_MAP[characterClass],
		value: characterClass as CharacterClassTab,
	}));
	options.unshift({ label: "All Classes", value: "all" });

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

	const handleSelectClass = (option: string) => {
		setCharacterClass(option as CharacterClassTab);
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
						<Box
							display="flex"
							alignItems="stretch"
							justifyContent="space-between"
							gap={0.5}
							flexDirection={{
								xs: "column",
								sm: "row",
							}}
						>
							<SelectWrapper>
								<Select options={options} value={characterClass} onChange={handleSelectClass} />
							</SelectWrapper>
							<Tabs
								value={leaderboardTab}
								onChange={handleChangeTab}
								variant="fullWidth"
								sx={{ flex: 3 }}
							>
								<StyledTab label="Daily" value={LeaderboardTab.Daily} />
								<StyledTab label="Overall" value={LeaderboardTab.Overall} />
								<StyledTab label="Your Heroes" value={LeaderboardTab.User} />
							</Tabs>
						</Box>
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
										sx={{
											color: "info.light",
											width: 80,
											display: { xs: "none", sm: "table-cell" },
										}}
									>
										Gold
									</TableCell>
									<TableCell
										align="right"
										sx={{
											color: "info.light",
											width: 80,
											display: { xs: "none", sm: "table-cell" },
										}}
									>
										Day
									</TableCell>
									<TableCell
										align="right"
										sx={{ color: "info.light", width: { xs: "auto", sm: 80 } }}
									>
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
								) : noRankings ? (
									<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell component="th" scope="row" colSpan={6} align="center">
											No characters found.
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
											<TableCell
												align="right"
												sx={{ width: 80, display: { xs: "none", sm: "table-cell" } }}
											>
												{character.gold}
											</TableCell>
											<TableCell
												align="right"
												sx={{ width: 80, display: { xs: "none", sm: "table-cell" } }}
											>
												{character.day}
											</TableCell>
											<TableCell align="right" sx={{ width: { xs: "auto", sm: 80 } }}>
												{character.kills}
											</TableCell>
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
