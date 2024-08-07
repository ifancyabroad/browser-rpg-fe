import { Box, Stack, Typography } from "@mui/material";
import { ActiveEffects, HealthBar } from "common/components";
import { useAppSelector } from "common/hooks";

export const Enemy: React.FC = () => {
	const enemy = useAppSelector((state) => state.battle.battle?.enemy);

	if (!enemy) {
		return null;
	}

	const { name, level, image, hitPoints, maxHitPoints, activeAuxiliaryEffects, activeStatusEffects } = enemy;

	return (
		<Stack spacing={1}>
			<Typography variant="h6" fontSize={18} color="primary.main" noWrap>
				Level{" "}
				<Box component="span" color="text.secondary">
					{level}
				</Box>{" "}
				{name}
			</Typography>
			<HealthBar value={hitPoints} max={maxHitPoints} />
			<ActiveEffects auxiliaryEffects={activeAuxiliaryEffects} statusEffects={activeStatusEffects} />
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					component="img"
					sx={{
						height: 500,
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
