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
import { MAX_STAT_VALUE, SKILL_TYPE_NAME_MAP, STATS, STATS_NAME_MAP, Stat, getSkillType } from "common/utils";
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
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				gap: 3,
				p: 1,
			}}
		>
			<Box display="flex" alignItems="center" gap={2} overflow="hidden">
				<SkillIcon skill={skill} />
				<Stack overflow="hidden">
					<Typography color="text.secondary" noWrap>
						{skill.name}
					</Typography>
					<Typography variant="body2" noWrap>
						{secondaryText}
					</Typography>
				</Stack>
			</Box>
			<Link component="button" onClick={handleViewSkill}>
				Details
			</Link>
		</HoverButton>
	);
};

interface IStatLabelProps {
	stat: Stat;
	baseValue: number;
	currentValue: number;
	isSelected: boolean;
	isDisabled: boolean;
}

const StatLabel: React.FC<IStatLabelProps> = ({ stat, baseValue, currentValue, isSelected, isDisabled }) => {
	return (
		<HoverButton
			component={Box}
			isActive={isSelected}
			disabled={isDisabled}
			sx={{
				width: "100%",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				gap: 3,
				p: 1,
				opacity: isDisabled ? 0.5 : 1,
			}}
		>
			<Box display="flex" alignItems="center" gap={2}>
				<StatIcon stat={stat} width={24} />
				<Box>
					<Typography lineHeight={1}>
						{STATS_NAME_MAP[stat]}{" "}
						{isDisabled && (
							<Box component="span" color="error.main">
								(Max)
							</Box>
						)}
					</Typography>
				</Box>
			</Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography color="text.secondary">{baseValue} →</Typography>
				<Typography color="success.light">{baseValue + 1}</Typography>
				<Typography color="info.light">({currentValue + 1})</Typography>
			</Box>
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
		<Dialog open={open} aria-labelledby="level-up-dialog-title">
			<DialogTitle id="level-up-dialog-title" textAlign="center">
				You have reached level {level}!
			</DialogTitle>
			<DialogContent>
				{showSkills ? (
					<FormControl sx={{ width: "100%", alignItems: "center" }}>
						<FormLabel id="attribute-label" sx={{ color: "primary.main", textAlign: "center", mb: 2 }}>
							Choose a new skill
						</FormLabel>
						<RadioGroup
							aria-labelledby="attribute-label"
							name="attribute"
							value={stat}
							onChange={handleSkillChange}
							sx={{ maxWidth: "100%", gap: 1 }}
						>
							{skills.map((sk) => (
								<FormControlLabel
									key={sk.id}
									value={sk.id}
									sx={{ maxWidth: "100%", m: 0 }}
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
							{STATS.map((st) => {
								const isSelected = st === stat;
								const isStatDisabled = character.baseStats[st] >= MAX_STAT_VALUE;

								return (
									<FormControlLabel
										key={st}
										value={st}
										sx={{ m: 0 }}
										control={<Radio sx={{ display: "none" }} />}
										disableTypography
										disabled={isStatDisabled}
										label={
											<StatLabel
												stat={st}
												baseValue={character.baseStats[st]}
												currentValue={character.stats[st]}
												isSelected={isSelected}
												isDisabled={isStatDisabled}
											/>
										}
									/>
								);
							})}
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
