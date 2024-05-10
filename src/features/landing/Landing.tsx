import { Box, Container, Link, Typography } from "@mui/material";
import { Footer, Header } from "common/components";
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
				flexDirection: "column",
			}}
		>
			<Header />

			<Box flex={1} display="flex" alignItems="center" justifyContent="center">
				<Container>
					<Typography textAlign="center">
						Welcome to{" "}
						<Box component="span" color="text.secondary">
							Browser Heroes
						</Box>
						, a free to play role playing game that can be played in your browser.
					</Typography>
					<Typography textAlign="center">
						<Link component="button" onClick={handleRegister}>
							Click here
						</Link>{" "}
						to get started.
					</Typography>
				</Container>
			</Box>

			<Footer />
		</Box>
	);
};
