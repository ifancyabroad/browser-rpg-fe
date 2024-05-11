import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	Link,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material";
import { HoverButton, SkillIcon, StatIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { ISkill } from "common/types";
import { SKILL_TYPE_NAME_MAP, STATS, STATS_NAME_MAP, Stat, getSkillType } from "common/utils";
import { levelUp } from "features/character";
import { useEffect, useState } from "react";
import { closeLevelUpModal, openErrorModal, openSkillModal } from "./modalsSlice";

interface ISkillLabelProps {
	skill: ISkill;
	isSelected: boolean;
}

const SkillLabel: React.FC<ISkillLabelProps> = ({ isSelected, skill }) => {
	const dispatch = useAppDispatch();
	const secondaryText = `Level ${skill.level} ${SKILL_TYPE_NAME_MAP[getSkillType(skill)]}`;

	const handleViewSkill = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		dispatch(openSkillModal({ skill }));
	};

	return (
		<HoverButton
			component={Box}
			isActive={isSelected}
			sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3, p: 1 }}
		>
			<Box display="flex" alignItems="center" gap={2}>
				<SkillIcon skill={skill} />
				<Stack>
					<Typography color="text.secondary">{skill.name}</Typography>
					<Typography variant="body2">{secondaryText}</Typography>
				</Stack>
			</Box>
			<Link component="button" onClick={handleViewSkill}>
				View Details
			</Link>
		</HoverButton>
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
		<HoverButton
			component={Box}
			isActive={isSelected}
			sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3, p: 1 }}
		>
			<Box display="flex" alignItems="center" gap={2}>
				<StatIcon stat={stat} width={24} />
				<Typography>{STATS_NAME_MAP[stat]} +1</Typography>
			</Box>
			<Typography variant="body2" color={isSelected ? "success.light" : "text.secondary"}>
				({value})
			</Typography>
		</HoverButton>
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

	const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSkill(event.target.value);
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
			<DialogTitle id="form-dialog-title" textAlign="center">
				You have reached level {level}!
			</DialogTitle>
			<DialogContent>
				{showSkills ? (
					<FormControl>
						<FormLabel id="attribute-label" sx={{ color: "primary.main", textAlign: "center", mb: 2 }}>
							Choose a new skill
						</FormLabel>
						<RadioGroup
							aria-labelledby="attribute-label"
							name="attribute"
							value={stat}
							onChange={handleSkillChange}
							sx={{ gap: 1 }}
						>
							{skills.map((sk) => (
								<FormControlLabel
									key={sk.id}
									value={sk.id}
									sx={{ m: 0 }}
									control={<Radio sx={{ display: "none" }} />}
									disableTypography
									label={<SkillLabel skill={sk} isSelected={sk.id === skill} />}
								/>
							))}
						</RadioGroup>
					</FormControl>
				) : (
					<FormControl sx={{ width: "100%", alignItems: "center" }}>
						<FormLabel id="attribute-label" sx={{ color: "primary.main", textAlign: "center", mb: 2 }}>
							Choose an attribute to increase
						</FormLabel>
						<RadioGroup
							aria-labelledby="attribute-label"
							name="attribute"
							value={stat}
							onChange={handleStatChange}
							sx={{ gap: 1 }}
						>
							{STATS.map((st) => (
								<FormControlLabel
									key={st}
									value={st}
									sx={{ m: 0 }}
									control={<Radio sx={{ display: "none" }} />}
									disableTypography
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
					<Link component="button" onClick={handleNext} disabled={!stat}>
						Next
					</Link>
				) : (
					<Link component="button" onClick={handleConfirm} disabled={isDisabled}>
						Confirm
					</Link>
				)}
			</DialogActions>
		</Dialog>
	);
};
