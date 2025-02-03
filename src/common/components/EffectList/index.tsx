import { Box, Stack, Tooltip, Typography } from "@mui/material";
import {
	IAuxiliaryEffect,
	IDamageEffect,
	IHealEffect,
	ISkillEffect,
	IStatusEffect,
	IWeaponDamageEffect,
} from "common/types";
import {
	AUXILIARY_EFFECTS_NAME_MAP_PASSED,
	EffectType,
	RESISTANCES_NAME_MAP,
	STATS_ABBR_MAP,
	STATS_NAME_MAP,
	Target,
	getPropertyText,
} from "common/utils";
import { Fragment } from "react";

const TARGET_NAME_MAP: Record<Target, string> = {
	[Target.Ally]: "Ally",
	[Target.Enemy]: "Enemy",
	[Target.Self]: "User",
};

const DamageEffect: React.FC<IDamageEffect> = ({ damageType, min, max, target, modifier }) => (
	<Typography>
		{TARGET_NAME_MAP[target as Target]} takes {min}-{max} {RESISTANCES_NAME_MAP[damageType]} damage{" "}
		{modifier && (
			<Tooltip title={`Your ${STATS_NAME_MAP[modifier]} modifier is added to this attack`} placement="top">
				<Box component="span" color="text.secondary">
					(+ {STATS_ABBR_MAP[modifier]})
				</Box>
			</Tooltip>
		)}
	</Typography>
);

const WeaponDamageEffect: React.FC<IWeaponDamageEffect> = ({ multiplier, target }) => (
	<Typography>
		{TARGET_NAME_MAP[target as Target]} takes {multiplier}x weapon damage
	</Typography>
);

const HealEffect: React.FC<IHealEffect> = ({ min, max, target }) => (
	<Typography>
		Heals {TARGET_NAME_MAP[target as Target]} for {min}-{max} hit points
	</Typography>
);

const StatusEffect: React.FC<IStatusEffect> = ({ duration, difficulty, modifier, properties, target }) => {
	if (!properties) {
		return null;
	}

	const propertyList = properties.map(getPropertyText).join(", ");

	if (difficulty && modifier) {
		return (
			<Typography>
				{TARGET_NAME_MAP[target as Target]} must make a difficulty {difficulty} {STATS_NAME_MAP[modifier]}{" "}
				saving throw or receive {propertyList} for {duration} turns
			</Typography>
		);
	}

	return (
		<Typography>
			{TARGET_NAME_MAP[target as Target]} receives {propertyList} for {duration} turns
		</Typography>
	);
};

const AuxiliaryEffect: React.FC<IAuxiliaryEffect> = ({ duration, difficulty, modifier, effect, target }) => {
	if (difficulty && modifier) {
		return (
			<Typography>
				{TARGET_NAME_MAP[target as Target]} must make a difficulty {difficulty} {STATS_NAME_MAP[modifier]}{" "}
				saving throw or become {AUXILIARY_EFFECTS_NAME_MAP_PASSED[effect]} for {duration} turns
			</Typography>
		);
	}

	return (
		<Typography>
			{TARGET_NAME_MAP[target as Target]} becomes {AUXILIARY_EFFECTS_NAME_MAP_PASSED[effect]}
		</Typography>
	);
};

interface IProps {
	effects: ISkillEffect[];
}

export const EffectList: React.FC<IProps> = ({ effects }) => {
	return (
		<Stack spacing={1}>
			{effects.map((effect, index) => (
				<Fragment key={index}>
					{
						{
							[EffectType.Damage]: <DamageEffect {...(effect as IDamageEffect)} />,
							[EffectType.WeaponDamage]: <WeaponDamageEffect {...(effect as IWeaponDamageEffect)} />,
							[EffectType.Heal]: <HealEffect {...(effect as IHealEffect)} />,
							[EffectType.Status]: <StatusEffect {...(effect as IStatusEffect)} />,
							[EffectType.Auxiliary]: <AuxiliaryEffect {...(effect as IAuxiliaryEffect)} />,
						}[effect.type]
					}
				</Fragment>
			))}
		</Stack>
	);
};
