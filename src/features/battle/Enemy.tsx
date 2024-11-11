import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { ActiveEffects, HealthBar } from "common/components";
import { useAppSelector } from "common/hooks";
import { EnemyTab } from "common/utils";
import { useState } from "react";
import { CombatLog } from "./CombatLog";

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

const EnemyPortrait: React.FC = () => {
	const enemy = useAppSelector((state) => state.battle.battle?.enemy);

	if (!enemy) {
		return null;
	}

	const { name, image } = enemy;

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box
				component="img"
				sx={{
					aspectRatio: "227/321",
					width: { sm: "80%" },
					height: { xs: 200, sm: "auto" },
					verticalAlign: "middle",
				}}
				src={image}
				alt={name}
			/>
		</Box>
	);
};

export const Enemy: React.FC = () => {
	const enemy = useAppSelector((state) => state.battle.battle?.enemy);
	const [enemyTab, setEnemyTab] = useState(EnemyTab.Portrait);

	const handleChangeTab = (event: React.SyntheticEvent, newValue: EnemyTab) => {
		setEnemyTab(newValue);
	};

	if (!enemy) {
		return null;
	}

	const { name, level, hitPoints, maxHitPoints, activeAuxiliaryEffects, activeStatusEffects, boss, hero, username } =
		enemy;

	return (
		<Stack spacing={1}>
			<Stack spacing={1} minHeight={{ xs: 94, sm: 110 }}>
				<Typography variant="h6" fontSize={18} color="primary.main" noWrap>
					{!boss && !hero && (
						<Box component="span" color="text.secondary">
							Level {level}{" "}
						</Box>
					)}
					{name}{" "}
					{boss && (
						<Box component="span" color="error.main">
							(Boss)
						</Box>
					)}
					{hero && (
						<Box component="span" color="info.light">
							({username})
						</Box>
					)}
				</Typography>
				<HealthBar value={hitPoints} max={maxHitPoints} />
				<ActiveEffects auxiliaryEffects={activeAuxiliaryEffects} statusEffects={activeStatusEffects} />
			</Stack>

			<Box display={{ xs: "none", sm: "block" }}>
				<EnemyPortrait />
			</Box>

			<Tabs value={enemyTab} onChange={handleChangeTab} variant="fullWidth" sx={{ display: { sm: "none" } }}>
				<Tab label="Portrait" value={EnemyTab.Portrait} />
				<Tab label="Combat Log" value={EnemyTab.CombatLog} />
			</Tabs>
			<Box sx={{ display: { sm: "none" } }}>
				<TabPanel value={enemyTab} index={EnemyTab.Portrait}>
					<EnemyPortrait />
				</TabPanel>
				<TabPanel value={enemyTab} index={EnemyTab.CombatLog}>
					<CombatLog />
				</TabPanel>
			</Box>
		</Stack>
	);
};
