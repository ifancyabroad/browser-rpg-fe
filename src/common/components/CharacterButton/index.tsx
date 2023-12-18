import { Button, ButtonProps, keyframes, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { openCharacterSheet } from "features/character";
import { useMatch } from "react-router-dom";
import { ReactComponent as CharacterIcon } from "assets/images/icons/spiked-halo.svg";

const headShakeAnimation = keyframes`
	0%,
    50%,
    100% {
        transform: translate(0px, 0px);
    }

    6.5% {
        transform: translate(-6px, 0px) rotateY(-9deg);
    }

    18.5% {
        transform: translate(5px, 0px) rotateY(7deg);
    }

    31.5% {
        transform: translate(-3px, 0px) rotateY(-5deg);
    }

    43.5% {
        transform: translate(2px, 0px) rotateY(3deg);
    }
`;

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
	const isCharacterSheetOpen = useAppSelector((state) => state.character.isCharacterSheetOpen);
	const isBattle = useMatch({ path: "/game/battle", end: true });
	const isAnimated = isBattle && !isCharacterSheetOpen;

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
				animation: isAnimated ? `${headShakeAnimation} 1s ease-in-out 0s infinite normal both running` : null,
			}}
		>
			<CharacterIcon height={40} width={40} />
		</StyledButton>
	);
};
