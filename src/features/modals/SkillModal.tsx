import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeSkillModal } from "./modalsSlice";
import { CLASS_NAME_MAP, SKILL_TYPE_NAME_MAP, SkillClass, getSkillType } from "common/utils";
import { EffectList } from "common/components";

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
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" scroll="body">
			<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<Box component="img" src={icon || "https://via.placeholder.com/1024"} alt={name} width="48px" />
				{name}
			</DialogTitle>
			<DialogContent>
				<Stack spacing={1} mb={3}>
					<Box display="flex" gap={1}>
						<Typography color="secondary.main">Level:</Typography>
						<DialogContentText>{level}</DialogContentText>
					</Box>
					<Box display="flex" gap={1}>
						<Typography color="secondary.main">Class:</Typography>
						<DialogContentText>{CLASS_NAME_MAP[characterClass as SkillClass]}</DialogContentText>
					</Box>
					<Box display="flex" gap={1}>
						<Typography color="secondary.main">Type:</Typography>
						<DialogContentText>{SKILL_TYPE_NAME_MAP[type]}</DialogContentText>
					</Box>
					<Box display="flex" gap={1}>
						<Typography color="secondary.main">Max Uses:</Typography>
						<DialogContentText>{maxUses}</DialogContentText>
					</Box>
				</Stack>
				<Stack spacing={2}>
					<Box>
						<Typography color="info.main">Description</Typography>
						<DialogContentText>{description}</DialogContentText>
					</Box>
					{effects && effects.length && (
						<Box>
							<Typography color="info.main">Effects</Typography>
							<EffectList effects={effects} />
						</Box>
					)}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};
