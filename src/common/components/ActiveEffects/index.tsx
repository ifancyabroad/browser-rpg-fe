import { Box } from "@mui/material";
import { IActiveEffect, IStatus } from "common/types";
import { AuxiliaryEffect, StatusEffect } from "common/components";

interface IProps {
	auxiliaryEffects: IActiveEffect[];
	statusEffects: IStatus[];
}

export const ActiveEffects: React.FC<IProps> = ({ auxiliaryEffects, statusEffects }) => {
	return (
		<Box display="flex" gap="1px" minHeight={40}>
			{auxiliaryEffects.map((effect) => (
				<AuxiliaryEffect key={effect.effect} {...effect} />
			))}
			{statusEffects.map((effect) => (
				<StatusEffect key={effect.source.id} {...effect} />
			))}
		</Box>
	);
};
