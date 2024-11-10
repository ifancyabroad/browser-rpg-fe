import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useEffect } from "react";
import { fetchProgress } from "./characterSlice";
import { openErrorModal } from "features/modals";
import { Loader } from "common/components";
import { Header } from "./Header";
import { IProgress } from "common/types";
import { Status } from "common/utils";

const ProgressClass: React.FC<IProgress> = ({ deaths, hero, kills, victories, name, portrait }) => {
	const hasVictory = victories > 0;

	return (
		<Paper
			sx={(theme) => ({
				position: "relative",
				height: 400,
				backgroundImage: `url(${portrait})`,
				backgroundSize: "contain",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				outline: hasVictory ? `2px solid ${theme.palette.primary.main}` : null,
				p: 2,
				"&:before": {
					content: "''",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 1,
					backgroundColor: "rgba(0, 0, 0, 0.6)",
				},
			})}
		>
			<Box
				sx={{
					position: "relative",
					zIndex: 2,
					color: "white",
				}}
			>
				<Box display="flex" justifyContent="space-between" mb={4}>
					<Stack spacing={1}>
						<Typography>
							<Box component="span" color="secondary.main">
								Kills:
							</Box>{" "}
							{kills}
						</Typography>
						<Typography>
							<Box component="span" color="secondary.main">
								Deaths:
							</Box>{" "}
							{deaths}
						</Typography>
						<Typography>
							<Box component="span" color="secondary.main">
								Victories:
							</Box>{" "}
							{victories}
						</Typography>
					</Stack>

					<Typography textAlign="right">
						<Box component="span" color="secondary.main">
							Class:
						</Box>{" "}
						{name}
					</Typography>
				</Box>

				{hero && (
					<Stack spacing={1}>
						<Typography>
							<Box component="span" color="secondary.main">
								Best Hero:
							</Box>{" "}
							{hero.name}
						</Typography>
						<Typography>
							<Box component="span" color="secondary.main">
								Level:
							</Box>{" "}
							{hero.level}
						</Typography>
						<Typography>
							<Box component="span" color="secondary.main">
								Kills:
							</Box>{" "}
							{hero.kills}
						</Typography>
						<Typography>
							<Box component="span" color="secondary.main">
								Status:
							</Box>{" "}
							{
								{
									[Status.Alive]: "Alive",
									[Status.Dead]: "Dead",
									[Status.Retired]: "Retired",
									[Status.Complete]: "Complete",
								}[hero.status]
							}
						</Typography>
						{hero.slainBy && (
							<Typography>
								<Box component="span" color="secondary.main">
									Slain By:
								</Box>{" "}
								{hero.slainBy}
							</Typography>
						)}
					</Stack>
				)}
			</Box>
		</Paper>
	);
};

export const Progress: React.FC = () => {
	const dispatch = useAppDispatch();
	const progress = useAppSelector((state) => state.character.progress);
	const status = useAppSelector((state) => state.character.progressStatus);
	const isLoading = status === "loading";

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchProgress()).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		fetchData();
	}, [dispatch]);

	return (
		<Box
			sx={{
				minHeight: "100svh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Header />

			<Box py={4} flex={1} display="flex" alignItems="center" justifyContent="center">
				<Container maxWidth="lg">
					{isLoading ? (
						<Box height={480} display="flex" justifyContent="center" alignItems="center">
							<Loader />
						</Box>
					) : (
						<Grid container spacing={2} justifyContent="center">
							{progress.map((classProgress) => (
								<Grid key={classProgress.name} item xs={12} md={3}>
									<ProgressClass {...classProgress} />
								</Grid>
							))}
						</Grid>
					)}
				</Container>
			</Box>
		</Box>
	);
};
