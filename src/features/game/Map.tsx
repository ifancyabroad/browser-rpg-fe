import { Paper, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IRoom } from "common/types";
import { RoomType } from "common/utils";
import { getCurrentLevel } from "features/character";
import { ReactComponent as MonsterIcon } from "assets/images/icons/daemon-skull.svg";
import { ReactComponent as BossIcon } from "assets/images/icons/crowned-skull.svg";
import { ReactComponent as TreasureIcon } from "assets/images/icons/open-treasure-chest.svg";
import { ReactComponent as ShopIcon } from "assets/images/icons/shop.svg";
import { ReactComponent as RestIcon } from "assets/images/icons/campfire.svg";
import { ReactComponent as ExitIcon } from "assets/images/icons/doorway.svg";
import { Player } from "./Player";
import { useEffect, useRef } from "react";
import { setPlayerLocation } from "./gameSlice";

const Grid = styled("div")({
	position: "relative",
	width: "100%",
	maxWidth: 800,
	margin: "auto",
	display: "grid",
	gridTemplateColumns: "repeat(8, 1fr)",
});

const Tile = styled("div")({
	position: "relative",
	aspectRatio: "1/1",
	display: "flex",
	alignItems: "stretch",
	justifyContent: "center",
});

const BaseRoom = styled(Paper)(({ theme }) => ({
	flex: 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
	borderStyle: "solid",
	borderWidth: 3,
	borderColor: "transparent",
	transition: "all 0.2s ease-in-out",
	":hover": {
		borderColor: theme.palette.primary.main,
	},
	svg: {
		width: "50%",
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
	gridRef: React.RefObject<HTMLDivElement>;
	room: IRoom;
	hasPlayer: boolean;
}

const Room: React.FC<IRoomProps> = ({ gridRef, room, hasPlayer }) => {
	const dispatch = useAppDispatch();
	const roomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (gridRef && gridRef.current && roomRef && roomRef.current && hasPlayer) {
			const grid = gridRef.current.getBoundingClientRect();
			const room = roomRef.current.getBoundingClientRect();
			const top = room.top - grid.top;
			const left = room.left - grid.left;

			dispatch(
				setPlayerLocation({
					top: top + room.height / 2,
					left: left + room.width / 2,
				}),
			);
		}
	}, [dispatch, gridRef, hasPlayer]);

	const handleMove = () => {
		// TODO: Go to room
	};

	if (room.type === RoomType.None) {
		return <Tile />;
	}

	return (
		<Tile ref={roomRef}>
			<BaseRoom onClick={handleMove}>{ROOM_ICON_MAP[room.type as RoomType]}</BaseRoom>
		</Tile>
	);
};

export const Map: React.FC = () => {
	const level = useAppSelector(getCurrentLevel);
	const location = useAppSelector((state) => state.game.playerLocation);
	const ref = useRef<HTMLDivElement | null>(null);
	const character = useAppSelector((state) => state.character.character);

	if (!character) {
		return null;
	}

	return (
		<Grid ref={ref}>
			{level.map((row, x) =>
				row.map((room, y) => {
					const hasPlayer = x === character.map.location.x && y === character.map.location.y;
					return <Room key={`${x}${y}`} gridRef={ref} room={room} hasPlayer={hasPlayer} />;
				}),
			)}
			{location && <Player left={location.left} top={location.top} />}
		</Grid>
	);
};
