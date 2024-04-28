import { Box, ButtonBase, Stack, Tooltip, Typography, styled } from "@mui/material";
import { EffectList, SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { ISkill } from "common/types";
import React from "react";
import { postAction } from "./battleSlice";
import { openErrorModal } from "features/modals";

const Wrapper = styled(Box)(({ theme }) => ({
	flex: 1,
	position: "sticky",
	bottom: theme.spacing(2),
	margin: "auto",
	marginTop: theme.spacing(4),
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center",
}));

const EmptySlot = styled(Box)(({ theme }) => ({
	border: `2px dashed ${theme.palette.grey[800]}`,
	width: "64px",
}));

const SkillTooltip: React.FC<ISkill> = ({ name, effects, remaining, maxUses }) => {
	const secondaryText = maxUses ? `${remaining}/${maxUses} Remaining` : undefined;

	return (
		<Stack spacing={1}>
			<Typography variant="h6" fontSize={16}>
				{name}
			</Typography>
			{secondaryText && <Typography variant="body2">{secondaryText}</Typography>}
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
				<ButtonBase onClick={handleUseSkill} disabled={isDisabled}>
					<SkillIcon skill={skill} width={64} />
				</ButtonBase>
			</div>
		</Tooltip>
	);
};

export const ActionBar: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);

	if (!character) {
		return null;
	}

	const emptySlots = Array.from({ length: 5 - character.skills.length }).fill(null);

	return (
		<Wrapper>
			<Box display="flex" justifyContent="space-between" gap="2px">
				{character.skills.map((skill) => (
					<SkillButton key={skill.id} {...skill} />
				))}

				{emptySlots.map((_, index) => (
					<EmptySlot key={index} />
				))}
			</Box>
		</Wrapper>
	);
};
