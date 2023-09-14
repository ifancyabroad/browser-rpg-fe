import { Button, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export const Menu: React.FC = () => {
	return (
		<Fragment>
			<Typography variant="h5">BROWSER HEROES</Typography>
			<Typography>This is the game page!</Typography>
			<Stack direction="row" spacing={2}>
				<Button variant="contained" component={Link} to="/game/hall-of-fame">
					Hall of Fame
				</Button>
				<Button variant="contained">Rest</Button>
				<Button variant="contained" component={Link} to="/game/shop">
					Shop
				</Button>
				<Button variant="contained" component={Link} to="/game/battle">
					Battle
				</Button>
			</Stack>
		</Fragment>
	);
};
