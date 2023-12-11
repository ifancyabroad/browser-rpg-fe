import { Box, Drawer, IconButton, Paper, Stack, Tab, Tabs, Typography, alpha, darken, useTheme } from "@mui/material";
import { LinearProgressWithLabel } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { CharacterSheetTab } from "common/utils";
import { closeCharacterSheet, setCharacterSheetTab } from "./characterSlice";
import { SkillList } from "./SkillList";
import { EquipmentList } from "./EquipmentList";
import { Details } from "./Details";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { openLevelUpModal } from "features/modals";
import background from "assets/images/background/bgtile.webp";
import background2 from "assets/images/background/bgtile2.webp";
import CloseIcon from "@mui/icons-material/Close";
import logo from "assets/images/logos/browser_heroes.png";

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
		<Box>
			<Paper sx={{ backgroundColor: alpha(theme.palette.background.paper, 0.5), p: 1 }}>
				<Stack direction="row" justifyContent="space-around" spacing={2} flexGrow={1}>
					<Typography variant="body2">Day: {character.day}</Typography>
					<Typography variant="body2">Gold: {character.gold}</Typography>
					<Typography variant="body2">Kills: {character.kills}</Typography>
				</Stack>
			</Paper>

			<Box p={2}>
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
					<LinearProgressWithLabel
						color="success"
						value={hitPoints}
						max={maxHitPoints}
						label={`${hitPoints}/${maxHitPoints}`}
					/>
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
		</Box>
	);
};

const CharacterHeader: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleDrawerToggle = () => {
		dispatch(closeCharacterSheet());
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				p: 1,
				bgcolor: "background.paper",
				boxShadow: "inset 0px 1px 0px 0px rgba(255,255,255,0.07)",
				borderBottom: "1px solid #000",
			}}
		>
			<Box
				sx={{
					flexGrow: 1,
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}
			>
				<Box component="img" src={logo} height={32} width={32} />
				<Typography variant="h6" fontFamily="'Cinzel', serif" fontWeight="bold">
					Browser Heroes
				</Typography>
			</Box>

			<IconButton aria-label="close" color="inherit" type="button" onClick={handleDrawerToggle}>
				<CloseIcon />
			</IconButton>
		</Box>
	);
};

const DRAWER_WIDTH = 400;
const DRAWER_TOP = 53;

export const CharacterSheet: React.FC = () => {
	const dispatch = useAppDispatch();
	const mobileOpen = useAppSelector((state) => state.character.isCharacterSheetOpen);
	const theme = useTheme();

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
					sx: {
						width: DRAWER_WIDTH,
						maxWidth: "100%",
						backgroundImage: `url(${background2}), url(${background})`,
						backgroundPosition: "0px 0px, 0px 0px",
						backgroundRepeat: "repeat-x, repeat",
						boxShadow: "inset 0px 0px 0px 1px rgba(255,255,255,0.09)",
					},
				}}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
			>
				<Box
					sx={{
						flex: 1,
						bgcolor: alpha(darken(theme.palette.background.paper, 0.25), 0.5),
						boxShadow: "inset 0px 0px 15px 0px rgba(0,0,0,0.8), 0px 0px 0px 1px rgba(255,255,255,0.06)",
					}}
				>
					<CharacterHeader />
					<CharacterContent />
				</Box>
			</Drawer>
			<Drawer
				sx={{ display: { xs: "none", md: "block" } }}
				variant="permanent"
				PaperProps={{
					sx: {
						height: `calc(100vh - ${DRAWER_TOP}px)`,
						width: DRAWER_WIDTH,
						top: DRAWER_TOP,
						bgcolor: alpha(darken(theme.palette.background.paper, 0.25), 0.5),
						boxShadow: "inset 0px 0px 15px 0px rgba(0,0,0,0.8), 0px 0px 0px 1px rgba(255,255,255,0.06)",
					},
				}}
				open
			>
				<CharacterContent />
			</Drawer>
		</Box>
	);
};
