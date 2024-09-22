import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { CombatLog } from "./CombatLog";
import { ActiveEffects, HealthBar } from "common/components";

export const BattleDetails: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.battle.battle);

	if (!character || !battle) {
		return null;
	}

	const { name, activeAuxiliaryEffects, activeStatusEffects, hitPoints, maxHitPoints, level } = character;

	return (
		<Stack height="100%" spacing={1}>
			<Typography variant="h6" fontSize={18} color="primary.main" noWrap>
				{name} the Level{" "}
				<Box component="span" color="text.secondary">
					{level}
				</Box>{" "}
				{character.characterClass.name}
			</Typography>
			<HealthBar value={hitPoints} max={maxHitPoints} />
			<ActiveEffects auxiliaryEffects={activeAuxiliaryEffects} statusEffects={activeStatusEffects} />
			<Box display="flex" justifyContent="space-between" gap={1}>
				<Box display="flex" alignItems="center" gap={1}>
					<Typography color="secondary.main">Battle</Typography>
					<Typography>{battle.level}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap={1}>
					<Typography color="secondary.main">Highest</Typography>
					<Typography>{character.maxBattleLevel}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap={1}>
					<Typography color="secondary.main">Zone</Typography>
					<Typography textTransform="capitalize">{battle.zone}</Typography>
				</Box>
				<Box display="flex" alignItems="center" gap={1}>
					<Typography color="secondary.main">Slain</Typography>
					<Typography>{character.streak}</Typography>
				</Box>
			</Box>
			<CombatLog turns={battle.turns} />
		</Stack>
	);
};
