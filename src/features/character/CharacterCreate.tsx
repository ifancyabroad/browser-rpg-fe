import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Fragment, useEffect, useState } from "react";
import { createCharacter, fetchClasses, getHasActiveCharacter } from "./characterSlice";
import { CharacterNameModal } from "features/modals";
import { useNavigate } from "react-router-dom";

export const CharacterCreate: React.FC = () => {
	const dispatch = useAppDispatch();
	const classes = useAppSelector((state) => state.character.classes);
	const isCharacterCreated = useAppSelector(getHasActiveCharacter);
	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchClasses());
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

	const handleResetCharacterClass = () => {
		setSelectedClass(null);
	};

	const handleCreateCharacter = (name: string) => {
		if (selectedClass) {
			dispatch(
				createCharacter({
					name,
					characterClass: selectedClass,
				}),
			);
		}
	};

	return (
		<Fragment>
			<Container>
				<Box
					sx={{
						minHeight: "calc(100vh - 52px)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						gap: 2,
						p: 2,
					}}
				>
					<Typography variant="h5" textAlign="center">
						Please select a class:
					</Typography>
					<Grid container spacing={2}>
						{classes.map(({ id, portrait, name, description }) => (
							<Grid item xs={12} md={4}>
								<Card key={id} sx={{ maxWidth: 345, margin: "auto" }}>
									<CardMedia sx={{ height: 340 }} image={portrait} title={name} />
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											{name}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{description}
										</Typography>
									</CardContent>
									<CardActions>
										<Button
											size="small"
											variant="contained"
											onClick={handleSelectClass}
											data-value={id}
										>
											Select
										</Button>
										<Button size="small" variant="contained" color="secondary" data-value={id}>
											Details
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
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
