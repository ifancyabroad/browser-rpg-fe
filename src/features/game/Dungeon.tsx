import { Box, Button, ButtonProps, Typography, keyframes, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IAnimationStep, RoomType, createAnimationFromPath, getRoomCenter } from "common/utils";
import {
	getCurrentLevel,
	getCurrentLocation,
	getCurrentRoom,
	getIsActiveRoom,
	nextLevel,
	rest,
	setPath,
	setPlayerLocation,
} from "features/character";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConfirmationModal, openErrorModal } from "features/modals";
import { Player } from "./Player";
import { Room } from "./Room";
import { startBattle } from "./gameSlice";
import { useNavigate } from "react-router-dom";
import { ReactComponent as FootstepsIcon } from "assets/images/icons/footsteps.svg";

interface IGridProps {
	columns: number;
}

const Grid = styled("div", {
	shouldForwardProp: (prop) => prop !== "columns",
})<IGridProps>(({ columns }) => ({
	position: "relative",
	width: "100%",
	maxWidth: 700,
	margin: "auto",
	display: "grid",
	gridTemplateColumns: `repeat(${columns}, 1fr)`,
}));

const headShakeAnimation = keyframes`
	0%,
    50%,
    100% {
        transform: translate(0px, 0px);
    }

    6.5% {
        transform: translate(-6px, 0px) rotateY(-9deg);
    }

    18.5% {
        transform: translate(5px, 0px) rotateY(7deg);
    }

    31.5% {
        transform: translate(-3px, 0px) rotateY(-5deg);
    }

    43.5% {
        transform: translate(2px, 0px) rotateY(3deg);
    }
`;

const StyledButton = styled(Button)<ButtonProps>({
	borderRadius: "50%",
	transformOrigin: "50% 50%",
	height: 64,
	width: 64,
	padding: 0,
	animation: `${headShakeAnimation} 1s ease-in-out 0s infinite normal both running`,
});

const defaultModalState = {
	[RoomType.Battle]: false,
	[RoomType.Boss]: false,
	[RoomType.Shop]: false,
	[RoomType.Treasure]: false,
	[RoomType.Rest]: false,
	[RoomType.Exit]: false,
};

