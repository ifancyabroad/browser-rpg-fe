import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
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
			<Box
				sx={{
					minHeight: "calc(100vh - 52px)",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: 2,
				}}
			>
				<Typography variant="h5">BROWSER HEROES</Typography>
				<Typography>Please select a class!</Typography>
				<Stack direction="row" spacing={2}>
					{classes.map(({ id, portrait, name, description }) => (
						<Card sx={{ maxWidth: 345 }}>
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
								<Button size="small" onClick={handleSelectClass} data-value={id}>
									Select
								</Button>
							</CardActions>
						</Card>
					))}
				</Stack>
			</Box>

			<CharacterNameModal
				isOpen={Boolean(selectedClass)}
				onClose={handleResetCharacterClass}
				onConfirm={handleCreateCharacter}
			/>
		</Fragment>
	);
};
