import { Box, Container, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { logout } from "features/authentication";
import { openLoginModal } from "features/modals";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector((state) => state.authentication.session);

	const handleLogin = () => {
		dispatch(openLoginModal());
	};

	const handleLogout = async () => {
		dispatch(logout());
	};

	return (
		<Box py={1}>
			<Container maxWidth={false}>
				<Box display="flex" justifyContent="flex-end">
					{isLoggedIn ? (
						<Link component="button" onClick={handleLogout} ml="auto">
							Sign Out
						</Link>
					) : (
						<Link component="button" onClick={handleLogin} ml="auto">
							Sign In
						</Link>
					)}
				</Box>
			</Container>
		</Box>
	);
};
