import { Button, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { RoomType, TILE_SIZE } from "common/utils";
import { nextLevel, rest } from "features/character";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { ConfirmationModal, openErrorModal, openShopModal, openTreasureModal } from "features/modals";
import { Player } from "./Player";
import { Tile } from "./Tile";
import { startBattle } from "features/battle";
import {
	getActualLevel,
	getCurrentLocation,
	getCurrentRoom,
	getGridOffset,
	getIsActiveRoom,
	setPath,
} from "./dungeonSlice";
import { DungeonContext, dungeonReducer, initialState } from "common/context";

const Canvas = styled("div")({
	position: "relative",
	flex: 1,
	display: "flex",
	flexDirection: "column",
	width: "100%",
	height: "100%",
	overflow: "hidden",
});

interface IGridProps {
	columns: number;
	top: number;
	left: number;
}

const GridWrapper = styled("div")({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
});

const Grid = styled("div", {
	shouldForwardProp: (prop) => prop !== "columns",
})<IGridProps>(({ columns, top, left }) => ({
	position: "relative",
	top: `${top}px`,
	left: `${left}px`,
	display: "grid",
	gridTemplateColumns: `repeat(${columns}, ${TILE_SIZE}px)`,
	gap: "1px",
}));

export const Dungeon: React.FC = () => {
	const dispatch = useAppDispatch();
	const level = useAppSelector(getActualLevel);
	const character = useAppSelector((state) => state.character.character);
	const room = useAppSelector(getCurrentRoom);
	const roomType = room ? room.type : RoomType.Empty;
	const location = useAppSelector(getCurrentLocation);
	const gridOffset = useAppSelector(getGridOffset);
	const battleStatus = useAppSelector((state) => state.battle.status);
	const isBattleLoading = battleStatus === "loading";
	const characterStatus = useAppSelector((state) => state.character.status);
	const isCharacterLoading = characterStatus === "loading";
	const isActionRoom = useAppSelector(getIsActiveRoom);
	const [state, localDispatch] = useReducer(dungeonReducer, initialState);
	const providerState = {
		state,
		dispatch: localDispatch,
	};

	const roomText = useMemo(() => {
		switch (roomType) {
			case RoomType.Battle:
				return "Start Battle";
			case RoomType.Boss:
				return "Fight Boss";
			case RoomType.Shop:
				return "Visit Merchant";
			case RoomType.Treasure:
				return "Open Chest";
			case RoomType.Rest:
				return "Rest";
			case RoomType.Exit:
				return "Descend";
			default:
				return "";
		}
	}, [roomType]);

	const handleLocation = useCallback(() => {
		dispatch(setPath([]));

		if (isActionRoom) {
			localDispatch({ type: "OPEN", payload: roomType });
		}
	}, [dispatch, isActionRoom, roomType]);

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
			localDispatch({ type: "CLOSE" });
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleStartBattle = async () => {
		try {
			await dispatch(startBattle(location)).unwrap();
			localDispatch({ type: "CLOSE" });
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleOpenShop = () => {
		dispatch(openShopModal());
		localDispatch({ type: "CLOSE" });
	};

	const handleOpenChest = async () => {
		dispatch(openTreasureModal());
		localDispatch({ type: "CLOSE" });
	};

	const handleExit = async () => {
		try {
			await dispatch(nextLevel(location)).unwrap();
			localDispatch({ type: "CLOSE" });
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const closeConfirmationModal = () => {
		localDispatch({ type: "CLOSE" });
	};

	return (
		<DungeonContext.Provider value={providerState}>
			<Canvas>
				<Button
					aria-label="character"
					onClick={handleLocation}
					sx={{
						display: isActionRoom ? null : "none",
						position: "absolute",
						top: 16,
						right: 24,
						zIndex: 1,
					}}
				>
					{roomText}
				</Button>
				{gridOffset && (
					<GridWrapper>
						<Grid columns={level.length} top={gridOffset.top} left={gridOffset.left}>
							{level.map((row, y) =>
								row.map((room, x) => {
									const level = character.map.location.level;
									const id = `${level}${y}${x}`;
									return <Tile key={id} room={room} />;
								}),
							)}
						</Grid>
					</GridWrapper>
				)}
				<Player image={character.characterClass.icon} />
			</Canvas>

			<ConfirmationModal
				title="Rest?"
				content="You stumble upon an abandoned camp and a chance to rest for the night."
				handleClose={closeConfirmationModal}
				handleConfirm={handleRest}
				open={state[RoomType.Rest]}
				disabled={isCharacterLoading}
			/>
			<ConfirmationModal
				title="Start Battle"
				content="You have been ambushed by an enemy and must defend yourself!"
				handleClose={closeConfirmationModal}
				handleConfirm={handleStartBattle}
				open={state[RoomType.Battle]}
				disabled={isBattleLoading}
			/>
			<ConfirmationModal
				title="Fight Boss"
				content="As you make your way to the exit you are stopped in your tracks by a powerful foe."
				handleClose={closeConfirmationModal}
				handleConfirm={handleStartBattle}
				open={state[RoomType.Boss]}
				disabled={isBattleLoading}
			/>
			<ConfirmationModal
				title="Visit Merchant?"
				content="You come across a merchant interested in selling some items he has discovered."
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenShop}
				open={state[RoomType.Shop]}
			/>
			<ConfirmationModal
				title="Open Chest?"
				content="You find a treasure chest waiting to be opened."
				handleClose={closeConfirmationModal}
				handleConfirm={handleOpenChest}
				open={state[RoomType.Treasure]}
			/>
			<ConfirmationModal
				title="Descend"
				content="You have found a staircase descending further into the dungeon, are you ready to proceed?"
				handleClose={closeConfirmationModal}
				handleConfirm={handleExit}
				open={state[RoomType.Exit]}
				disabled={isCharacterLoading}
			/>
		</DungeonContext.Provider>
	);
};
