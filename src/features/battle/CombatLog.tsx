import { Box, Divider, Paper, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { IAction } from "common/types";
import {
	AUXILIARY_EFFECTS_NAME_MAP,
	AUXILIARY_EFFECTS_NAME_MAP_PASSED,
	AuxiliaryEffect,
	DamageType,
	HitType,
	PROPERTY_CONFIG,
	PropertyType,
	Target,
	getDamageTypeConfig,
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
	const theme = useTheme();

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
				.map((damage, index) => {
					const config = getDamageTypeConfig(damage.type as DamageType);
					const hitTypeColour = {
						[HitType.Crit]: theme.palette.warning.light,
						[HitType.Hit]: theme.palette.success.light,
						[HitType.Miss]: theme.palette.text.primary,
					}[damage.hitType];

					return (
						<Typography key={index} variant="body2">
							{getTarget(damage.target)} takes {damage.value} damage{" "}
							<Box component="span" color={config?.colour} fontStyle="italic">
								({damage.type})
							</Box>{" "}
							<Box component="span" color={hitTypeColour} fontStyle="italic">
								({damage.hitType})
							</Box>
						</Typography>
					);
				})}
			{damage.map((damage, index) => {
				const config = getDamageTypeConfig(damage.type as DamageType);

				return (
					<Typography key={index} variant="body2">
						{getTarget(damage.target)} takes {damage.value} damage{" "}
						<Box component="span" color={config?.colour} fontStyle="italic">
							({damage.type})
						</Box>
					</Typography>
				);
			})}
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
					const color = prop.value >= 0 ? theme.palette.success.light : theme.palette.error.light;

					if (status.saved) {
						return (
							<Typography key={`${status.skill.id}-${index}`} variant="body2">
								{getTarget(status.target)} saves against {skill}{" "}
								<Box component="span" color="text.secondary" fontStyle="italic">
									({status.modifier})
								</Box>
							</Typography>
						);
					}

					return (
						<Typography key={`${status.skill.id}-${index}`} variant="body2">
							{getTarget(status.target)} receives{" "}
							<Box component="span" color={color}>
								{prefix}
								{prop.value}
								{suffix}
							</Box>{" "}
							to {config?.name}
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
	const battle = useAppSelector((state) => state.battle.battle);

	if (!character || !battle) {
		return null;
	}

	const reversedTurns = [...turns].reverse();

	return (
		<Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h6">Combat Log</Typography>
			<Paper
				variant="outlined"
				sx={{
					flex: 1,
					p: 2,
				}}
			>
				<Box position="relative" height={{ xs: 200, lg: "100%" }}>
					<Box
						sx={{
							position: "absolute",
							bottom: 0,
							left: 0,
							height: "100%",
							width: "100%",
							display: "flex",
							flexDirection: "column-reverse",
							overflowY: "scroll",
						}}
					>
						{reversedTurns.map((turn, index) => (
							<Box
								key={index}
								sx={{
									transition: "opacity 0.1s ease-in-out",
									opacity: 0.25,
									"&:nth-of-type(1)": { opacity: 1 },
									"&:nth-of-type(2)": { opacity: 0.5 },
									"&:hover": { opacity: 1 },
								}}
							>
								<Typography variant="body2">Turn {reversedTurns.length - index}</Typography>
								<Divider />
								{turn.map((action, index2) => (
									<Action key={`action-${index}-${index2}`} {...action} />
								))}
							</Box>
						))}
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};
