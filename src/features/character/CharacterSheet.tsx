import { Box, IconButton, Tab, Tabs, Typography, darken, useTheme } from "@mui/material";
import { LinearProgressWithLabel } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { CharacterSheetTab } from "common/utils";
import { setCharacterSheetTab } from "./characterSlice";
import { SkillList } from "./SkillList";
import { EquipmentList } from "./EquipmentList";
import { Details } from "./Details";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { openLevelUpModal } from "features/modals";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index ? children : null}
		</div>
	);
};

export const CharacterSheet: React.FC = () => {
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	const characterSheetTab = useAppSelector((state) => state.character.characterSheetTab);

	const handleChangeTab = (event: React.SyntheticEvent, newValue: CharacterSheetTab) => {
		dispatch(setCharacterSheetTab(newValue));
	};

	const handleLevelUp = () => {
		dispatch(openLevelUpModal());
	};

	if (!character) {
		return null;
	}

	const { name, level, characterClass, hitPoints, maxHitPoints, experience, nextLevelExperience } = character;

	return (
		<Box
			sx={{
				height: "calc(100vh - 52px)",
				width: "400px",
				bgcolor: darken(theme.palette.background.paper, 0.25),
				p: 2,
				overflow: "auto",
			}}
		>
			<Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
				<Box>
					<Typography variant="h4">{name}</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Level {level} {characterClass.name}
					</Typography>
				</Box>

				{experience >= nextLevelExperience && (
					<IconButton color="success" aria-label="Level up" onClick={handleLevelUp}>
						<ArrowCircleUpIcon />
					</IconButton>
				)}
			</Box>

			<Box mb={2}>
				<Typography variant="body2">Health</Typography>
				<LinearProgressWithLabel value={hitPoints} max={maxHitPoints} label={`${hitPoints}/${maxHitPoints}`} />
				<Typography variant="body2">Experience</Typography>
				<LinearProgressWithLabel
					value={experience}
					max={nextLevelExperience}
					label={`${experience}/${nextLevelExperience}`}
					customColor="#d065ff"
				/>
			</Box>

			<Box>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs value={characterSheetTab} onChange={handleChangeTab} variant="fullWidth">
						<Tab label="Skills" value={CharacterSheetTab.Skills} />
						<Tab label="Inventory" value={CharacterSheetTab.Inventory} />
						<Tab label="Details" value={CharacterSheetTab.Details} />
					</Tabs>
				</Box>
				<TabPanel value={characterSheetTab} index={CharacterSheetTab.Skills}>
					<SkillList skills={character.skills} />
				</TabPanel>
				<TabPanel value={characterSheetTab} index={CharacterSheetTab.Inventory}>
					<EquipmentList equipment={character.equipment} />
				</TabPanel>
				<TabPanel value={characterSheetTab} index={CharacterSheetTab.Details}>
					<Details />
				</TabPanel>
			</Box>
		</Box>
	);
};
