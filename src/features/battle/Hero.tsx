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
		<Stack spacing={1}>
			<Typography variant="h6" fontSize={18} color="primary.main" noWrap>
				{name} the Level{" "}
				<Box component="span" color="text.secondary">
					{level}
				</Box>{" "}
				{character.characterClass.name}
			</Typography>
			<HealthBar value={hitPoints} max={maxHitPoints} />
			<ActiveEffects auxiliaryEffects={activeAuxiliaryEffects} statusEffects={activeStatusEffects} />
		</Stack>
	);
};
