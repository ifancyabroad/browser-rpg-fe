import { Box, Container, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getIsRegistered, logout } from "features/authentication";
import { openContactModal } from "features/contact";
import { openRegistrationModal } from "features/modals";

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const isRegistered = useAppSelector(getIsRegistered);

	const handleRegister = () => {
		dispatch(openRegistrationModal());
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
