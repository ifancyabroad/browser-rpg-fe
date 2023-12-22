import { Paper, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { ILocation, IRoom } from "common/types";
import { RoomType } from "common/utils";
import { getCurrentLevel, getIsPlayerLocation, move } from "features/character";
import { ReactComponent as MonsterIcon } from "assets/images/icons/daemon-skull.svg";
import { ReactComponent as BossIcon } from "assets/images/icons/crowned-skull.svg";
import { ReactComponent as TreasureIcon } from "assets/images/icons/open-treasure-chest.svg";
import { ReactComponent as ShopIcon } from "assets/images/icons/shop.svg";
import { ReactComponent as RestIcon } from "assets/images/icons/campfire.svg";
import { ReactComponent as ExitIcon } from "assets/images/icons/doorway.svg";
import { Player } from "./Player";
import { useEffect, useRef } from "react";
import { setPlayerLocation } from "./gameSlice";
import { openErrorModal } from "features/modals";

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
})) as typeof Paper;

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
	location: ILocation;
}

const Room: React.FC<IRoomProps> = ({ gridRef, room, location }) => {
	const dispatch = useAppDispatch();
	const roomRef = useRef<HTMLDivElement | null>(null);
	const hasPlayer = useAppSelector(getIsPlayerLocation)(location);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";

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

	const handleMove = async () => {
		try {
			await dispatch(move(location)).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	if (room.type === RoomType.None) {
		return <Tile />;
	}

	return (
		<Tile ref={roomRef}>
			<BaseRoom component="button" onClick={handleMove} disabled={isLoading}>
				{ROOM_ICON_MAP[room.type as RoomType]}
			</BaseRoom>
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
			{level.map((row, y) =>
				row.map((room, x) => {
					const level = character.map.location.level;
					const location = { level, x, y };
					return <Room key={`${y}${x}`} gridRef={ref} room={room} location={location} />;
				}),
			)}
			{location && <Player left={location.left} top={location.top} />}
		</Grid>
	);
};
