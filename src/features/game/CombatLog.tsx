import { Box, Paper, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { IAction } from "common/types";
import {
	AUXILIARY_EFFECTS_NAME_MAP,
	AUXILIARY_EFFECTS_NAME_MAP_PASSED,
	AuxiliaryEffect,
	PROPERTY_CONFIG,
	PropertyType,
	Target,
	getPropertyConfig,
} from "common/utils";
import { Fragment } from "react";

const Action: React.FC<IAction> = ({
	damage,
	enemy,
	heal,
	status,
	auxiliary,
	activeEffects,
	self,
	skill,
	weaponDamage,
}) => {
	const getTarget = (target: Target) => {
		return target === Target.Enemy ? enemy : self;
	};

	return (
		<Fragment>
			<Typography variant="body2">
				{self} uses {skill}
			</Typography>
			{weaponDamage
				.flatMap((damage) => damage)
				.map((damage, index) => (
					<Typography key={index} variant="body2">
						{getTarget(damage.target)} takes {damage.value} damage ({damage.type}) ({damage.hitType})
					</Typography>
				))}
			{damage.map((damage, index) => (
				<Typography key={index} variant="body2">
					{getTarget(damage.target)} takes {damage.value} damage ({damage.type})
				</Typography>
			))}
			{heal.map((heal, index) => (
				<Typography key={index} variant="body2">
					{getTarget(heal.target)} restores {heal.value} hit points
				</Typography>
			))}
			{status.map((status) =>
				status.properties.map((prop, index) => {
					const config = getPropertyConfig(prop);
					const prefix = prop.value >= 0 ? PROPERTY_CONFIG[prop.type as PropertyType].prefix : "";
					const suffix = PROPERTY_CONFIG[prop.type as PropertyType].suffix;

					if (status.saved) {
						return (
							<Typography key={`${status.skill.id}-${index}`} variant="body2">
								{getTarget(status.target)} saves against {skill} ({config?.name})
							</Typography>
						);
					}

					return (
						<Typography key={`${status.skill.id}-${index}`} variant="body2">
							{getTarget(status.target)} receives {prefix}
							{prop.value}
							{suffix} to {config?.name}
						</Typography>
					);
				}),
			)}
			{auxiliary.map((status, index) => {
				if (status.saved) {
					return (
						<Typography key={index} variant="body2">
							{getTarget(status.target)} saves against{" "}
							{AUXILIARY_EFFECTS_NAME_MAP[status.effect as AuxiliaryEffect]}
						</Typography>
					);
				}

				return (
					<Typography key={index} variant="body2">
						{getTarget(status.target)} is{" "}
						{AUXILIARY_EFFECTS_NAME_MAP_PASSED[status.effect as AuxiliaryEffect]}
					</Typography>
				);
			})}
			{activeEffects.map(
				(effect, index) =>
					({
						[AuxiliaryEffect.Stun]: (
							<Typography key={index} variant="body2">
								{self} is unable to move
							</Typography>
						),
						[AuxiliaryEffect.Poison]: (
							<Typography key={index} variant="body2">
								{self} is hurt by the poison
							</Typography>
						),
						[AuxiliaryEffect.Bleed]: null,
						[AuxiliaryEffect.Disarm]: null,
					})[effect.effect as AuxiliaryEffect],
			)}
		</Fragment>
	);
};

interface IProps {
	turns: IAction[][];
}

export const CombatLog: React.FC<IProps> = ({ turns }) => {
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.game.battle);

	if (!character || !battle) {
		return null;
	}

	const reversedTurns = [...turns].reverse();

	return (
		<Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h6">Combat Log</Typography>
			<Paper
				variant="outlined"
				sx={{
					flex: 1,
					p: 2,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box sx={{ flex: 1, display: "flex", flexDirection: "column-reverse", overflowY: "scroll" }}>
					{reversedTurns.map((turn, index) => (
						<div key={index}>
							<Typography variant="body2">Turn {reversedTurns.length - index}</Typography>
							{turn.map((action, index2) => (
								<Action key={`action-${index}-${index2}`} {...action} />
							))}
						</div>
					))}
				</Box>
			</Paper>
		</Box>
	);
};
