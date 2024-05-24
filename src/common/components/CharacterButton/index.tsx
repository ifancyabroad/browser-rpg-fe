import { Button, ButtonProps, styled } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { openCharacterSheet } from "features/character";
import { ReactComponent as CharacterIcon } from "assets/images/icons/spiked-halo.svg";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
	position: "fixed",
	bottom: 16,
	right: 16,
	borderRadius: "50%",
	transformOrigin: "50% 50%",
	height: 64,
	width: 64,
	padding: 0,
}));

export const CharacterButton: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleDrawerToggle = () => {
		dispatch(openCharacterSheet());
	};

	return (
		<StyledButton
			aria-label="character"
			color="primary"
			variant="contained"
			onClick={handleDrawerToggle}
			sx={{
				display: { md: "none" },
			}}
		>
			<CharacterIcon height={40} width={40} />
		</StyledButton>
	);
};
