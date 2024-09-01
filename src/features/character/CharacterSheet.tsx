import { Box, Drawer, IconButton, Stack, Tab, Tabs, Typography, styled } from "@mui/material";
import { HealthBar } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { CharacterSheetTab } from "common/utils";
import { closeCharacterSheet, getLevelUpAvailable, setCharacterSheetTab } from "./characterSlice";
import { SkillTable } from "./SkillTable";
import { EquipmentTable } from "./EquipmentTable";
import { Details } from "./Details";
import CloseIcon from "@mui/icons-material/Close";
import { ExperienceBar } from "./ExperienceBar";
import { openLevelUpModal } from "features/modals";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const TabContent = styled(Box)(({ theme }) => ({
	position: "relative",
}));

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

const CharacterContent: React.FC = () => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	const characterSheetTab = useAppSelector((state) => state.character.characterSheetTab);
	const showLevelUp = useAppSelector(getLevelUpAvailable);

	const handleChangeTab = (event: React.SyntheticEvent, newValue: CharacterSheetTab) => {
		dispatch(setCharacterSheetTab(newValue));
	};

	const handleLevelUp = () => {
		dispatch(openLevelUpModal());
	};

	if (!character) {
		return null;
	}

	const { name, hitPoints, maxHitPoints } = character;

	return (
		<Stack flex={1} p={2} spacing={5}>
			<Stack gap={1}>
				<Box display="flex" alignItems="center" gap={1}>
					<Typography variant="h6" fontSize={18} color="primary.main" noWrap>
						{name} the {character.characterClass.name}
					</Typography>
					{showLevelUp && (
						<IconButton onClick={handleLevelUp} sx={{ "&:hover": { color: "primary.main" } }}>
							<KeyboardDoubleArrowUpIcon />
						</IconButton>
					)}
				</Box>
				<HealthBar value={hitPoints} max={maxHitPoints} />
				<ExperienceBar />

				<Box display="flex" justifyContent="space-between" gap={1}>
					<Box display="flex" alignItems="center" gap={1}>
						<Typography color="secondary.main">Level</Typography>
						<Typography>{character.level}</Typography>
					</Box>
					<Box display="flex" alignItems="center" gap={1}>
						<Typography color="secondary.main">Zone</Typography>
						<Typography>{character.zone}</Typography>
					</Box>
					<Box display="flex" alignItems="center" gap={1}>
						<Typography color="secondary.main">Gold</Typography>
						<Typography>{character.gold}</Typography>
					</Box>
					<Box display="flex" alignItems="center" gap={1}>
						<Typography color="secondary.main">Kills</Typography>
						<Typography>{character.kills}</Typography>
					</Box>
				</Box>
			</Stack>

			<Box>
				<Tabs value={characterSheetTab} onChange={handleChangeTab} variant="fullWidth" sx={{ mb: 2 }}>
					<Tab label="Details" value={CharacterSheetTab.Details} />
					<Tab label="Inventory" value={CharacterSheetTab.Inventory} />
					<Tab label="Skills" value={CharacterSheetTab.Skills} />
				</Tabs>
				<TabContent>
					<TabPanel value={characterSheetTab} index={CharacterSheetTab.Details}>
						<Details />
					</TabPanel>
					<TabPanel value={characterSheetTab} index={CharacterSheetTab.Inventory}>
						<EquipmentTable equipment={character.equipment} />
					</TabPanel>
					<TabPanel value={characterSheetTab} index={CharacterSheetTab.Skills}>
						<SkillTable skills={character.skills} />
					</TabPanel>
				</TabContent>
			</Box>
		</Stack>
	);
};

const DRAWER_WIDTH = 400;
const DRAWER_TOP = 0;

export const CharacterSheet: React.FC = () => {
	const dispatch = useAppDispatch();
	const mobileOpen = useAppSelector((state) => state.character.isCharacterSheetOpen);

	const handleDrawerToggle = () => {
		dispatch(closeCharacterSheet());
	};

	return (
		<Box
			sx={{
				width: {
					md: DRAWER_WIDTH,
				},
				flexShrink: {
					md: 0,
				},
			}}
		>
			<Drawer
				sx={{ display: { xs: "block", md: "none" } }}
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				PaperProps={{
					elevation: 0,
					sx: {
						width: DRAWER_WIDTH,
						maxWidth: "100%",
						border: "none",
					},
				}}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
			>
				<Box
					sx={{
						flex: 1,
						border: 0,
					}}
				>
					<CharacterContent />

					<IconButton onClick={handleDrawerToggle} sx={{ position: "absolute", top: 8, right: 8 }}>
						<CloseIcon />
					</IconButton>
				</Box>
			</Drawer>
			<Drawer
				sx={{ display: { xs: "none", md: "block" } }}
				variant="permanent"
				PaperProps={{
					sx: {
						height: "100vh",
						width: DRAWER_WIDTH,
						top: DRAWER_TOP,
						backgroundColor: "transparent",
						border: "none",
					},
				}}
				open
			>
				<CharacterContent />
			</Drawer>
		</Box>
	);
};
