import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { CombatLog } from "./CombatLog";
import { ActiveEffects, HealthBar } from "common/components";

export const BattleDetails: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.battle.battle);

	if (!character || !battle) {
		return null;
	}

	const { name, activeAuxiliaryEffects, activeStatusEffects, hitPoints, maxHitPoints } = character;

	return (
		<Stack height="100%" spacing={1}>
			<Typography variant="h6" fontSize={18} color="primary.main" noWrap>
				{name} the {character.characterClass.name}
			</Typography>
			<HealthBar value={hitPoints} max={maxHitPoints} />
			<ActiveEffects auxiliaryEffects={activeAuxiliaryEffects} statusEffects={activeStatusEffects} />
			<CombatLog turns={battle.turns} />
		</Stack>
	);
};
