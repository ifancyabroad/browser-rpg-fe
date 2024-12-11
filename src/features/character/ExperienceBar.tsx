import { Box, Typography, styled } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { getExperienceProgress } from ".";

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
	const progress = useAppSelector(getExperienceProgress);

	if (!character) {
		return null;
	}

	const { experience, nextLevelExperience } = character;

	return (
		<Box display="flex" gap={2} alignItems="center">
			<BarWrapper>
				<Bar sx={{ width: `${progress}%` }} />
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
