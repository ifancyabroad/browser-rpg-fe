import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeCharacterClassModal } from "./modalsSlice";
import { STATS, STATS_NAME_MAP, getPrimaryStats, mapToArray } from "common/utils";
import { EquipmentItem, SkillItem } from "./CharacterModal";
import { IArmour, IWeapon } from "common/types";

interface IStatItemProps {
	name: string;
	value: number;
}

const StatItem: React.FC<IStatItemProps> = ({ name, value }) => (
	<Box display="flex" justifyContent="space-between">
		<Typography color="secondary.main">{name}</Typography>
		<Typography>{value}</Typography>
	</Box>
);

export const CharacterClassModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, characterClass } = useAppSelector((state) => state.modals.characterClassModal);

	const handleClose = () => {
		dispatch(closeCharacterClassModal());
	};

	if (!characterClass) {
		return null;
	}

	const { name, description, skills, equipment, portrait, stats } = characterClass;
	let equipmentAsArray: (IWeapon | IArmour)[] = [];
	if (equipment) {
		equipmentAsArray = mapToArray(equipment);
	}

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm">
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={4} textAlign="center">
						<Box
							sx={{
								position: "relative",
								height: "100%",
								minHeight: "400px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
							}}
						>
							<Box
								sx={{
									position: "absolute",
									height: "100%",
									width: "100%",
									backgroundImage: `url(${portrait})`,
									backgroundSize: "cover",
									backgroundPosition: "top center",
									opacity: 0.3,
								}}
							/>
							<Box sx={{ position: "relative", zIndex: 1 }}>
								<Typography variant="h6" color="primary.main">
									{name}
								</Typography>
								<Typography color="text.secondary">Primary Stats</Typography>
								<Stack>
									{getPrimaryStats(stats).map((stat) => (
										<Typography>{STATS_NAME_MAP[stat]}</Typography>
									))}
								</Stack>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Stack spacing={1}>
							<Typography color="text.secondary">Description</Typography>
							<DialogContentText>{description}</DialogContentText>
							<Typography color="text.secondary">Attributes</Typography>
							<Stack spacing={1}>
								{STATS.map((stat) => (
									<StatItem key={stat} name={STATS_NAME_MAP[stat]} value={stats[stat]} />
								))}
							</Stack>
						</Stack>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Stack>
							<Typography color="text.secondary" mb={1}>
								Starting Skill
							</Typography>
							{skills.map((skill) => (
								<SkillItem key={skill.id} skill={skill} />
							))}
						</Stack>
						<Stack>
							<Typography color="text.secondary" mb={1}>
								Starting Equipment
							</Typography>
							{equipmentAsArray.map((equipment, index) => (
								<EquipmentItem key={index} equipment={equipment} />
							))}
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
