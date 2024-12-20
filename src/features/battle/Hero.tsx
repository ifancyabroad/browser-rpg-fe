import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { ActiveEffects, HealthBar } from "common/components";

export const Hero: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);

	if (!character) {
		return null;
	}

	const { name, activeAuxiliaryEffects, activeStatusEffects, hitPoints, maxHitPoints, level } = character;

	return (
		<Stack spacing={1} minHeight={{ xs: 94, sm: 110 }}>
			<Typography variant="h6" fontSize={18} color="primary.main" noWrap>
				<Box component="span" color="text.secondary">
					Level {level}{" "}
				</Box>
				{character.characterClass.name} {name}
			</Typography>
			<HealthBar value={hitPoints} max={maxHitPoints} />
			<ActiveEffects auxiliaryEffects={activeAuxiliaryEffects} statusEffects={activeStatusEffects} />
		</Stack>
	);
};
