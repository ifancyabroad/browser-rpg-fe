import { Box, Stack, Tooltip } from "@mui/material";
import { IActiveEffect, IStatus } from "common/types";
import { Typography } from "@mui/material";
import {
	AUXILIARY_EFFECTS_DESCRIPTION_MAP,
	AUXILIARY_EFFECTS_NAME_MAP,
	AuxiliaryEffect as AuxEffect,
} from "common/utils";
import { PropertyList } from "common/components";
import poisonIcon from "assets/images/icons/deadly_potion.png";
import bleedIcon from "assets/images/icons/Skill_Bleeding.png";
import stunIcon from "assets/images/icons/skill_3_stuned.png";
import disarmIcon from "assets/images/icons/Skill_Disarm.png";
import silenceIcon from "assets/images/icons/skill_79_silence.png";
import blindIcon from "assets/images/icons/skill_403_ill.png";
import frenzyIcon from "assets/images/icons/Skill_Frenzy.png";
import charmIcon from "assets/images/icons/Aura_KissLove.png";
import hasteIcon from "assets/images/icons/Skill_WindBlow.png";
import crippleIcon from "assets/images/icons/Skill_ShotLeg.png";
import blessIcon from "assets/images/icons/Skill_Blessing.png";
import curseIcon from "assets/images/icons/Warlock_25_runestone.png";

const StatusDetails: React.FC<IStatus> = (effect) => (
	<Stack>
		<Typography variant="h6" fontSize={16}>
			{effect.source.name}
		</Typography>
		{"properties" in effect && <PropertyList properties={effect.properties} />}
		<Typography variant="body2" fontStyle="italic" color="text.secondary">
			{effect.remaining} turns remaining
		</Typography>
	</Stack>
);

export const StatusEffect: React.FC<IStatus> = (status) => {
	const icon = status.source.icon || "https://via.placeholder.com/40";

	return (
		<Tooltip title={<StatusDetails {...status} />} placement="top">
			<Box component="img" src={icon} alt={status.source.name} sx={{ width: { xs: 24, sm: 40 } }} />
		</Tooltip>
	);
};

const AuxiliaryDetails: React.FC<IActiveEffect> = (effect) => (
	<Stack spacing={1}>
		<Typography variant="h6" fontSize={16}>
			{AUXILIARY_EFFECTS_NAME_MAP[effect.effect as AuxEffect]}
		</Typography>
		<Typography variant="body2">{AUXILIARY_EFFECTS_DESCRIPTION_MAP[effect.effect as AuxEffect]}</Typography>
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
	[AuxEffect.Silence]: silenceIcon,
	[AuxEffect.Blind]: blindIcon,
	[AuxEffect.Frenzy]: frenzyIcon,
	[AuxEffect.Charm]: charmIcon,
	[AuxEffect.Haste]: hasteIcon,
	[AuxEffect.Cripple]: crippleIcon,
	[AuxEffect.Bless]: blessIcon,
	[AuxEffect.Curse]: curseIcon,
};

export const AuxiliaryEffect: React.FC<IActiveEffect> = (effect) => {
	const icon = EFFECT_ICON_MAP[effect.effect as AuxEffect] || "https://via.placeholder.com/40";

	return (
		<Tooltip title={<AuxiliaryDetails {...effect} />} placement="top">
			<Box component="img" src={icon} alt={effect.effect.name} sx={{ width: { xs: 24, sm: 40 } }} />
		</Tooltip>
	);
};
