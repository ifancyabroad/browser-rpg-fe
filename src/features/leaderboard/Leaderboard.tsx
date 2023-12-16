import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	alpha,
	darken,
	useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeLeaderboard, fetchLeaderboard } from "./leaderboardSlice";
import { Loader } from "common/components";
import { useEffect } from "react";
import { openErrorModal } from "features/modals";
import background from "assets/images/background/bgtile.webp";
import background2 from "assets/images/background/bgtile2.webp";
import { CHARACTER_STATUS_MAP, Status } from "common/utils";

export const Leaderboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.leaderboard.isOpen);
	const rankings = useAppSelector((state) => state.leaderboard.leaderboard);
	const status = useAppSelector((state) => state.leaderboard.status);
	const isLoading = status === "loading";
	const theme = useTheme();

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchLeaderboard()).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		if (open) {
			fetchData();
		}
	}, [dispatch, open]);

	const handleClose = () => {
		dispatch(closeLeaderboard());
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="lg">
			<DialogTitle id="form-dialog-title">Hall of Legends</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						backgroundImage: `url(${background2}), url(${background})`,
						backgroundPosition: "0px 0px, 0px 0px",
						backgroundRepeat: "repeat-x, repeat",
						boxShadow: "inset 0px 0px 0px 1px rgba(255,255,255,0.09)",
					}}
				>
					<TableContainer
						component={Paper}
						sx={{
							bgcolor: alpha(theme.palette.background.paper, 0.5),
							boxShadow: "inset 0px 0px 15px 0px rgba(0,0,0,0.8), 0px 0px 0px 1px rgba(255,255,255,0.06)",
						}}
					>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell
										sx={{
											width: 30,
											backgroundColor: alpha(darken(theme.palette.background.paper, 0.5), 0.5),
										}}
									>
										Rank
									</TableCell>
									<TableCell
										sx={{
											backgroundColor: alpha(darken(theme.palette.background.paper, 0.5), 0.5),
										}}
									>
										Name
									</TableCell>
									<TableCell
										align="right"
										sx={{
											backgroundColor: alpha(darken(theme.palette.background.paper, 0.5), 0.5),
										}}
									>
										Status
									</TableCell>
									<TableCell
										align="right"
										sx={{
											backgroundColor: alpha(darken(theme.palette.background.paper, 0.5), 0.5),
										}}
									>
										Day
									</TableCell>
									<TableCell
										align="right"
										sx={{
											backgroundColor: alpha(darken(theme.palette.background.paper, 0.5), 0.5),
										}}
									>
										Kills
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{isLoading ? (
									<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell component="th" scope="row" colSpan={6}>
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
												<Typography>{character.name}</Typography>
												<Typography variant="body2" color="text.secondary">
													Level {character.level} {character.characterClass.name}
												</Typography>
											</TableCell>
											<TableCell align="right">
												{character.status === Status.Dead
													? `Slain By ${character.slainBy}`
													: CHARACTER_STATUS_MAP[character.status]}
											</TableCell>
											<TableCell align="right">{character.day}</TableCell>
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
				<Button onClick={handleClose} color="primary" variant="contained" disabled={isLoading}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
