import { Box, Container, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getIsRegistered, logout } from "features/authentication";
import { openContactModal } from "features/contact";
import { openLeaderboard } from "features/leaderboard";
import { openRegistrationModal } from "features/modals";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const isRegistered = useAppSelector(getIsRegistered);
	const isLoggedIn = useAppSelector((state) => state.authentication.session);

	const handleRegister = () => {
		dispatch(openRegistrationModal());
	};

	const handleLogout = async () => {
		dispatch(logout());
	};

	const handleOpenContact = () => {
		dispatch(openContactModal());
	};

	const handleOpenLeaderboard = () => {
		dispatch(openLeaderboard());
	};

	return (
		<Box py={1}>
			<Container maxWidth={false}>
				<Box display="flex" justifyContent="flex-end" flexWrap="wrap" gap={{ xs: 2, sm: 3 }}>
					{isRegistered && (
						<Link component={NavLink} to="/stats" color="text.secondary">
							Stats
						</Link>
					)}
					{isLoggedIn && (
						<Link component="button" onClick={handleOpenLeaderboard} color="text.secondary">
							Leaderboard
						</Link>
					)}
					<Link component="button" onClick={handleOpenContact} color="text.secondary">
						Contact
					</Link>
					{isRegistered ? (
						<Link component="button" onClick={handleLogout}>
							Sign Out
						</Link>
					) : (
						<Link component="button" onClick={handleRegister}>
							Register
						</Link>
					)}
				</Box>
			</Container>
		</Box>
	);
};
