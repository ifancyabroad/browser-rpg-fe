import { Box, Divider, Stack, Tab, Tabs, Typography, darken, useTheme } from "@mui/material";
import { LinearProgressWithLabel } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { CharacterSheetTab, STATS_ABBR_MAP, Stat } from "common/utils";
import { Fragment } from "react";
import { setCharacterSheetTab } from "./characterSlice";
import { SkillList } from "./SkillList";
import { EquipmentList } from "./EquipmentList";

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

	if (!character) {
		return null;
	}

	const { name, level, characterClass, hitPoints, maxHitPoints, experience, stats } = character;

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
			<Box mb={2}>
				<Typography variant="h4">{name}</Typography>
				<Typography variant="subtitle1" color="textSecondary">
					Level {level} {characterClass.name}
				</Typography>
			</Box>

			<Box mb={2}>
				<Typography variant="body2">Health</Typography>
				<LinearProgressWithLabel value={hitPoints} max={maxHitPoints} label={`${hitPoints}/${maxHitPoints}`} />
				<Typography variant="body2">Experience</Typography>
				<LinearProgressWithLabel
					value={experience}
					max={experience}
					label={`${experience}/100`}
					customColor="#d065ff"
				/>
			</Box>

			<Stack direction="row" spacing={2} justifyContent="space-between" mb={2}>
				{Object.entries(stats).map(([k, v]) => (
					<Fragment key={k}>
						<Box textAlign="center">
							<Typography variant="caption" color="textSecondary">
								{STATS_ABBR_MAP[k as Stat]}
							</Typography>
							<Typography variant="body1">{v}</Typography>
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
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs value={characterSheetTab} onChange={handleChangeTab} variant="fullWidth">
						<Tab label="Skills" value={CharacterSheetTab.Skills} />
						<Tab label="Inventory" value={CharacterSheetTab.Inventory} />
					</Tabs>
				</Box>
				<TabPanel value={characterSheetTab} index={CharacterSheetTab.Skills}>
					<SkillList skills={character.skills} />
				</TabPanel>
				<TabPanel value={characterSheetTab} index={CharacterSheetTab.Inventory}>
					<EquipmentList equipment={character.equipment} />
				</TabPanel>
			</Box>
		</Box>
	);
};
