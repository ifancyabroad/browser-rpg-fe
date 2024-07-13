import { Box, Container, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { logout } from "features/authentication";
import { openLeaderboard } from "features/leaderboard";
import { openLoginModal } from "features/modals";
import { Fragment } from "react";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector((state) => state.authentication.session);

	const handleLogin = () => {
		dispatch(openLoginModal());
	};

	const handleLogout = async () => {
		dispatch(logout());
	};

	const handleViewLeaderboard = () => {
		dispatch(openLeaderboard());
	};

	return (
		<Box py={1}>
			<Container maxWidth={false}>
				<Box display="flex" justifyContent="flex-end" gap={3}>
					{isLoggedIn ? (
						<Fragment>
							<Link color="text.secondary">Almanac</Link>
							<Link color="text.secondary">My Heroes</Link>
							<Link component="button" onClick={handleViewLeaderboard} color="text.secondary">
								Leaderboard
							</Link>
							<Link component="button" onClick={handleLogout}>
								Sign Out
							</Link>
						</Fragment>
					) : (
						<Link component="button" onClick={handleLogin}>
							Sign In
						</Link>
					)}
				</Box>
			</Container>
		</Box>
	);
};
