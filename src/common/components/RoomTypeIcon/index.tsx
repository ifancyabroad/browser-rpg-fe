import { ROOM_ACTION_NAME_MAP, ROOM_CLASS_NAME_MAP, RoomType } from "common/utils";
import monsterIcon from "assets/images/icons/Quest_24_scull.png";
import bossIcon from "assets/images/icons/Quest_48_pirate.png";
import treasureIcon from "assets/images/icons/Quest_10_treasure.png";
import merchantIcon from "assets/images/icons/Villager_man.png";
import restIcon from "assets/images/icons/Campfire_Withfire.png";
import exitIcon from "assets/images/icons/StoneStairs.png";

const ROOM_ICON_MAP: Record<RoomType, string | null> = {
	[RoomType.None]: null,
	[RoomType.Wall]: null,
	[RoomType.Empty]: null,
	[RoomType.Battle]: monsterIcon,
	[RoomType.Boss]: bossIcon,
	[RoomType.Treasure]: treasureIcon,
	[RoomType.Shop]: merchantIcon,
	[RoomType.Rest]: restIcon,
	[RoomType.Entrance]: null,
	[RoomType.Exit]: exitIcon,
};

interface IProps {
	type: RoomType;
	width?: number;
	className?: string;
}

export const RoomTypeIcon: React.FC<IProps> = ({ type, width, className }) => {
	const icon = ROOM_ICON_MAP[type];

	if (!icon) {
		return null;
	}

	return (
		<img
			src={icon}
			alt={ROOM_ACTION_NAME_MAP[type]}
			className={`${ROOM_CLASS_NAME_MAP[type]} ${className}`}
			width={width}
		/>
	);
};
