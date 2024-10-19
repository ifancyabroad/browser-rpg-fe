import { Box, Container, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { logout } from "features/authentication";
import { openContactModal } from "features/contact";
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

	const handleOpenContact = () => {
		dispatch(openContactModal());
	};

	return (
		<Box py={1}>
			<Container maxWidth={false}>
				<Box display="flex" justifyContent="flex-end" gap={3}>
					<Link component="button" onClick={handleOpenContact} color="text.secondary">
						Contact
					</Link>
					{isLoggedIn ? (
						<Link component="button" onClick={handleLogout}>
							Sign Out
						</Link>
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
