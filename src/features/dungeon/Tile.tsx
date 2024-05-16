import { Box, ButtonBase, darken, styled, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector, useFindPath } from "common/hooks";
import { IRoom } from "common/types";
import { RoomType } from "common/utils";
import { setCurrentRoom, setPath } from "./dungeonSlice";
import monsterIcon from "assets/images/icons/Quest_24_scull.png";
import bossIcon from "assets/images/icons/Quest_48_pirate.png";
import treasureIcon from "assets/images/icons/Quest_10_treasure.png";
import merchantIcon from "assets/images/icons/Villager_man.png";
import restIcon from "assets/images/icons/Campfire_Withfire.png";
import exitIcon from "assets/images/icons/StoneStairs.png";

const BaseTile = styled(Box)({
	position: "relative",
	aspectRatio: "1/1",
	display: "flex",
	alignItems: "stretch",
	justifyContent: "center",
});

interface IBaseRoomProps {
	component?: React.ElementType;
	disabled?: boolean;
	isAccessible: boolean;
}

const BaseRoom = styled(ButtonBase, {
	shouldForwardProp: (prop) => !["isInPath", "isAccessible"].includes(prop as string),
})<IBaseRoomProps>(({ theme, isAccessible }) => ({
	flex: 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderStyle: "dashed",
	borderWidth: 3,
	borderColor: "transparent",
	backgroundColor: theme.palette.grey[900],
	opacity: isAccessible ? 1 : 0.7,
	":hover:not(:disabled)": {
		cursor: "pointer",
		borderColor: theme.palette.primary.main,
	},
	img: {
		width: "50%",
		display: isAccessible ? "block" : "none",
	},
	".merchant": {
		height: "90%",
		width: "auto",
	},
	"&.complete img": {
		display: "none",
	},
}));

const ROOM_ICON_MAP: Record<RoomType, JSX.Element | null> = {
	[RoomType.None]: null,
	[RoomType.Wall]: null,
	[RoomType.Empty]: null,
	[RoomType.Battle]: <img src={monsterIcon} alt="Battle" className="battle" />,
	[RoomType.Boss]: <img src={bossIcon} alt="Boss" className="boss" />,
	[RoomType.Treasure]: <img src={treasureIcon} alt="Treasure" className="treasure" />,
	[RoomType.Shop]: <img src={merchantIcon} alt="Merchant" className="merchant" />,
	[RoomType.Rest]: <img src={restIcon} alt="Rest" className="rest" />,
	[RoomType.Entrance]: null,
	[RoomType.Exit]: <img src={exitIcon} alt="Exit" className="exit" />,
};

interface ITileProps {
	room: IRoom;
}

const Room: React.FC<ITileProps> = ({ room }) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const path = useFindPath(room.location);
	const isAccessible = path.length > 0;
	const isDisabled = isLoading || !isAccessible;

	const handleMove = () => {
		if (isAccessible) {
			dispatch(setPath(path));
			dispatch(setCurrentRoom(room));
		}
	};

	return (
		<BaseTile>
			<BaseRoom
				disableRipple
				onClick={handleMove}
				disabled={isDisabled}
				isAccessible={isAccessible}
				className={room.state}
			>
				{ROOM_ICON_MAP[room.type as RoomType]}
			</BaseRoom>
		</BaseTile>
	);
};

export const Tile: React.FC<ITileProps> = ({ room }) => {
	const theme = useTheme();

	return {
		[RoomType.None]: <BaseTile />,
		[RoomType.Empty]: <Room room={room} />,
		[RoomType.Wall]: <BaseTile bgcolor={darken(theme.palette.grey[900], 0.6)} />,
		[RoomType.Battle]: <Room room={room} />,
		[RoomType.Boss]: <Room room={room} />,
		[RoomType.Shop]: <Room room={room} />,
		[RoomType.Treasure]: <Room room={room} />,
		[RoomType.Rest]: <Room room={room} />,
		[RoomType.Entrance]: <Room room={room} />,
		[RoomType.Exit]: <Room room={room} />,
	}[room.type as RoomType];
};
