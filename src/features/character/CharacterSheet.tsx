import { Box, Stack, Typography, darken, useTheme } from "@mui/material";
import { LinearProgressWithLabel } from "common/components";
import { useAppSelector } from "common/hooks";
import { STATS_ABBR_MAP, Stat } from "common/utils";

export const CharacterSheet: React.FC = () => {
	const theme = useTheme();
	const character = useAppSelector((state) => state.character.character);

	if (!character) {
		return null;
	}

	const { name, level, characterClass, hitPoints, maxHitPoints, experience, stats } = character;

	return (
		<Box
			sx={{
				minHeight: "calc(100vh - 52px)",
				width: "400px",
				bgcolor: darken(theme.palette.background.paper, 0.25),
				p: 2,
			}}
		>
			<Box mb={2}>
				<Typography variant="h4">{name}</Typography>
				<Typography variant="subtitle1" color="textSecondary">
					Level {level} {characterClass.name}
				</Typography>
			</Box>

			<Box mb={2}>
				<Typography variant="body2">Health</Typography>
				<LinearProgressWithLabel value={hitPoints} max={maxHitPoints} label={`${hitPoints}/${maxHitPoints}`} />
				<Typography variant="body2">Experience</Typography>
				<LinearProgressWithLabel
					value={experience}
					max={experience}
					label={`${experience}/100`}
					customColor="#d065ff"
				/>
			</Box>

			<Stack direction="row" spacing={2} justifyContent="space-between">
				{Object.entries(stats).map(([k, v]) => (
					<Box textAlign="center">
						<Typography variant="caption" color="textSecondary">
							{STATS_ABBR_MAP[k as Stat]}
						</Typography>
						<Typography variant="body1">{v}</Typography>
					</Box>
				))}
			</Stack>
		</Box>
	);
};
