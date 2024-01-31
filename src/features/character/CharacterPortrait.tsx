import portraitFrame from "assets/images/ui/CharacterPortraitFrame.png";
import healthBarFrame from "assets/images/ui/CharacterHealthBarFrame.png";
import buttonFrame from "assets/images/ui/CharacterPortraitButtonFrame.png";
import levelUpIcon from "assets/images/ui/LevelUpIcon.png";
import characterIcon from "assets/images/ui/CharacterIcon.svg";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Box, ButtonBase, Typography, styled } from "@mui/material";
import { State } from "common/utils";
import { openLevelUpModal } from "features/modals";

const PortraitWrapper = styled(Box)({
	position: "relative",
	backgroundImage: `url(${portraitFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "128px",
	height: "128px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: 1,
});

const HealthBarWrapper = styled(Box)({
	position: "relative",
	backgroundImage: `url(${healthBarFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "256px",
	height: "48px",
	display: "flex",
	alignItems: "center",
	marginLeft: "-16px",
	padding: "13px 10px",
});

const HealthBar = styled(Box)({
	position: "relative",
	height: "100%",
	backgroundImage: "linear-gradient(90deg, #397a41 0%, #49794f 100%)",
	display: "flex",
	alignItems: "center",
	paddingLeft: "10px",
	transition: "width 0.5s ease-in-out",
	":after": {
		content: "''",
		position: "absolute",
		right: 0,
		top: "50%",
		transform: "translateY(-50%)",
		width: "32px",
		height: "32px",
		backgroundImage: "linear-gradient(90deg, rgba(241,62,0,0) 0%, rgba(241,62,0,0) 0%, #49794f 100%)",
	},
});

const PortraitButton = styled(ButtonBase)({
	position: "absolute",
	bottom: -10,
	right: -10,
	width: "65px",
	height: "65px",
	cursor: "pointer",
	backgroundImage: `url(${buttonFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
});

export const CharacterPortrait: React.FC = () => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);

	const handleLevelUp = () => {
		dispatch(openLevelUpModal());
	};

	if (!character) {
		return null;
	}

	const { hitPoints, maxHitPoints, experience, nextLevelExperience, state } = character;
	const normalisedValue = hitPoints > maxHitPoints ? 100 : ((hitPoints - 0) * 100) / (maxHitPoints - 0);

	return (
		<Box display="flex" alignItems="center">
			<PortraitWrapper>
				<Box component="img" src={characterIcon} alt="Character" width="100px" mt="12px" />

				{experience >= nextLevelExperience && (
					<PortraitButton aria-label="Level up" onClick={handleLevelUp} disabled={state === State.Battle}>
						<img src={levelUpIcon} alt="Level Up" width="34" />
					</PortraitButton>
				)}
			</PortraitWrapper>
			<HealthBarWrapper>
				<HealthBar sx={{ width: `${normalisedValue}%` }}>
					<Typography variant="body2" color="white" fontSize={12} fontWeight="bold">
						{hitPoints}/{maxHitPoints}
					</Typography>
				</HealthBar>
			</HealthBarWrapper>
		</Box>
	);
};
