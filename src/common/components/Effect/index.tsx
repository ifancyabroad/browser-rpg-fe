import { Stack, Tooltip } from "@mui/material";
import { IActiveEffect, IStatus } from "common/types";
import { Typography } from "@mui/material";
import { AUXILIARY_EFFECTS_NAME_MAP, AuxiliaryEffect as AuxEffect } from "common/utils";
import { PropertyList } from "common/components";

const StatusDetails: React.FC<IStatus> = (effect) => (
	<Stack spacing={1}>
		<Typography sx={{ fontWeight: "medium" }}>{effect.skill.name}</Typography>
		{"properties" in effect && <PropertyList properties={effect.properties} />}
		<Typography variant="body2" fontStyle="italic">
			{effect.remaining} turns remaining
		</Typography>
	</Stack>
);

export const StatusEffect: React.FC<IStatus> = (status) => {
	const icon = status.skill.icon || "https://via.placeholder.com/24";

	return (
		<Tooltip title={<StatusDetails {...status} />} placement="top">
			<img src={icon} alt={status.skill.name} width="24" />
		</Tooltip>
	);
};

const AuxiliaryDetails: React.FC<IActiveEffect> = (effect) => (
	<Stack spacing={1}>
		<Typography sx={{ fontWeight: "medium" }}>{AUXILIARY_EFFECTS_NAME_MAP[effect.effect as AuxEffect]}</Typography>
		<Typography variant="body2" fontStyle="italic">
			{effect.remaining} turns remaining
		</Typography>
	</Stack>
);

export const AuxiliaryEffect: React.FC<IActiveEffect> = (effect) => {
	const icon = "https://via.placeholder.com/24";

	return (
		<Tooltip title={<AuxiliaryDetails {...effect} />} placement="top">
			<img src={icon} alt={effect.effect.name} width="24" />
		</Tooltip>
	);
};
