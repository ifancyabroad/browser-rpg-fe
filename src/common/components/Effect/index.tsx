import { Stack, Tooltip } from "@mui/material";
import { IActiveEffect, IStatus } from "common/types";
import { Typography } from "@mui/material";
import { AUXILIARY_EFFECTS_NAME_MAP, AuxiliaryEffect as AuxEffect } from "common/utils";
import { PropertyList } from "common/components";
import poisonIcon from "assets/images/icons/Archerskill_38_poison.png";
import bleedIcon from "assets/images/icons/Skill_Bleeding.png";
import stunIcon from "assets/images/icons/skill_3_stuned.png";
import disarmIcon from "assets/images/icons/Skill_Disarm.png";

const StatusDetails: React.FC<IStatus> = (effect) => (
	<Stack>
		<Typography variant="h6" fontSize={16}>
			{effect.skill.name}
		</Typography>
		{"properties" in effect && <PropertyList properties={effect.properties} />}
		<Typography variant="body2" fontStyle="italic" color="text.secondary">
			{effect.remaining} turns remaining
		</Typography>
	</Stack>
);

export const StatusEffect: React.FC<IStatus> = (status) => {
	const icon = status.skill.icon || "https://via.placeholder.com/40";

	return (
		<Tooltip title={<StatusDetails {...status} />} placement="top">
			<img src={icon} alt={status.skill.name} width="40" />
		</Tooltip>
	);
};

const AuxiliaryDetails: React.FC<IActiveEffect> = (effect) => (
	<Stack spacing={1}>
		<Typography variant="h6" fontSize={16}>
			{AUXILIARY_EFFECTS_NAME_MAP[effect.effect as AuxEffect]}
		</Typography>
		<Typography variant="body2" fontStyle="italic" color="text.secondary">
			{effect.remaining} turns remaining
		</Typography>
	</Stack>
);

const EFFECT_ICON_MAP: Record<AuxEffect, string> = {
	[AuxEffect.Bleed]: bleedIcon,
	[AuxEffect.Poison]: poisonIcon,
	[AuxEffect.Stun]: stunIcon,
	[AuxEffect.Disarm]: disarmIcon,
};

export const AuxiliaryEffect: React.FC<IActiveEffect> = (effect) => {
	const icon = EFFECT_ICON_MAP[effect.effect as AuxEffect] || "https://via.placeholder.com/40";

	return (
		<Tooltip title={<AuxiliaryDetails {...effect} />} placement="top">
			<img src={icon} alt={effect.effect.name} width="40" />
		</Tooltip>
	);
};