export const Dungeon: React.FC = () => {
	const dispatch = useAppDispatch();
	const level = useAppSelector(getCurrentLevel);
	const playerLocation = useAppSelector((state) => state.character.playerLocation);
	const character = useAppSelector((state) => state.character.character);
	const room = useAppSelector(getCurrentRoom);
	const location = useAppSelector(getCurrentLocation);
	const path = useAppSelector((state) => state.character.path);
	const [modalState, setModalState] = useState(defaultModalState);
	const gameStatus = useAppSelector((state) => state.game.status);
	const isGameLoading = gameStatus === "loading";
	const characterStatus = useAppSelector((state) => state.character.status);
	const isCharacterLoading = characterStatus === "loading";
	const navigate = useNavigate();
	const roomsRef = useRef<Map<string, HTMLDivElement> | null>(null);
	const [animation, setAnimation] = useState("");
	const [grid, setGrid] = useState<HTMLDivElement | null>(null);
	const [rooms, setRooms] = useState<Record<string, HTMLDivElement>>({});
	const isActionRoom = useAppSelector(getIsActiveRoom);

	const getMap = () => {
		if (!roomsRef.current) {
			// Initialize the Map on first usage.
			roomsRef.current = new Map();
		}
		return roomsRef.current;
	};

	const gridRef = useCallback((node: HTMLDivElement) => {
		if (node !== null) {
			setGrid(node);
		}
	}, []);

	const roomLocation = useMemo(() => {
		if (!location || !grid) {
			return;
		}

		const id = `${location.level}${location.y}${location.x}`;
		const room = rooms[id];

		if (room) {
			return getRoomCenter(room);
		}
	}, [location, grid, rooms]);

	const pathAnimation = useMemo(() => {
		if (!location || !grid || !path.length) {
			return;
		}

		const level = location.level;

		const animationSteps = path
			.map(([x, y]) => {
				const id = `${level}${y}${x}`;
				const room = rooms[id];
				return room ? getRoomCenter(room) : undefined;
			})
			.filter((step) => step) as IAnimationStep[];

		return createAnimationFromPath(animationSteps);
	}, [location, grid, rooms, path]);

	useEffect(() => {
		setAnimation("");

		const map = getMap();
		setRooms(Object.fromEntries(map.entries()));
	}, [dispatch, level]);

	useEffect(() => {
		if (!roomLocation) {
			return;
		}

		if (pathAnimation) {
			setAnimation(pathAnimation);
		} else {
			dispatch(setPlayerLocation(roomLocation));
		}
	}, [dispatch, roomLocation, pathAnimation]);

	useEffect(() => {
		return () => {
			dispatch(setPath([]));
		};
	}, [dispatch]);

	if (!character || !location) {
		return null;
	}

	const handleRest = async () => {
		try {
			await dispatch(rest(location)).unwrap();
			setModalState((state) => ({ ...state, [RoomType.Rest]: false }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleStartBattle = async () => {
		try {
			await dispatch(startBattle(location)).unwrap();
			setModalState((state) => ({ ...state, [RoomType.Battle]: false }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleOpenShop = () => {
		navigate("/game/shop");
	};

	const handleExit = async () => {
		try {
			await dispatch(nextLevel(location)).unwrap();
			setModalState((state) => ({ ...state, [RoomType.Exit]: false }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const closeConfirmationModal = () => {
		setModalState(defaultModalState);
	};

	const handleLocation = () => {
		if (!room) {
			return;
		}

		dispatch(setPath([]));

		if (isActionRoom) {
			setModalState((state) => ({ ...state, [room.type]: true }));
		}
	};

	return (
		<Fragment>
			<Box py={2} flex={1} display="flex" flexDirection="column" width="100%">
				<Box display="flex" justifyContent="space-between">
					<Box>
						<Typography variant="h4">Dungeon</Typography>
						<Typography variant="h5" color="text.secondary">
							Level {character.map.location.level + 1}
						</Typography>
					</Box>

					<StyledButton
						aria-label="character"
						color="primary"
						variant="contained"
						onClick={handleLocation}
						sx={{ display: isActionRoom ? null : "none" }}
					>
						<FootstepsIcon height={40} width={40} />
					</StyledButton>
				</Box>
				<Grid ref={gridRef} columns={level.length}>
					{level.map((row, y) =>
						row.map((room, x) => {
							const level = character.map.location.level;
							const id = `${level}${y}${x}`;

							const updateNode = (node: HTMLDivElement | null) => {
								const map = getMap();
								if (node) {
									map.set(id, node);
								} else {
									map.delete(id);
								}
							};
							return <Room key={id} ref={updateNode} room={room} />;
						}),
					)}
					{playerLocation && (
						<Player
							location={playerLocation}
							level={level}
							onAnimationEnd={handleLocation}
							animation={animation}
						/>
					)}
				</Grid>
			</Box>

			<ConfirmationModal
				title="Rest?"
				content={`Resting will cost ${character.restPrice}g`}
				handleClose={closeConfirmationModal}
				handleConfirm={handleRest}
				open={modalState[RoomType.Rest]}
				disabled={isCharacterLoading}
			/>
			<ConfirmationModal
				title="Start Battle"
				content="You have been ambushed by an enemy and must defend yourself!"
				handleClose={closeConfirmationModal}
				handleConfirm={handleStartBattle}
				open={modalState[RoomType.Battle]}
				disabled={isGameLoading}
			/>
			<ConfirmationModal
				title="Fight Boss"
				content="As you make your way to the exit you are stopped in your tracks by a powerful foe."
				handleClose={closeConfirmationModal}
				handleConfirm={handleStartBattle}
				open={modalState[RoomType.Boss]}
				disabled={isGameLoading}
			/>
			<ConfirmationModal
				title="Visit Merchant?"
				content="You come across a merchant interested in selling some items he has discovered."
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenShop}
				open={modalState[RoomType.Shop]}
			/>
			<ConfirmationModal
				title="Descend"
				content="You have found a staircase descending further into the dungeon, are you ready to proceed?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleExit}
				open={modalState[RoomType.Exit]}
				disabled={isCharacterLoading}
			/>
		</Fragment>
	);
};
