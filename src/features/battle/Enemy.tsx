import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { ActiveEffects, HealthBar } from "common/components";
import { useAppSelector } from "common/hooks";
import { EnemyTab } from "common/utils";
import { useState } from "react";
import { CombatLog } from "./CombatLog";

const EnemyPortrait: React.FC = () => {
	const enemy = useAppSelector((state) => state.battle.enemy);

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
				aspectRatio: { sm: "1/1" },
			}}
		>
			<Box
				component="img"
				sx={{
					width: { xs: "auto", sm: "100%" },
					height: { xs: 200, sm: "100%" },
					objectFit: "contain",
					verticalAlign: "middle",
				}}
				src={image}
				alt={name}
			/>
		</Box>
	);
};

export const Enemy: React.FC = () => {
	const enemy = useAppSelector((state) => state.battle.enemy);
	const [enemyTab, setEnemyTab] = useState(EnemyTab.CombatLog);
	const showCombatLog = enemyTab === EnemyTab.CombatLog;

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

			<Tabs value={enemyTab} onChange={handleChangeTab} variant="fullWidth" sx={{ display: { sm: "none" } }}>
				<Tab label="Combat Log" value={EnemyTab.CombatLog} />
				<Tab label="Portrait" value={EnemyTab.Portrait} />
			</Tabs>

			<Box position="relative">
				<EnemyPortrait />
				{showCombatLog && (
					<Box
						sx={{
							display: { sm: "none" },
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							backgroundColor: "rgba(0, 0, 0, 0.6)",
						}}
					>
						<CombatLog />
					</Box>
				)}
			</Box>
		</Stack>
	);
};
