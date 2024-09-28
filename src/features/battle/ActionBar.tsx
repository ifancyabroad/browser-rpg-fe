import { Box, ButtonBase, Stack, Tooltip, Typography, styled } from "@mui/material";
import { EffectList, SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { ISkill } from "common/types";
import React from "react";
import { postAction } from "./battleSlice";
import { openErrorModal } from "features/modals";
import { MAX_SKILLS } from "common/utils";

const EmptySlot = styled(Box)(({ theme }) => ({
	border: `2px dashed ${theme.palette.grey[800]}`,
	width: "64px",
	height: "64px",
}));

const StyledButton = styled(ButtonBase)({
	"&:disabled": {
		opacity: 0.5,
	},
	"&.exhausted": {
		filter: "grayscale(1)",
	},
});

const SkillTooltip: React.FC<ISkill> = ({ name, effects, remaining, maxUses }) => {
	const secondaryText = maxUses ? `${remaining}/${maxUses} Remaining` : undefined;
	const secondaryTextColor = remaining ? "success.main" : "error.main";

	return (
		<Stack spacing={1}>
			<Typography variant="h6" fontSize={16}>
				{name}
			</Typography>
			{secondaryText && <Typography color={secondaryTextColor}>{secondaryText}</Typography>}
			<EffectList effects={effects} />
		</Stack>
	);
};

const SkillButton: React.FC<ISkill> = (skill) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";
	const isExhausted = Boolean(skill.maxUses && skill.remaining <= 0);
	const isDisabled = isLoading || isExhausted;
	const className = isExhausted ? "exhausted" : "";

	const handleUseSkill = async () => {
		try {
			await dispatch(postAction({ id: skill.id })).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Tooltip title={<SkillTooltip {...skill} />} placement="top">
			<div>
				<StyledButton className={className} onClick={handleUseSkill} disabled={isDisabled}>
					<SkillIcon skill={skill} width={64} />
				</StyledButton>
			</div>
		</Tooltip>
	);
};

export const ActionBar: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);

	if (!character) {
		return null;
	}

	const emptySlots = Array.from({ length: MAX_SKILLS - character.skills.length }).fill(null);

	return (
		<Box display="flex" justifyContent="center" gap="2px" flexWrap="wrap" mt={2}>
			{character.skills.map((skill) => (
				<SkillButton key={skill.id} {...skill} />
			))}

			{emptySlots.map((_, index) => (
				<EmptySlot key={index} />
			))}
		</Box>
	);
};
