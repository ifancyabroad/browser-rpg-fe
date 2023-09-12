import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { getHasActiveCharacter } from "features/character";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export const Start: React.FC = () => {
	const hasActiveCharacter = useAppSelector(getHasActiveCharacter);

	return (
		<Box
			sx={{
				height: "calc(100vh - 52px)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<Typography variant="h5">BROWSER HEROES</Typography>
			{hasActiveCharacter ? (
				<Fragment>
					<Typography>Click the button below to continue your game!</Typography>
					<Button variant="contained" component={Link} to="/game">
						CONTINUE
					</Button>
				</Fragment>
			) : (
				<Fragment>
					<Typography>Click the button below to start!</Typography>
					<Button variant="contained" component={Link} to="/create">
						START
					</Button>
				</Fragment>
			)}
		</Box>
	);
};
