import { Box, ButtonBase, darken, styled, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector, useFindPath } from "common/hooks";
import { IRoom } from "common/types";
import { ACTION_ROOMS, RoomState, RoomType } from "common/utils";
import { setCurrentRoom, setPath } from "./dungeonSlice";
import { useDungeonContext } from "common/context";
import { RoomTypeIcon } from "common/components";

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
	const isActionRoom = room.state !== RoomState.Complete && ACTION_ROOMS.includes(room.type);
	const dungeonContext = useDungeonContext();

	const handleMove = () => {
		if (!isAccessible) {
			return;
		}
		dispatch(setPath(path));
		dispatch(setCurrentRoom(room));

		if (isActionRoom) {
			dungeonContext.dispatch({
				type: "OPEN",
				payload: room.type,
			});
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
				<RoomTypeIcon type={room.type} />
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
