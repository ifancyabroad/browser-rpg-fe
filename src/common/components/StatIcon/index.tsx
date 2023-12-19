import { STATS_NAME_MAP, Stat } from "common/utils";
import charismaIcon from "assets/images/icons/duality-mask.svg";
import constitutionIcon from "assets/images/icons/hearts.svg";
import dexterityIcon from "assets/images/icons/acrobatic.svg";
import intelligenceIcon from "assets/images/icons/brain.svg";
import strengthIcon from "assets/images/icons/biceps.svg";
import wisdomIcon from "assets/images/icons/ankh.svg";
import { Tooltip } from "@mui/material";

const STATS_ICON_MAP: Record<Stat, string> = {
	[Stat.Charisma]: charismaIcon,
	[Stat.Constitution]: constitutionIcon,
	[Stat.Dexterity]: dexterityIcon,
	[Stat.Intelligence]: intelligenceIcon,
	[Stat.Strength]: strengthIcon,
	[Stat.Wisdom]: wisdomIcon,
};

interface IProps {
	stat: Stat;
	width?: number;
}

export const StatIcon: React.FC<IProps> = ({ stat, width = 40 }) => (
	<Tooltip title={STATS_NAME_MAP[stat]} placement="top">
		<img src={STATS_ICON_MAP[stat]} alt={STATS_NAME_MAP[stat]} width={width} />
	</Tooltip>
);
