import { Paper, styled } from "@mui/material";
import { useAppDispatch, useAppSelector, useFindPath } from "common/hooks";
import { IRoom } from "common/types";
import { RoomType } from "common/utils";
import { getIsInDisplayedPath, move, setDisplayedPath } from "features/character";
import { forwardRef } from "react";
import { openErrorModal } from "features/modals";
import { ReactComponent as MonsterIcon } from "assets/images/icons/daemon-skull.svg";
import { ReactComponent as BossIcon } from "assets/images/icons/crowned-skull.svg";
import { ReactComponent as TreasureIcon } from "assets/images/icons/open-treasure-chest.svg";
import { ReactComponent as ShopIcon } from "assets/images/icons/shop.svg";
import { ReactComponent as RestIcon } from "assets/images/icons/campfire.svg";
import { ReactComponent as ExitIcon } from "assets/images/icons/doorway.svg";

const Tile = styled("div")({
	position: "relative",
	aspectRatio: "1/1",
	display: "flex",
	alignItems: "stretch",
	justifyContent: "center",
});

interface IBaseRoomProps {
	component: React.ElementType;
	disabled?: boolean;
	isInPath: boolean;
	isAccessible: boolean;
}

const BaseRoom = styled(Paper, {
	shouldForwardProp: (prop) => !["isInPath", "isAccessible"].includes(prop as string),
})<IBaseRoomProps>(({ theme, isInPath, isAccessible }) => ({
	flex: 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderStyle: "solid",
	borderWidth: 3,
	borderColor: isInPath ? theme.palette.primary.main : "transparent",
	opacity: isAccessible ? 1 : 0.4,
	transition: "all 0.2s ease-in-out",
	":hover:not(:disabled)": {
		cursor: "pointer",
	},
	svg: {
		width: "50%",
	},
	"&.complete svg": {
		opacity: 0.5,
	},
}));

const ROOM_ICON_MAP: Record<RoomType, JSX.Element | null> = {
	[RoomType.None]: null,
	[RoomType.Empty]: null,
	[RoomType.Battle]: <MonsterIcon />,
	[RoomType.Boss]: <BossIcon />,
	[RoomType.Treasure]: <TreasureIcon />,
	[RoomType.Shop]: <ShopIcon />,
	[RoomType.Rest]: <RestIcon />,
	[RoomType.Entrance]: null,
	[RoomType.Exit]: <ExitIcon />,
};

interface IRoomProps {
	ref: React.Ref<HTMLDivElement>;
	room: IRoom;
}

export const Room: React.FC<IRoomProps> = forwardRef<HTMLDivElement, IRoomProps>(({ room }, ref) => {
	const dispatch = useAppDispatch();
	const inInPath = useAppSelector(getIsInDisplayedPath)(room.location);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const path = useFindPath(room.location);
	const isAccessible = path.length > 0;
	const isDisabled = isLoading || !isAccessible;

	const handleMove = async () => {
		if (isAccessible) {
			try {
				await dispatch(move({ location: room.location, path })).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		}
	};

	const handleShowPath = () => {
		dispatch(setDisplayedPath(path));
	};

	const handleClearPath = () => {
		dispatch(setDisplayedPath([]));
	};

	if (room.type === RoomType.None) {
		return <Tile />;
	}

	return (
		<Tile ref={ref}>
			<BaseRoom
				component="button"
				onClick={handleMove}
				onMouseOver={handleShowPath}
				onMouseOut={handleClearPath}
				disabled={isDisabled}
				isInPath={inInPath}
				isAccessible={isAccessible}
				className={room.state}
			>
				{ROOM_ICON_MAP[room.type as RoomType]}
			</BaseRoom>
		</Tile>
	);
});
