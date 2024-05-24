import { Box, Stack, Typography } from "@mui/material";
import { ActiveEffects, HealthBar } from "common/components";
import { useAppSelector } from "common/hooks";

export const Enemy: React.FC = () => {
	const enemy = useAppSelector((state) => state.battle.battle?.enemy);

	if (!enemy) {
		return null;
	}

	const { name, image, hitPoints, maxHitPoints, activeAuxiliaryEffects, activeStatusEffects } = enemy;

	return (
		<Stack spacing={1}>
			<Typography variant="h6" fontSize={18} color="primary.main" noWrap>
				{name}
			</Typography>
			<HealthBar value={hitPoints} max={maxHitPoints} />
			<ActiveEffects auxiliaryEffects={activeAuxiliaryEffects} statusEffects={activeStatusEffects} />
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
		</Stack>
	);
};
