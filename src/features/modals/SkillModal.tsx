import { Box, Dialog, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeSkillModal } from "./modalsSlice";
import { CLASS_NAME_MAP, SKILL_TYPE_NAME_MAP, SkillClass, getSkillType } from "common/utils";
import {
	EffectList,
	GameDialogActions,
	GameDialogButton,
	GameDialogCloseButton,
	GameDialogContent,
	GameDialogPaper,
	GameModalTitle,
	IconWrapper,
	ImageBorder,
	Parchment,
} from "common/components";
import skillIcon from "assets/images/ui/SkillIcon.png";
import { ReactComponent as CrossIcon } from "assets/images/ui/CrossIcon.svg";

export const SkillModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, skill } = useAppSelector((state) => state.modals.skillModal);

	const handleClose = () => {
		dispatch(closeSkillModal());
	};

	if (!skill) {
		return null;
	}

	const { name, description, icon, level, effects, class: characterClass, maxUses } = skill;
	const type = getSkillType(skill);

	return (
		<Dialog open={open} onClose={handleClose} PaperComponent={GameDialogPaper}>
			<GameModalTitle title="Skill" icon={skillIcon} />
			<GameDialogContent>
				<GameDialogCloseButton onClick={handleClose} />
				<Parchment>
					<Box display="flex" alignItems="center" gap={2} mb={2}>
						<ImageBorder>
							<Box
								component="img"
								src={icon || "https://via.placeholder.com/1024"}
								alt={name}
								width="48px"
							/>
						</ImageBorder>

						<Typography variant="h5">{name}</Typography>
					</Box>
					<Stack spacing={1} mb={3}>
						<Box display="flex" gap={1}>
							<Typography variant="body2" fontWeight="bold">
								Level:
							</Typography>
							<Typography variant="body2">{level}</Typography>
						</Box>
						<Box display="flex" gap={1}>
							<Typography variant="body2" fontWeight="bold">
								Class:
							</Typography>
							<Typography variant="body2">{CLASS_NAME_MAP[characterClass as SkillClass]}</Typography>
						</Box>
						<Box display="flex" gap={1}>
							<Typography variant="body2" fontWeight="bold">
								Type:
							</Typography>
							<Typography variant="body2">{SKILL_TYPE_NAME_MAP[type]}</Typography>
						</Box>
						<Box display="flex" gap={1}>
							<Typography variant="body2" fontWeight="bold">
								Max Uses:
							</Typography>
							<Typography variant="body2">{maxUses}</Typography>
						</Box>
					</Stack>
					<Stack spacing={2}>
						<Box>
							<Typography variant="h6">Description</Typography>
							<Typography variant="body2">{description}</Typography>
						</Box>
						{effects && effects.length && (
							<Box>
								<Typography variant="h6">Effects</Typography>
								<EffectList effects={effects} />
							</Box>
						)}
					</Stack>
				</Parchment>
			</GameDialogContent>
			<GameDialogActions>
				<GameDialogButton onClick={handleClose}>
					Close
					<IconWrapper>
						<CrossIcon width={20} height={20} />
					</IconWrapper>
				</GameDialogButton>
			</GameDialogActions>
		</Dialog>
	);
};
