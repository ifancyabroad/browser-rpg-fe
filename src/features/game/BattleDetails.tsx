import { Box, Paper, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { CombatLog } from "./CombatLog";
import { AuxiliaryEffect, StatusEffect } from "./Effect";

export const BattleDetails: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.game.battle);

	if (!character || !battle) {
		return null;
	}

	return (
		<Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Typography variant="h6">{character.name} active effects</Typography>
				<Paper
					variant="outlined"
					sx={{ minHeight: "42px", display: "flex", alignItems: "flex-start", gap: "1px" }}
				>
					{character.activeAuxiliaryEffects.map((effect) => (
						<AuxiliaryEffect key={effect.effect} {...effect} />
					))}
					{character.activeStatusEffects.map((effect) => (
						<StatusEffect key={effect.skill.id} {...effect} />
					))}
				</Paper>
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
				<Typography variant="h6">{battle.enemy.name} active effects</Typography>
				<Paper
					variant="outlined"
					sx={{ minHeight: "42px", display: "flex", alignItems: "flex-start", gap: "1px" }}
				>
					{battle.enemy.activeAuxiliaryEffects.map((effect) => (
						<AuxiliaryEffect key={effect.effect} {...effect} />
					))}
					{battle.enemy.activeStatusEffects.map((effect) => (
						<StatusEffect key={effect.skill.id} {...effect} />
					))}
				</Paper>
			</Box>
			<CombatLog turns={battle.turns} />
		</Box>
	);
};
