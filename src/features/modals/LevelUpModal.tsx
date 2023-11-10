import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material";
import { SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { ISkill } from "common/types";
import { SKILL_TYPE_NAME_MAP, STATS, STATS_ABBR_MAP, Stat, getSkillType } from "common/utils";
import { levelUp } from "features/character";
import { Fragment, useEffect, useState } from "react";
import { closeLevelUpModal } from "./modalsSlice";

interface IProps {
	onSelect: (id: string) => void;
	isSelected: boolean;
	skill: ISkill;
}

const SkillCard: React.FC<IProps> = ({ onSelect, isSelected, skill }) => {
	const secondaryText = `Level ${skill.level} ${SKILL_TYPE_NAME_MAP[getSkillType(skill)]}`;

	const handleSelectSkill = () => {
		onSelect(skill.id);
	};

	return (
		<Card raised={isSelected}>
			<CardActionArea onClick={handleSelectSkill}>
				<CardHeader avatar={<SkillIcon skill={skill} />} title={skill.name} subheader={secondaryText} />
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{skill.description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export const LevelUpModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.levelUpModalOpen);
	const character = useAppSelector((state) => state.character.character);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const [stat, setStat] = useState<Stat | null>(null);
	const [skill, setSkill] = useState<string | null>(null);
	const [showSkills, setShowSkills] = useState(false);

	useEffect(() => {
		if (!open) {
			setStat(null);
			setSkill(null);
			setShowSkills(false);
		}
	}, [open]);

	const handleStatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStat((event.target as HTMLInputElement).value as Stat);
	};

	const handleSkillChange = (id: string) => {
		setSkill(id);
	};

	const handleNext = () => {
		setShowSkills(true);
	};

	const handleConfirm = async () => {
		if (!stat) {
			return;
		}
		const payload = skill ? { stat, skill } : { stat };
		await dispatch(levelUp(payload));
		dispatch(closeLevelUpModal());
	};

	if (!character || !character.levelUp) {
		return null;
	}

	const { level, skills } = character.levelUp;
	const skillRequired = character.levelUp.skills.length > 0;
	const showNextButton = skillRequired && !showSkills;
	const isDisabled = isLoading || !stat;

	return (
		<Dialog open={open} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">You have reached level {level}!</DialogTitle>
			<DialogContent>
				{showSkills ? (
					<Fragment>
						<DialogContentText mb={2}>Choose a new skill</DialogContentText>
						<Stack gap={2}>
							{skills.map((sk) => (
								<SkillCard
									key={sk.id}
									onSelect={handleSkillChange}
									isSelected={sk.id === skill}
									skill={sk}
								/>
							))}
						</Stack>
					</Fragment>
				) : (
					<FormControl>
						<FormLabel id="attribute-label">Choose an attribute to increase</FormLabel>
						<RadioGroup
							row
							aria-labelledby="attribute-label"
							name="attribute"
							value={stat}
							onChange={handleStatChange}
						>
							{STATS.map((stat) => (
								<FormControlLabel
									key={stat}
									value={stat}
									control={<Radio disabled={character.stats[stat] >= 25} />}
									label={`${STATS_ABBR_MAP[stat]} (${character.stats[stat]})`}
								/>
							))}
						</RadioGroup>
					</FormControl>
				)}
			</DialogContent>
			<DialogActions>
				{showNextButton ? (
					<Button variant="contained" onClick={handleNext} color="secondary" disabled={!stat}>
						Next
					</Button>
				) : (
					<Button variant="contained" onClick={handleConfirm} color="primary" disabled={isDisabled}>
						Confirm
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};
