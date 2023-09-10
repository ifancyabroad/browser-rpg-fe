import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useEffect } from "react";
import { fetchClasses } from "./characterSlice";

export const CharacterCreate: React.FC = () => {
	const dispatch = useAppDispatch();
	const classes = useAppSelector((state) => state.character.classes);
	console.log(classes);

	useEffect(() => {
		dispatch(fetchClasses());
	}, [dispatch]);

	return (
		<Box
			sx={{
				minHeight: "100vh",
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
				{classes.map(({ portrait, name, description }) => (
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
							<Button size="small">Select</Button>
						</CardActions>
					</Card>
				))}
			</Stack>
		</Box>
	);
};
