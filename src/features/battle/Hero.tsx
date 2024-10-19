import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { ActiveEffects, HealthBar } from "common/components";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { openCombatLogModal } from "features/modals";

export const Hero: React.FC = () => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);

	const openBattleStats = () => {
		dispatch(openCombatLogModal());
	};

	if (!character) {
		return null;
	}

	const { name, activeAuxiliaryEffects, activeStatusEffects, hitPoints, maxHitPoints, level } = character;

	return (
		<Stack spacing={1} minHeight={110}>
			<Box display="flex" justifyContent="space-between">
				<Typography variant="h6" fontSize={18} color="primary.main" noWrap>
					{name} the Level{" "}
					<Box component="span" color="text.secondary">
						{level}
					</Box>{" "}
					{character.characterClass.name}
				</Typography>

				<IconButton
					sx={{ display: { sm: "none" } }}
					size="small"
					aria-label="Toggle Battle Stats"
					onClick={openBattleStats}
				>
					<MenuBookIcon />
				</IconButton>
			</Box>
			<HealthBar value={hitPoints} max={maxHitPoints} />
			<ActiveEffects auxiliaryEffects={activeAuxiliaryEffects} statusEffects={activeStatusEffects} />
		</Stack>
	);
};
