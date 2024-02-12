import { Box, Drawer, IconButton, Stack, Tab, TabProps, Tabs, TabsProps, Typography, styled } from "@mui/material";
import { Portrait } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { CharacterSheetTab, State } from "common/utils";
import { closeCharacterSheet, setCharacterSheetTab } from "./characterSlice";
import { SkillList } from "./SkillList";
import { EquipmentTable } from "./EquipmentTable";
import { Details } from "./Details";
import CloseIcon from "@mui/icons-material/Close";
import logo from "assets/images/logos/browser_heroes.png";
import characterIcon from "assets/images/ui/CharacterIcon.svg";
import { ExperienceBar } from "./ExperienceBar";
import tabFrame from "assets/images/ui/TabFrame.png";
import tabContentFrame from "assets/images/ui/TabContentFrame.png";

const StyledTabs = styled((props: TabsProps) => <Tabs {...props} />)(({ theme }) => ({
	gap: theme.spacing(1),
	"& .MuiTabs-indicator": {
		display: "none",
	},
}));

const StyledTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
	backgroundImage: `url(${tabFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "124px",
	height: "48px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: theme.spacing(1.25),
	textTransform: "none",
	fontWeight: theme.typography.fontWeightRegular,
	fontSize: "12px",
	"&:hover": {
		color: "#FFFFFF",
		opacity: 1,
	},
	"&.Mui-selected": {
		color: "#FFFFFF",
		fontWeight: theme.typography.fontWeightMedium,
	},
}));

const TabContent = styled(Box)(({ theme }) => ({
	position: "relative",
	backgroundImage: `url(${tabContentFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	padding: theme.spacing(2),
	marginTop: "-10px",
	zIndex: 1,
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

	const handleChangeTab = (event: React.SyntheticEvent, newValue: CharacterSheetTab) => {
		dispatch(setCharacterSheetTab(newValue));
	};

	if (!character) {
		return null;
	}

	const {
		name,
		hitPoints,
		maxHitPoints,
		experience,
		nextLevelExperience,
		state,
		activeAuxiliaryEffects,
		activeStatusEffects,
	} = character;
	const showLevelUp = experience >= nextLevelExperience && state === State.Idle;

	return (
		<Stack flex={1} p={2} spacing={3}>
			<Box mb={2}>
				<Portrait
					className="character-portrait"
					label={name}
					portrait={characterIcon}
					value={hitPoints}
					max={maxHitPoints}
					auxiliaryEffects={activeAuxiliaryEffects}
					statusEffects={activeStatusEffects}
					showLevelUp={showLevelUp}
				/>
			</Box>

			<Box boxShadow="0px 20px 30px rgba(0,0,0,0.25)">
				<StyledTabs value={characterSheetTab} onChange={handleChangeTab} variant="fullWidth">
					<StyledTab label="Skills" value={CharacterSheetTab.Skills} />
					<StyledTab label="Inventory" value={CharacterSheetTab.Inventory} />
					<StyledTab label="Details" value={CharacterSheetTab.Details} />
				</StyledTabs>
				<TabContent>
					<TabPanel value={characterSheetTab} index={CharacterSheetTab.Skills}>
						<SkillList skills={character.skills} />
					</TabPanel>
					<TabPanel value={characterSheetTab} index={CharacterSheetTab.Inventory}>
						<EquipmentTable equipment={character.equipment} />
					</TabPanel>
					<TabPanel value={characterSheetTab} index={CharacterSheetTab.Details}>
						<Details />
					</TabPanel>
				</TabContent>
			</Box>

			<Box flex={1} display="flex" alignItems="flex-end" justifyContent="center">
				<ExperienceBar />
			</Box>
		</Stack>
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
						border: 0,
					},
				}}
				open
			>
				<CharacterContent />
			</Drawer>
		</Box>
	);
};
