import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Link,
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
import { closeBattleModal, openErrorModal } from "features/modals";
import { CHARACTER_STATUS_MAP, Status } from "common/utils";
import { useNavigate } from "react-router-dom";

export const Leaderboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
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
		dispatch(closeBattleModal());
		dispatch(closeLeaderboard());
		navigate("/");
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm">
			<DialogTitle id="form-dialog-title" textAlign="center">
				Hall of Legends
			</DialogTitle>
			<DialogContent>
				<Box>
					<TableContainer>
						<Table size="small" sx={{ bgcolor: "#000" }}>
							<TableHead>
								<TableRow>
									<TableCell
										sx={{
											width: 30,
											color: "info.light",
										}}
									>
										Rank
									</TableCell>
									<TableCell sx={{ color: "info.light" }}>Name</TableCell>
									<TableCell align="right" sx={{ color: "info.light" }}>
										Status
									</TableCell>
									<TableCell align="right" sx={{ color: "info.light" }}>
										Floor
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
												<Typography>{character.name}</Typography>
												<Typography color="text.secondary">
													Level {character.level} {character.characterClass.name}
												</Typography>
											</TableCell>
											<TableCell align="right">
												{character.status === Status.Dead
													? `Slain By ${character.slainBy}`
													: CHARACTER_STATUS_MAP[character.status]}
											</TableCell>
											<TableCell align="right">{character.zone.level}</TableCell>
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
