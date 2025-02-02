import { Avatar, Box, Card, CardActions, CardHeader, Container, Grid, Link, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Fragment, useEffect, useState } from "react";
import { createCharacter, fetchClasses, getHasActiveCharacter } from "./characterSlice";
import { CharacterNameModal, openCharacterClassModal, openErrorModal } from "features/modals";
import { useNavigate } from "react-router-dom";
import { Loader } from "common/components";
import { Header } from "./Header";

export const CharacterCreate: React.FC = () => {
	const dispatch = useAppDispatch();
	const classes = useAppSelector((state) => state.character.classes);
	const isCharacterCreated = useAppSelector(getHasActiveCharacter);
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const status = useAppSelector((state) => state.character.classesStatus);
	const isLoading = status === "loading";
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchClasses()).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		fetchData();
	}, [dispatch]);

	useEffect(() => {
		if (isCharacterCreated) {
			setSelectedClass(null);
			navigate("/game");
		}
	}, [isCharacterCreated, navigate]);

	const handleSelectClass = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget.dataset;
		setSelectedClass(value as string);
	};

	const handleViewClass = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		const { value } = e.currentTarget.dataset;
		const characterClass = classes.find(({ id }) => id === value);
		if (characterClass) {
			dispatch(openCharacterClassModal({ characterClass }));
		}
	};

	const handleResetCharacterClass = () => {
		setSelectedClass(null);
	};

	const handleCreateCharacter = async (name: string) => {
		if (!selectedClass) {
			return;
		}

		try {
			await dispatch(
				createCharacter({
					name,
					characterClass: selectedClass,
				}),
			).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
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
						<Typography color="text.secondary" textAlign="center" mb={4}>
							Please select a class
						</Typography>
						{isLoading ? (
							<Box height={480} display="flex" justifyContent="center" alignItems="center">
								<Loader />
							</Box>
						) : (
							<Grid container spacing={2} justifyContent="center">
								{classes.map(({ id, name, description, icon }) => (
									<Grid key={id} item xs={12} md={6}>
										<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
											<CardHeader
												avatar={<Avatar alt={name} src={icon} sx={{ width: 56, height: 56 }} />}
												title={name}
												titleTypographyProps={{ color: "text.secondary" }}
												subheader={description}
												subheaderTypographyProps={{ color: "text.primary" }}
											/>
											<CardActions>
												<Link component="button" onClick={handleSelectClass} data-value={id}>
													Select
												</Link>
												<Link
													component="button"
													color="secondary"
													onClick={handleViewClass}
													data-value={id}
												>
													Details
												</Link>
											</CardActions>
										</Card>
									</Grid>
								))}
							</Grid>
						)}
					</Container>
				</Box>
			</Box>

			<CharacterNameModal
				isOpen={Boolean(selectedClass)}
				onClose={handleResetCharacterClass}
				onConfirm={handleCreateCharacter}
			/>
		</Fragment>
	);
};
