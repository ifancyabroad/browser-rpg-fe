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
	Paper,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material";
import { SkillIcon, StatIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { ISkill } from "common/types";
import { SKILL_TYPE_NAME_MAP, STATS, STATS_NAME_MAP, Stat, getSkillType } from "common/utils";
import { levelUp } from "features/character";
import { Fragment, useEffect, useState } from "react";
import { closeLevelUpModal, openErrorModal } from "./modalsSlice";

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

interface IStatLabelProps {
	stat: Stat;
	currentValue: number;
	isSelected: boolean;
}

const StatLabel: React.FC<IStatLabelProps> = ({ stat, currentValue, isSelected }) => {
	const value = isSelected ? currentValue + 1 : currentValue;

	return (
		<Paper
			sx={{
				p: 1,
				textAlign: "center",
				width: 140,
				borderStyle: "solid",
				borderWidth: 3,
				borderColor: isSelected ? "primary.main" : "transparent",
				transition: "all 0.2s ease-in-out",
				"&:hover": {
					borderColor: "primary.main",
				},
			}}
		>
			<StatIcon stat={stat} />
			<Typography variant="h5" fontSize={16}>
				{STATS_NAME_MAP[stat]}
			</Typography>
			<Typography
				variant="body2"
				color={isSelected ? "success.light" : "text.secondary"}
				sx={{ transition: "color 0.2s ease-in-out" }}
			>
				({value})
			</Typography>
		</Paper>
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
		try {
			const payload = skill ? { stat, skill } : { stat };
			await dispatch(levelUp(payload)).unwrap();
			dispatch(closeLevelUpModal());
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	if (!character || !character.levelUpData) {
		return null;
	}

	const { level, skills } = character.levelUpData;
	const skillRequired = character.levelUpData.skills.length > 0;
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
						<FormLabel id="attribute-label" sx={{ mb: 2 }}>
							Choose an attribute to increase by 1:
						</FormLabel>
						<RadioGroup
							row
							aria-labelledby="attribute-label"
							name="attribute"
							value={stat}
							onChange={handleStatChange}
							sx={{ justifyContent: "center", gap: 1 }}
						>
							{STATS.map((st) => (
								<FormControlLabel
									key={st}
									value={st}
									sx={{ m: 0 }}
									control={<Radio sx={{ display: "none" }} />}
									label={
										<StatLabel
											stat={st}
											currentValue={character.stats[st]}
											isSelected={st === stat}
										/>
									}
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
