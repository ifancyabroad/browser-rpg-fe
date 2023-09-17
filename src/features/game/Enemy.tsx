import { Box, Typography } from "@mui/material";
import { LinearProgressWithLabel } from "common/components";
import { useAppSelector } from "common/hooks";

export const Enemy: React.FC = () => {
	const enemy = useAppSelector((state) => state.game.battle?.enemy);

	if (!enemy) {
		return null;
	}

	const { name, image, level, hitPoints, maxHitPoints } = enemy;

	return (
		<Box>
			<Box mb={2}>
				<Typography variant="h4">{name}</Typography>
				<Typography variant="subtitle1" color="textSecondary">
					Level {level}
				</Typography>
			</Box>

			<Box mb={2}>
				<Typography variant="body2">Health</Typography>
				<LinearProgressWithLabel value={hitPoints} max={maxHitPoints} label={`${hitPoints}/${maxHitPoints}`} />
			</Box>

			<Box
				sx={{
					marginBottom: 3,
					width: "100%",
					maxWidth: 600,
					aspectRatio: "1/1",
				}}
			>
				<Box
					component="img"
					sx={{
						maxWidth: "100%",
						verticalAlign: "middle",
					}}
					src={image}
					alt={name}
				/>
			</Box>
		</Box>
	);
};
