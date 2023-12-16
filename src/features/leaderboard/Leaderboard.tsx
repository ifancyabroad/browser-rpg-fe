import {
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
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeLeaderboard, fetchLeaderboard } from "./leaderboardSlice";
import { Loader } from "common/components";
import { useEffect } from "react";
import { openErrorModal } from "features/modals";

export const Leaderboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.leaderboard.isOpen);
	const rankings = useAppSelector((state) => state.leaderboard.leaderboard);
	const status = useAppSelector((state) => state.leaderboard.status);
	const isLoading = status === "loading";

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
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell
									sx={{
										width: 30,
										backgroundColor: "background.paper",
									}}
								>
									Rank
								</TableCell>
								<TableCell
									sx={{
										width: 70,
										backgroundColor: "background.paper",
									}}
								>
									Status
								</TableCell>
								<TableCell
									sx={{
										backgroundColor: "background.paper",
									}}
								>
									Name
								</TableCell>
								<TableCell
									align="right"
									sx={{
										backgroundColor: "background.paper",
									}}
								>
									Slain By
								</TableCell>
								<TableCell
									align="right"
									sx={{
										backgroundColor: "background.paper",
									}}
								>
									Day
								</TableCell>
								<TableCell
									align="right"
									sx={{
										backgroundColor: "background.paper",
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
									<TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell component="th" scope="row" width={30}>
											{index + 1}
										</TableCell>
										<TableCell width={70}>{character.status}</TableCell>
										<TableCell>
											<Typography>{character.name}</Typography>
											<Typography variant="body2" color="text.secondary">
												Level {character.level} {character.characterClass.name}
											</Typography>
										</TableCell>
										<TableCell align="right">{character.slainBy}</TableCell>
										<TableCell align="right">{character.day}</TableCell>
										<TableCell align="right">{character.kills}</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" variant="contained" disabled={isLoading}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
