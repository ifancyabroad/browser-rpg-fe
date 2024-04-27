import { Box, Tooltip, Typography } from "@mui/material";
import { useAppSelector } from "common/hooks";
import { ReactComponent as LevelIcon } from "assets/images/icons/stairs.svg";
import { ReactComponent as DayIcon } from "assets/images/icons/sun.svg";
import { ReactComponent as GoldIcon } from "assets/images/icons/coins.svg";
import { ReactComponent as KillsIcon } from "assets/images/icons/death-skull.svg";
import { useLocation } from "react-router-dom";

const PAGE_TITLE_MAP: Record<string, string> = {
	"/game": "Dungeon",
	"/game/shop": "Shop",
	"/game/battle": "Battle",
};

export const GameBar: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);
	const location = useLocation();
	const pageTitle = PAGE_TITLE_MAP[location.pathname] ?? "Dungeon";

	if (!character) {
		return null;
	}

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				p: 1,
				bgcolor: "primary.dark",
				boxShadow: "inset 0px 1px 0px 0px rgba(255,255,255,0.07)",
				borderBottom: "1px solid #000",
			}}
		>
			<Box
				sx={{
					flexGrow: 1,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 4,
				}}
			>
				<Typography variant="h6">{pageTitle}</Typography>

				<Box
					sx={{
						display: "flex",
						gap: 3,
					}}
				>
					<Tooltip title="Level" placement="top">
						<Box display="flex" alignItems="center" gap={1}>
							<LevelIcon height={16} width={16} />
							<Typography variant="body2">{character.map.location.level + 1}</Typography>
						</Box>
					</Tooltip>
					<Tooltip title="Day" placement="top">
						<Box display="flex" alignItems="center" gap={1}>
							<DayIcon height={16} width={16} />
							<Typography variant="body2">{character.day}</Typography>
						</Box>
					</Tooltip>
					<Tooltip title="Gold" placement="top">
						<Box display="flex" alignItems="center" gap={1}>
							<GoldIcon height={16} width={16} />
							<Typography variant="body2">{character.gold}</Typography>
						</Box>
					</Tooltip>
					<Tooltip title="Kills" placement="top">
						<Box display="flex" alignItems="center" gap={1}>
							<KillsIcon height={16} width={16} />
							<Typography variant="body2">{character.kills}</Typography>
						</Box>
					</Tooltip>
				</Box>
			</Box>
		</Box>
	);
};
