import { Box, Button, Link, Paper, Typography } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { openRegistrationModal } from "features/modals";

export const Landing: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleRegister = () => {
		dispatch(openRegistrationModal());
	};

	return (
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
			<Paper
				sx={{
					maxWidth: "600px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					textAlign: "center",
					gap: 3,
					p: 4,
				}}
			>
				<Typography variant="h4" fontWeight="bold">
					BROWSER HEROES
				</Typography>
				<Typography>
					Browser Heroes is a free to play role playing game that can be played in your browser. Choose from a
					selection of different classes and make your way through a procedurally generated dungeon battling
					all variery of different monsters and enemies.
				</Typography>
				<Box display="flex" justifyContent="center" gap={2}>
					<Button variant="outlined" onClick={handleRegister} size="large">
						GET STARTED
					</Button>
				</Box>
				<Typography variant="body2">
					For any questions or comments please email me at{" "}
					<Link href="mailto:edgar.nightingale@btinternet.com">edgar.nightingale@btinternet.com</Link>
				</Typography>
			</Paper>
		</Box>
	);
};
