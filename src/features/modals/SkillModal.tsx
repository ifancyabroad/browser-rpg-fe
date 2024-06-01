import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeSkillModal } from "./modalsSlice";
import { CLASS_NAME_MAP, SKILL_TYPE_NAME_MAP, SkillClass, getSkillType } from "common/utils";
import { EffectList, SkillIcon } from "common/components";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

export const SkillModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, skill } = useAppSelector((state) => state.modals.skillModal);

	const handleClose = () => {
		dispatch(closeSkillModal());
	};

	if (!skill) {
		return null;
	}

	const { name, description, level, effects, class: characterClass, maxUses } = skill;
	const type = getSkillType(skill);

	return (
		<Dialog open={open} onClose={handleClose} scroll="body">
			<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<SkillIcon skill={skill} width={48} />
				{name}
			</DialogTitle>
			<DialogContent>
				<Stack spacing={1} mb={2}>
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
						<DialogContentText>
							{maxUses > 0 ? maxUses : <AllInclusiveIcon fontSize="small" />}
						</DialogContentText>
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
				<Link component="button" onClick={handleClose}>
					Close
				</Link>
			</DialogActions>
		</Dialog>
	);
};
