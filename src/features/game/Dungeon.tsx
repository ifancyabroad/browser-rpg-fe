import { Box, Button, ButtonProps, Typography, keyframes, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { RoomState, RoomType, createAnimationFromPath, getRoomCenter } from "common/utils";
import { getCurrentLevel, getCurrentRoom, rest } from "features/character";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConfirmationModal, openErrorModal } from "features/modals";
import { Player } from "./Player";
import { Room } from "./Room";
import { setPath, setPlayerLocation, startBattle } from "./gameSlice";
import { useNavigate } from "react-router-dom";
import { ReactComponent as FootstepsIcon } from "assets/images/icons/footsteps.svg";

const Grid = styled("div")({
	position: "relative",
	width: "100%",
	maxWidth: 700,
	margin: "auto",
	display: "grid",
	gridTemplateColumns: "repeat(8, 1fr)",
});

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
	const location = useAppSelector((state) => state.game.playerLocation);
	const character = useAppSelector((state) => state.character.character);
	const room = useAppSelector(getCurrentRoom);
	const path = useAppSelector((state) => state.game.path);
	const [modalState, setModalState] = useState(defaultModalState);
	const gameStatus = useAppSelector((state) => state.game.status);
	const isGameLoading = gameStatus === "loading";
	const characterStatus = useAppSelector((state) => state.character.status);
	const isCharacterLoading = characterStatus === "loading";
	const navigate = useNavigate();
	const roomsRef = useRef<Map<string, HTMLDivElement> | null>(null);
	const [animation, setAnimation] = useState("");
	const [grid, setGrid] = useState<HTMLDivElement | null>(null);

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
		if (character && grid) {
			const map = getMap();
			const id = `${character.map.location.y}${character.map.location.x}`;
			const room = map.get(id);
			return getRoomCenter(grid, room!); // TODO: Remove exclamation
		}
	}, [character, grid]);

	const pathAnimation = useMemo(() => {
		if (path.length && grid) {
			const map = getMap();
			const animationSteps = path.map(([x, y]) => {
				const id = `${y}${x}`;
				const room = map.get(id);
				return getRoomCenter(grid, room!); // TODO: Remove exclamation
			});
			return createAnimationFromPath(animationSteps);
		}
	}, [path, grid]);

	useEffect(() => {
		if (!roomLocation) {
			return;
		}

		if (pathAnimation) {
			setAnimation(pathAnimation);
		} else {
			dispatch(setPlayerLocation(roomLocation));
		}

		return () => {
			dispatch(setPath([]));
		};
	}, [dispatch, roomLocation, pathAnimation]);

	if (!character) {
		return null;
	}

	const handleRest = async () => {
		try {
			await dispatch(rest()).unwrap();
			setModalState((state) => ({ ...state, [RoomType.Rest]: false }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleStartBattle = async () => {
		try {
			await dispatch(startBattle()).unwrap();
			setModalState((state) => ({ ...state, [RoomType.Battle]: false }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleOpenShop = () => {
		navigate("/game/shop");
	};

	const closeConfirmationModal = () => {
		setModalState(defaultModalState);
	};

	const handleLocation = () => {
		if (!room) {
			return;
		}

		const isActionRoom = Object.keys(modalState).includes(room.type.toString());
		const isComplete = room.state === RoomState.Complete;
		if (isActionRoom && !isComplete) {
			setModalState((state) => ({ ...state, [room.type]: true }));
		}
	};

	return (
		<Fragment>
			<Box py={2} flex={1} display="flex" flexDirection="column" width="100%">
				<Box display="flex" justifyContent="space-between">
					<Box display="flex" alignItems="baseline" gap={2}>
						<Typography variant="h4">Dungeon</Typography>
						<Typography variant="h5" color="text.secondary">
							Level {character.map.location.level + 1}
						</Typography>
					</Box>

					<StyledButton aria-label="character" color="primary" variant="contained" onClick={handleLocation}>
						<FootstepsIcon height={40} width={40} />
					</StyledButton>
				</Box>
				<Grid ref={gridRef}>
					{level.map((row, y) =>
						row.map((room, x) => {
							const level = character.map.location.level;
							const location = { level, x, y };
							const id = `${y}${x}`;

							const updateNode = (node: HTMLDivElement | null) => {
								const map = getMap();
								if (node) {
									map.set(id, node);
								} else {
									map.delete(id);
								}
							};
							return <Room key={id} ref={updateNode} room={room} location={location} />;
						}),
					)}
					{location && <Player location={location} onAnimationEnd={handleLocation} animation={animation} />}
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
				title="Visit Merchant?"
				content="You come across a merchant interested in selling some items he has discovered."
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenShop}
				open={modalState[RoomType.Shop]}
			/>
		</Fragment>
	);
};
