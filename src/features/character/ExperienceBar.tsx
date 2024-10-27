import { Box, Typography, styled } from "@mui/material";
import { useAppSelector } from "common/hooks";

const BarWrapper = styled(Box)(({ theme }) => ({
	position: "relative",
	width: "256px",
	height: "24px",
	backgroundColor: theme.palette.grey[900],
}));

const Bar = styled(Box)(({ theme }) => ({
	position: "relative",
	height: "100%",
	backgroundColor: theme.palette.info.main,
	transition: "width 0.5s ease-in-out",
}));

export const ExperienceBar: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);

	if (!character) {
		return null;
	}

	const { experience, currentLevelExperience, nextLevelExperience } = character;

	let normalisedValue: number;

	if (!nextLevelExperience) {
		normalisedValue = 100;
	} else if (experience > nextLevelExperience) {
		normalisedValue = 100;
	} else {
		normalisedValue =
			((experience - currentLevelExperience) * 100) / (nextLevelExperience - currentLevelExperience);
	}

	return (
		<Box display="flex" gap={2} alignItems="center">
			<BarWrapper>
				<Bar sx={{ width: `${normalisedValue}%` }} />
			</BarWrapper>

			<Typography width="40%">
				<Box component="span" color="secondary.main">
					XP
				</Box>{" "}
				{experience}
				{nextLevelExperience && `/${nextLevelExperience}`}
			</Typography>
		</Box>
	);
};
