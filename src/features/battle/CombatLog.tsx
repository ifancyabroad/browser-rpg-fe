import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { IAction, IAuxiliary, IDamage, IHeal, IStatus } from "common/types";
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

interface IActionEffectProps {
	self: string;
	enemy: string;
	weaponDamage: IDamage[][];
	damage: IDamage[];
	heal: IHeal[];
	status: IStatus[];
	auxiliary: IAuxiliary[];
	source: string;
	isWeapon?: boolean;
}

const ActionEffects: React.FC<IActionEffectProps> = ({
	self,
	enemy,
	weaponDamage,
	damage,
	heal,
	status,
	auxiliary,
	source,
	isWeapon = false,
}) => {
	const theme = useTheme();

	const getTarget = (target: Target) => {
		return target === Target.Enemy ? enemy : self;
	};

	return (
		<Fragment>
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
						{isWeapon && (
							<Box component="span" color="text.secondary" fontStyle="italic">
								{" "}
								({source})
							</Box>
						)}
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
							<Typography key={`${status.source.id}-${index}`} variant="body2">
								{getTarget(status.target)} saves against {source}{" "}
								<Box component="span" color="text.secondary" fontStyle="italic">
									({status.modifier})
								</Box>
							</Typography>
						);
					}

					return (
						<Typography key={`${status.source.id}-${index}`} variant="body2">
							{getTarget(status.target)} receives{" "}
							<Box component="span" color={color}>
								{prefix}
								{prop.value}
								{suffix}
							</Box>{" "}
							to {config?.name}
							{isWeapon && (
								<Box component="span" color="text.secondary" fontStyle="italic">
									{" "}
									({source})
								</Box>
							)}
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
							{isWeapon && (
								<Box component="span" color="text.secondary" fontStyle="italic">
									{" "}
									({source})
								</Box>
							)}
						</Typography>
					);
				}

				return (
					<Typography key={index} variant="body2">
						{getTarget(status.target)} is{" "}
						{AUXILIARY_EFFECTS_NAME_MAP_PASSED[status.effect as AuxiliaryEffect]}
						{isWeapon && (
							<Box component="span" color="text.secondary" fontStyle="italic">
								{" "}
								({source})
							</Box>
						)}
					</Typography>
				);
			})}
		</Fragment>
	);
};

const Action: React.FC<IAction> = ({ self, enemy, skill, weapon, activeEffects }) => {
	return (
		<Fragment>
			<Typography variant="body2">
				{self} uses {skill.name}
			</Typography>

			<ActionEffects
				self={self}
				enemy={enemy}
				weaponDamage={skill.weaponDamage}
				damage={skill.damage}
				heal={skill.heal}
				status={skill.status}
				auxiliary={skill.auxiliary}
				source={skill.name}
			/>

			{weapon.map((weapon, index) => (
				<ActionEffects
					key={index}
					self={self}
					enemy={enemy}
					weaponDamage={[]}
					damage={weapon.damage}
					heal={[]}
					status={weapon.status}
					auxiliary={weapon.auxiliary}
					source={weapon.name}
					isWeapon
				/>
			))}

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

export const CombatLog: React.FC = () => {
	const battle = useAppSelector((state) => state.battle.battle);
	const isLoading = useAppSelector((state) => state.battle.status === "loading");

	if (!battle) {
		return null;
	}

	const reversedTurns = [...battle.turns].reverse();

	return (
		<Box
			sx={{
				border: 1,
				borderColor: "grey.600",
				flex: 1,
				p: 2,
			}}
		>
			<Box position="relative" height={{ xs: 400, sm: "100%" }}>
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
					{isLoading && <Typography variant="body2">Loading...</Typography>}

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
							<Typography variant="body2" color="info.main">
								Turn {reversedTurns.length - index}
							</Typography>
							<Divider />
							{turn.map((action, index2) => (
								<Action key={`action-${index}-${index2}`} {...action} />
							))}
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};
