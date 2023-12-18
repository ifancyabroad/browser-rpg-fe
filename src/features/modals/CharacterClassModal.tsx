import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Divider,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeCharacterClassModal, openEquipmentModal, openSkillModal } from "./modalsSlice";
import { IArmour, ISkill, IWeapon } from "common/types";
import { STATS, STATS_ABBR_MAP, mapToArray } from "common/utils";
import { Fragment } from "react";

export const CharacterClassModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, characterClass } = useAppSelector((state) => state.modals.characterClassModal);

	const handleClose = () => {
		dispatch(closeCharacterClassModal());
	};

	const handleViewSkill = (skill: ISkill) => {
		dispatch(openSkillModal({ skill }));
	};

	const handleViewEquipment = (item: IWeapon | IArmour) => {
		dispatch(openEquipmentModal({ item }));
	};

	if (!characterClass) {
		return null;
	}

	const { name, description, skills, equipment, portrait, stats } = characterClass;

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" scroll="body">
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Box
							component="img"
							src={portrait || "https://via.placeholder.com/1024"}
							alt={name}
							maxWidth="100%"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography variant="h4" mb={1}>
							{name}
						</Typography>
						<DialogContentText mb={2}>{description}</DialogContentText>
						<Stack spacing={2}>
							<Stack direction="row" spacing={1} flexWrap="wrap">
								{STATS.map((stat) => (
									<Fragment key={stat}>
										<Box sx={{ textAlign: "center", flex: 1 }}>
											<Typography variant="body2">{STATS_ABBR_MAP[stat]}</Typography>
											<Typography fontSize={20}>{stats[stat]}</Typography>
										</Box>

										<Divider
											sx={{
												"&:last-of-type": {
													display: "none",
												},
											}}
											orientation="vertical"
											flexItem
										/>
									</Fragment>
								))}
							</Stack>
							<Box>
								<DialogContentText variant="h6" color="text.primary">
									Starting Skills
								</DialogContentText>
								<Stack direction="row" spacing={1} flexWrap="wrap">
									{skills.map((skill) => (
										<Chip
											key={skill.id}
											size="small"
											label={skill.name}
											onClick={() => handleViewSkill(skill)}
										/>
									))}
								</Stack>
							</Box>
							<Box>
								<DialogContentText variant="h6" color="text.primary">
									Starting Equipment
								</DialogContentText>
								<Stack direction="row" spacing={1} flexWrap="wrap">
									{mapToArray(equipment ?? {}).map((equipment) => (
										<Chip
											key={equipment.id}
											size="small"
											label={equipment.name}
											onClick={() => handleViewEquipment(equipment)}
										/>
									))}
								</Stack>
							</Box>
						</Stack>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" variant="contained">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
