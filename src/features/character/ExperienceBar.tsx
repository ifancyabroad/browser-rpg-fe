import { Box, IconButton, Stack, Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { openLevelUpModal } from "features/modals";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { State } from "common/utils";

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

const LevelUpWrapper = styled(Stack)({
	flexDirection: "row",
	gap: "4px",
	position: "absolute",
	left: 0,
	top: "100%",
	zIndex: 2,
});

export const ExperienceBar: React.FC = () => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);

	if (!character) {
		return null;
	}

	const handleLevelUp = () => {
		dispatch(openLevelUpModal());
	};

	const { experience, nextLevelExperience, state } = character;
	const showLevelUp = experience >= nextLevelExperience && state === State.Idle;
	const normalisedValue =
		experience > nextLevelExperience ? 100 : ((experience - 0) * 100) / (nextLevelExperience - 0);

	return (
		<Stack spacing={1}>
			<Box display="flex" gap={2} alignItems="center">
				<BarWrapper>
					<Bar sx={{ width: `${normalisedValue}%` }} />
				</BarWrapper>

				<Typography variant="body2" fontSize="12px">
					<Box component="span" color="secondary.main">
						XP
					</Box>{" "}
					{experience} / {nextLevelExperience}
				</Typography>
			</Box>

			{showLevelUp && (
				<LevelUpWrapper direction="row" spacing={1}>
					<IconButton onClick={handleLevelUp}>
						<KeyboardDoubleArrowUpIcon />
					</IconButton>
				</LevelUpWrapper>
			)}
		</Stack>
	);
};
