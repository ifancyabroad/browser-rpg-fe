import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	Link,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeCharacterClassModal, openEquipmentModal, openSkillModal } from "./modalsSlice";
import { IArmour, ISkill, IWeapon } from "common/types";
import { STATS, STATS_ABBR_MAP, mapToArray } from "common/utils";
import { Fragment } from "react";

export const CharacterClassModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, characterClass } = useAppSelector((state) => state.modals.characterClassModal);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
		<Dialog open={open} onClose={handleClose} maxWidth="sm">
			{isMobile && <DialogTitle>{name}</DialogTitle>}
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={5} textAlign="center">
						<Box
							component="img"
							src={portrait || "https://via.placeholder.com/1024"}
							alt={name}
							maxWidth="100%"
						/>
					</Grid>
					<Grid item xs={12} md={7}>
						{!isMobile && (
							<Typography variant="h5" color="text.secondary" mb={2}>
								{name}
							</Typography>
						)}
						<Typography color="info.main">Description</Typography>
						<DialogContentText mb={2}>{description}</DialogContentText>
						<Stack spacing={2}>
							<Stack direction="row" spacing={1} flexWrap="wrap">
								{STATS.map((stat) => (
									<Fragment key={stat}>
										<Box sx={{ textAlign: "center", flex: 1 }}>
											<Typography variant="body2">{STATS_ABBR_MAP[stat]}</Typography>
											<Typography color="text.secondary" fontSize={20}>
												{stats[stat]}
											</Typography>
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
								<Typography color="info.main">Starting Skills</Typography>
								<Stack direction="row" spacing={2} flexWrap="wrap">
									{skills.map((skill) => (
										<Link component="button" key={skill.id} onClick={() => handleViewSkill(skill)}>
											{skill.name}
										</Link>
									))}
								</Stack>
							</Box>
							<Box>
								<Typography color="info.main">Starting Equipment</Typography>
								<Stack direction="row" spacing={2} flexWrap="wrap">
									{mapToArray(equipment ?? {}).map((equipment) => (
										<Link
											component="button"
											key={equipment.id}
											onClick={() => handleViewEquipment(equipment)}
										>
											{equipment.name}
										</Link>
									))}
								</Stack>
							</Box>
						</Stack>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleClose}>
					Close
				</Link>
			</DialogActions>
		</Dialog>
	);
};
