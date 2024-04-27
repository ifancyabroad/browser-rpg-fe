import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Fragment, useEffect, useState } from "react";
import { createCharacter, fetchClasses, getHasActiveCharacter } from "./characterSlice";
import { CharacterNameModal, openCharacterClassModal, openErrorModal } from "features/modals";
import { useNavigate } from "react-router-dom";
import { Loader } from "common/components";

export const CharacterCreate: React.FC = () => {
	const dispatch = useAppDispatch();
	const classes = useAppSelector((state) => state.character.classes);
	const isCharacterCreated = useAppSelector(getHasActiveCharacter);
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const status = useAppSelector((state) => state.character.status);
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
			<Container>
				<Box
					sx={{
						minHeight: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						gap: 2,
						p: 2,
					}}
				>
					<Typography variant="h5" textAlign="center">
						Please select a class
					</Typography>
					{isLoading ? (
						<Box height={520} display="flex" justifyContent="center" alignItems="center">
							<Loader />
						</Box>
					) : (
						<Grid container spacing={2}>
							{classes.map(({ id, portrait, name, description }) => (
								<Grid key={id} item xs={12} md={4}>
									<Card sx={{ maxWidth: 345, margin: "auto" }}>
										<CardMedia sx={{ height: 340 }} image={portrait} title={name} />
										<CardContent sx={{ textAlign: "center" }}>
											<Typography gutterBottom variant="h5" component="div">
												{name}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{description}
											</Typography>
										</CardContent>
										<CardActions>
											<Button onClick={handleSelectClass} data-value={id}>
												Select
											</Button>
											<Button onClick={handleViewClass} data-value={id}>
												Details
											</Button>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					)}
				</Box>
			</Container>

			<CharacterNameModal
				isOpen={Boolean(selectedClass)}
				onClose={handleResetCharacterClass}
				onConfirm={handleCreateCharacter}
			/>
		</Fragment>
	);
};
