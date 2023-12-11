import { Tooltip } from "@mui/material";
import { IActiveEffect, IStatus } from "common/types";
import { Box, Typography } from "@mui/material";
import { AUXILIARY_EFFECTS_NAME_MAP, AuxiliaryEffect as AuxEffect } from "common/utils";
import { PropertyList, SkillIcon } from "common/components";

const StatusDetails: React.FC<IStatus> = (effect) => (
	<Box>
		<Typography sx={{ fontWeight: "medium" }}>{effect.skill.name}</Typography>
		{"properties" in effect && <PropertyList properties={effect.properties} />}
		<Typography variant="body2" fontStyle="italic">
			{effect.remaining} turns remaining
		</Typography>
	</Box>
);

export const StatusEffect: React.FC<IStatus> = (status) => {
	const icon = status.skill.icon || "https://via.placeholder.com/40";

	return (
		<Tooltip title={<StatusDetails {...status} />} placement="top" arrow>
			<img src={icon} alt={SkillIcon.name} />
		</Tooltip>
	);
};

const AuxiliaryDetails: React.FC<IActiveEffect> = (effect) => (
	<Box>
		<Typography sx={{ fontWeight: "medium" }}>{AUXILIARY_EFFECTS_NAME_MAP[effect.effect as AuxEffect]}</Typography>
		<Typography variant="body2" fontStyle="italic">
			{effect.remaining} turns remaining
		</Typography>
	</Box>
);

export const AuxiliaryEffect: React.FC<IActiveEffect> = (effect) => {
	const icon = "https://via.placeholder.com/40";

	return (
		<Tooltip title={<AuxiliaryDetails {...effect} />} placement="top" arrow>
			<img src={icon} alt={SkillIcon.name} />
		</Tooltip>
	);
};
