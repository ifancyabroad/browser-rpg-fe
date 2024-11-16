import { Box, Container, Grid, Link, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Fragment, useEffect, useState } from "react";
import { fetchProgress } from "./characterSlice";
import { openCharacterModal, openErrorModal } from "features/modals";
import { Loader } from "common/components";
import { Header } from "./Header";
import { ICharacter } from "common/types";
import { FINAL_LEVEL, Status } from "common/utils";
import { CharacterModal } from "features/modals/CharacterModal";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index ? children : null}
		</div>
	);
};

const ProgressClass: React.FC<ICharacter> = (character) => {
	const dispatch = useAppDispatch();
	const { name, characterClass, day, level, kills, maxBattleLevel, status, slainBy } = character;
	const { portrait } = characterClass;
	const hasVictory = maxBattleLevel >= FINAL_LEVEL;

	const handleViewHero = () => {
		if (!character) {
			return;
		}
		dispatch(openCharacterModal({ character }));
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
				<Box display="flex" justifyContent="space-between" mb={2}>
					<Link component="button" onClick={handleViewHero}>
						{name}
					</Link>
					<Typography textAlign="right">
						<Box component="span" color="info.main">
							Class:
						</Box>{" "}
						{characterClass.name}
					</Typography>
				</Box>

				<Stack spacing={1}>
					<Typography>
						<Box component="span" color="secondary.main">
							Level:
						</Box>{" "}
						{level}
					</Typography>
					<Typography>
						<Box component="span" color="secondary.main">
							Kills:
						</Box>{" "}
						{kills}
					</Typography>
					<Typography>
						<Box component="span" color="secondary.main">
							Day:
						</Box>{" "}
						{day}
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
							}[status]
						}
					</Typography>
					{slainBy && (
						<Typography>
							<Box component="span" color="secondary.main">
								Slain By:
							</Box>{" "}
							{slainBy}
						</Typography>
					)}
				</Stack>
			</Box>
		</Paper>
	);
};

const OverallStats: React.FC = () => {
	const progress = useAppSelector((state) => state.character.progress);

	if (!progress) {
		return null;
	}

	const { deaths, kills, rank, victories } = progress;

	const kdRatio = deaths ? (kills / deaths).toFixed(2) : "N/A";

	return (
		<Paper sx={{ p: 2 }}>
			<Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
				<Typography>
					<Box component="span" color="secondary.main">
						Overall Rank:
					</Box>{" "}
					{rank || "N/A"}
				</Typography>
				<Typography>
					<Box component="span" color="secondary.main">
						Total Victories:
					</Box>{" "}
					{victories}
				</Typography>
				<Typography>
					<Box component="span" color="secondary.main">
						Total Kills:
					</Box>{" "}
					{kills}
				</Typography>
				<Typography>
					<Box component="span" color="secondary.main">
						Total Deaths:
					</Box>{" "}
					{deaths}
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

enum ProgressTab {
	Overall,
	Class,
}

export const Progress: React.FC = () => {
	const dispatch = useAppDispatch();
	const progress = useAppSelector((state) => state.character.progress);
	const status = useAppSelector((state) => state.character.progressStatus);
	const isLoading = status === "loading";
	const classProgress = progress?.classProgress || [];
	const overallProgress = progress?.overallProgress || [];
	const [progressTab, setProgressTab] = useState(ProgressTab.Overall);

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

	const handleChangeTab = (event: React.SyntheticEvent, newValue: ProgressTab) => {
		setProgressTab(newValue);
	};

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
						<Typography textAlign="center" color="text.secondary" mb={4}>
							Progress
						</Typography>
						{isLoading ? (
							<Box height={480} display="flex" justifyContent="center" alignItems="center">
								<Loader />
							</Box>
						) : (
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<OverallStats />
								</Grid>
								<Grid container spacing={2} item xs={12}>
									<Grid item xs={12}>
										<Tabs value={progressTab} onChange={handleChangeTab} variant="fullWidth">
											<Tab label="Top 3 Overall" value={ProgressTab.Overall} />
											<Tab label="Top 3 By Class" value={ProgressTab.Class} />
										</Tabs>
									</Grid>
									<Grid item xs={12}>
										<TabPanel value={progressTab} index={ProgressTab.Overall}>
											<Grid container spacing={2}>
												{overallProgress.length ? (
													overallProgress.map((character) => (
														<Grid key={character.id} item xs={12} md={4}>
															<ProgressClass {...character} />
														</Grid>
													))
												) : (
													<Box
														height={400}
														display="flex"
														justifyContent="center"
														alignItems="center"
													>
														<Typography>No characters found</Typography>
													</Box>
												)}
											</Grid>
										</TabPanel>
										<TabPanel value={progressTab} index={ProgressTab.Class}>
											<Grid container spacing={2}>
												{classProgress.length ? (
													classProgress.map((character) => (
														<Grid key={character.id} item xs={12} md={4}>
															<ProgressClass {...character} />
														</Grid>
													))
												) : (
													<Box
														height={400}
														display="flex"
														justifyContent="center"
														alignItems="center"
													>
														<Typography>No characters found</Typography>
													</Box>
												)}
											</Grid>
										</TabPanel>
									</Grid>
								</Grid>
							</Grid>
						)}
					</Container>
				</Box>
			</Box>

			<CharacterModal />
		</Fragment>
	);
};
