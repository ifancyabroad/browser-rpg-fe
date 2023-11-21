import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { getHasActiveCharacter } from "features/character";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "assets/images/logos/browser_heroes.png";

export const Start: React.FC = () => {
	const hasActiveCharacter = useAppSelector(getHasActiveCharacter);

	return (
		<Box
			sx={{
				minHeight: "calc(100vh - 53px)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				gap: 2,
				p: 2,
			}}
		>
			<Paper
				sx={{
					maxWidth: "400px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					textAlign: "center",
					gap: 2,
					p: 4,
				}}
			>
				<Box component="img" src={logo} height={64} width={64} />
				<Typography variant="h5" fontFamily="'Cinzel', serif" fontWeight="bold">
					BROWSER HEROES
				</Typography>
				{hasActiveCharacter ? (
					<Fragment>
						<Typography>Welcome to Browser Heroes! </Typography>
						<Typography>
							Click one of the below options to continue your existing game or start a new one.
						</Typography>
						<Stack direction="row" spacing={2}>
							<Button variant="contained" color="secondary" component={Link} to="/game">
								CONTINUE
							</Button>
							<Button variant="contained" component={Link} to="/create">
								NEW GAME
							</Button>
						</Stack>
					</Fragment>
				) : (
					<Fragment>
						<Typography>Welcome to Browser Heroes, your new adventure awaits you! </Typography>
						<Typography>
							Please click the button below to start a new game and see how long you can survive!
						</Typography>
						<Button variant="contained" component={Link} to="/create">
							START
						</Button>
					</Fragment>
				)}
			</Paper>
		</Box>
	);
};
