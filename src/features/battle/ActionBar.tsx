import { Box, ButtonBase, Stack, Tooltip, Typography, styled } from "@mui/material";
import actionBarFrame from "assets/images/ui/ActionBarFrame.png";
import { EffectList, ImageBorder, SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { ISkill } from "common/types";
import React from "react";
import { postAction } from "./battleSlice";
import { openErrorModal } from "features/modals";

const Wrapper = styled(Box)(({ theme }) => ({
	position: "sticky",
	bottom: 0,
	backgroundImage: `url(${actionBarFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "343px",
	height: "79px",
	padding: theme.spacing(1),
	margin: "auto",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const EmptySlot = styled(Box)({
	boxShadow: "inset 0 0 14px #000000",
	backgroundImage: "radial-gradient(circle at center, #37352d 0%, #252523 100%)",
	width: "64px",
});

const SkillTooltip: React.FC<ISkill> = ({ name, effects, remaining, maxUses }) => {
	const secondaryText = maxUses ? `${remaining}/${maxUses} Remaining` : undefined;

	return (
		<ImageBorder>
			<Stack spacing={1} p={2}>
				<Typography variant="h6" fontSize={16}>
					{name}
				</Typography>
				{secondaryText && (
					<Typography variant="body2" color="text.secondary">
						{secondaryText}
					</Typography>
				)}
				<EffectList effects={effects} />
			</Stack>
		</ImageBorder>
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
		<Tooltip title={<SkillTooltip {...skill} />} placement="top" componentsProps={{ tooltip: { sx: { p: 0 } } }}>
			<ButtonBase onClick={handleUseSkill} disabled={isDisabled}>
				<SkillIcon skill={skill} width={64} />
			</ButtonBase>
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
			<Stack flex={1} direction="row" justifyContent="space-between">
				{character.skills.map((skill) => (
					<SkillButton key={skill.id} {...skill} />
				))}

				{emptySlots.map((_, index) => (
					<EmptySlot key={index} />
				))}
			</Stack>
		</Wrapper>
	);
};
