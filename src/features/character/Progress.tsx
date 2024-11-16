import { Box, Container, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Fragment, useEffect } from "react";
import { fetchProgress } from "./characterSlice";
import { openCharacterModal, openErrorModal } from "features/modals";
import { Loader } from "common/components";
import { Header } from "./Header";
import { IProgress } from "common/types";
import { Status } from "common/utils";
import { CharacterModal } from "features/modals/CharacterModal";

const ProgressClass: React.FC<IProgress> = ({ deaths, hero, kills, victories, name, portrait, rank }) => {
	const dispatch = useAppDispatch();
	const hasVictory = victories > 0;

	const handleViewHero = () => {
		if (!hero) {
			return;
		}
		dispatch(openCharacterModal({ character: hero }));
	};

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
						<Box component="span" color="info.main">
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
							<Link component="button" onClick={handleViewHero}>
								{hero.name}
							</Link>
						</Typography>
						<Typography>
							<Box component="span" color="secondary.main">
								Rank:
							</Box>{" "}
							{rank}
						</Typography>
						<Typography>
							<Box component="span" color="secondary.main">
								Level:
							</Box>{" "}
							{hero.level}
						</Typography>
						<Typography>
							<Box component="span" color="secondary.main">
								Day:
							</Box>{" "}
							{hero.day}
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

const OverallStats: React.FC = () => {
	const progress = useAppSelector((state) => state.character.progress);

	const overallRank = Math.min(...progress.map(({ rank }) => rank || 0));
	const totalVictories = progress.reduce((acc, { victories }) => acc + victories, 0);
	const totalKills = progress.reduce((acc, { kills }) => acc + kills, 0);
	const totalDeaths = progress.reduce((acc, { deaths }) => acc + deaths, 0);
	const kdRatio = totalDeaths ? (totalKills / totalDeaths).toFixed(2) : "N/A";

	return (
		<Paper sx={{ p: 2 }}>
			<Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
				<Typography>
					<Box component="span" color="secondary.main">
						Overall Rank:
					</Box>{" "}
					{overallRank || "N/A"}
				</Typography>
				<Typography>
					<Box component="span" color="secondary.main">
						Total Victories:
					</Box>{" "}
					{totalVictories}
				</Typography>
				<Typography>
					<Box component="span" color="secondary.main">
						Total Kills:
					</Box>{" "}
					{totalKills}
				</Typography>
				<Typography>
					<Box component="span" color="secondary.main">
						Total Deaths:
					</Box>{" "}
					{totalDeaths}
				</Typography>
				<Typography>
					<Box component="span" color="secondary.main">
						K/D Ratio:
					</Box>{" "}
					{kdRatio}
				</Typography>
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
		<Fragment>
			<Box
				sx={{
					minHeight: "100svh",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Header />

				<Box py={4} flex={1} display="flex" alignItems="center" justifyContent="center">
					<Container maxWidth="md">
						{isLoading ? (
							<Box height={480} display="flex" justifyContent="center" alignItems="center">
								<Loader />
							</Box>
						) : (
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<OverallStats />
								</Grid>
								{progress.map((classProgress) => (
									<Grid key={classProgress.name} item xs={12} md={4}>
										<ProgressClass {...classProgress} />
									</Grid>
								))}
							</Grid>
						)}
					</Container>
				</Box>
			</Box>

			<CharacterModal />
		</Fragment>
	);
};
