import { Box, Stack, Typography, styled } from "@mui/material";
import { IActiveEffect, IStatus } from "common/types";
import { AuxiliaryEffect, StatusEffect } from "common/components";

const BarWrapper = styled(Box)({
	position: "relative",
	width: "256px",
	height: "24px",
});

const Bar = styled(Box)(({ theme }) => ({
	position: "relative",
	height: "100%",
	backgroundColor: theme.palette.success.main,
	transition: "width 0.5s ease-in-out",
}));

const EffectsWrapper = styled(Stack)({
	flexDirection: "row",
	gap: "4px",
	position: "absolute",
	left: 0,
	top: "100%",
	zIndex: 2,
});

interface IProps {
	value: number;
	max: number;
	auxiliaryEffects: IActiveEffect[];
	statusEffects: IStatus[];
}

export const HealthBar: React.FC<IProps> = ({ value, max, auxiliaryEffects, statusEffects }) => {
	const normalisedValue = value < 0 ? 0 : value > max ? 100 : ((value - 0) * 100) / (max - 0);

	return (
		<Stack spacing={1}>
			<Box display="flex" gap={2} alignItems="center">
				<BarWrapper>
					<Bar sx={{ width: `${normalisedValue}%` }} />
				</BarWrapper>

				<Typography variant="body2" fontSize={12}>
					<Box component="span" color="secondary.main">
						Health
					</Box>{" "}
					{value}/{max}
				</Typography>
			</Box>

			<EffectsWrapper direction="row" spacing={1}>
				{auxiliaryEffects.map((effect) => (
					<AuxiliaryEffect key={effect.effect} {...effect} />
				))}
				{statusEffects.map((effect) => (
					<StatusEffect key={effect.skill.id} {...effect} />
				))}
			</EffectsWrapper>
		</Stack>
	);
};
