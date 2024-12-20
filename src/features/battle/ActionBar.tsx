import { Box, ButtonBase, Link, Stack, Tooltip, Typography, alpha, styled } from "@mui/material";
import { EffectList, SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { ICharacter, ISkill } from "common/types";
import React from "react";
import { postAction } from "./battleSlice";
import { openErrorModal, openGameOverModal, openRewardsModal } from "features/modals";
import { BattleResult, MAX_POTIONS, MAX_SKILLS } from "common/utils";
import healthPotion from "assets/images/icons/Res_49_health.png";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

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
	const battle = useAppSelector((state) => state.battle.battle);
	const isBattleOver = Boolean(battle?.result);
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
		<Tooltip title={<SkillTooltip {...skill} />} placement="top" enterTouchDelay={700}>
			<div>
				<StyledButton
					className={className}
					onClick={handleUseSkill}
					disabled={isDisabled}
					sx={{ pointerEvents: isBattleOver ? "none" : undefined }}
				>
					<Box sx={{ position: "relative", height: 64, width: 64, img: { verticalAlign: "middle" } }}>
						<SkillIcon skill={skill} width={64} />
						{skill.maxUses > 0 ? (
							<Typography variant="caption" sx={{ position: "absolute", bottom: 0, right: 0 }}>
								{skill.remaining}/{skill.maxUses}
							</Typography>
						) : (
							<Typography variant="caption" sx={{ position: "absolute", bottom: 0, right: 0 }}>
								<AllInclusiveIcon fontSize="inherit" sx={{ verticalAlign: "middle" }} />
							</Typography>
						)}
					</Box>
				</StyledButton>
			</div>
		</Tooltip>
	);
};

const PotionTooltip: React.FC<ICharacter> = ({ potions }) => {
	const secondaryTextColor = potions ? "success.main" : "error.main";

	return (
		<Stack spacing={1}>
			<Typography variant="h6" fontSize={16}>
				Potion
			</Typography>
			<Typography color={secondaryTextColor}>
				{potions}/{MAX_POTIONS} Remaining
			</Typography>
			<Typography>Heals 50% of your max health.</Typography>
		</Stack>
	);
};

const PotionButton: React.FC<ICharacter> = (character) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";
	const battle = useAppSelector((state) => state.battle.battle);
	const isBattleOver = Boolean(battle?.result);
	const isExhausted = character.potions <= 0;
	const isDisabled = isLoading || isExhausted;
	const className = isExhausted ? "exhausted" : "";

	const handleUseSkill = async () => {
		try {
			await dispatch(postAction({ id: "potion" })).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Tooltip title={<PotionTooltip {...character} />} placement="top" enterTouchDelay={700}>
			<div>
				<StyledButton
					className={className}
					onClick={handleUseSkill}
					disabled={isDisabled}
					sx={{ pointerEvents: isBattleOver ? "none" : undefined }}
				>
					<Box sx={{ position: "relative", height: 64, width: 64, img: { verticalAlign: "middle" } }}>
						<img src={healthPotion} alt="Health potion" width="64" />
						<Typography variant="caption" sx={{ position: "absolute", bottom: 0, right: 0 }}>
							{character.potions}/{MAX_POTIONS}
						</Typography>
					</Box>
				</StyledButton>
			</div>
		</Tooltip>
	);
};

export const ActionBar: React.FC = () => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	const battle = useAppSelector((state) => state.battle.battle);
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";
	const isBattleOver = Boolean(battle?.result);

	const handleContinue = () => {
		if (battle?.result === BattleResult.Won) {
			dispatch(openRewardsModal());
		} else if (battle?.result === BattleResult.Lost) {
			dispatch(openGameOverModal());
		}
	};

	if (!character) {
		return null;
	}

	const emptySlots = Array.from({ length: MAX_SKILLS - character.skills.length }).fill(null);

	return (
		<Box position="relative" display="flex" justifyContent="center" gap="2px" flexWrap="wrap">
			<PotionButton {...character} />

			{character.skills.map((skill) => (
				<SkillButton key={skill.id} {...skill} />
			))}

			{emptySlots.map((_, index) => (
				<EmptySlot key={index} />
			))}

			{isBattleOver && (
				<Box
					sx={(theme) => ({
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						bgcolor: alpha(theme.palette.background.paper, 0.8),
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					})}
				>
					<Link component="button" onClick={handleContinue} disabled={isLoading}>
						Continue
					</Link>
				</Box>
			)}
		</Box>
	);
};
