import { Box, Typography } from "@mui/material";
import { HealthBar } from "common/components";
import { useAppSelector } from "common/hooks";

export const Enemy: React.FC = () => {
	const enemy = useAppSelector((state) => state.battle.battle?.enemy);

	if (!enemy) {
		return null;
	}

	const { name, image, hitPoints, maxHitPoints, activeAuxiliaryEffects, activeStatusEffects } = enemy;

	return (
		<Box maxWidth={600}>
			<Box mb={2}>
				<Typography variant="h6" fontSize={18} color="primary.main" noWrap>
					{name}
				</Typography>
				<HealthBar
					value={hitPoints}
					max={maxHitPoints}
					auxiliaryEffects={activeAuxiliaryEffects}
					statusEffects={activeStatusEffects}
				/>
			</Box>

			<Box
				sx={{
					width: "100%",
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
