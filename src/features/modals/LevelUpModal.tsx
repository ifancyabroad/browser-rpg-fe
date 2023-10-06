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
import { useEffect, useState } from "react";
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
	const [stat, setStat] = useState<Stat>();
	const [skill, setSkill] = useState<string>();
	const [showSkills, setShowSkills] = useState(false);
	const skillRequired = (character?.levelUp?.skills.length ?? 0) > 0;
	const isDisabled = isLoading || !stat;

	useEffect(() => {
		if (!open) {
			setStat(undefined);
			setSkill(undefined);
			setShowSkills(false);
		}
	}, [open]);

	const handleStatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setStat((event.target as HTMLInputElement).value as Stat);
	};

	const handleSkillChange = (id: string) => {
		setSkill(id);
	};

	const handleClick = async () => {
		if (!stat) {
			return;
		}
		if (skillRequired && showSkills) {
			await dispatch(levelUp({ stat, skill }));
			dispatch(closeLevelUpModal());
			return;
		}
		if (skillRequired) {
			setShowSkills(true);
			return;
		}
		await dispatch(levelUp({ stat }));
		dispatch(closeLevelUpModal());
	};

	if (!character || !character.levelUp) {
		return null;
	}

	const { level, skills } = character.levelUp;

	return (
		<Dialog open={open} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Level Up</DialogTitle>
			<DialogContent>
				<DialogContentText mb={2}>You have reached level {level}!</DialogContentText>
				{showSkills ? (
					<Stack gap={2}>
						{skills.map((sk) => (
							<SkillCard onSelect={handleSkillChange} isSelected={sk.id === skill} skill={sk} />
						))}
					</Stack>
				) : (
					<FormControl>
						<FormLabel id="attribute-label">Attribute</FormLabel>
						<RadioGroup
							row
							aria-labelledby="attribute-label"
							name="attribute"
							value={stat}
							onChange={handleStatChange}
						>
							{STATS.map((stat) => (
								<FormControlLabel
									value={stat}
									control={<Radio disabled={character.stats[stat] >= 25} />}
									label={STATS_ABBR_MAP[stat]}
								/>
							))}
						</RadioGroup>
					</FormControl>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClick} color="primary" disabled={isDisabled}>
					Next
				</Button>
			</DialogActions>
		</Dialog>
	);
};
